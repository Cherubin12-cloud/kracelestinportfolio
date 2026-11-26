import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import {
  ADMIN_EMAIL,
  OperationType,
  auth,
  db,
  googleProvider,
  handleFirestoreError,
} from '../firebase';
import { SessionCategory, SessionRole } from '../types/portfolio';
import { optimizeImageForStorage } from '../utils/imageOptimizer';

export interface SavedMediaRecord {
  slotId: string;
  dataUrl: string;
  caption: string;
}

export interface SavedContactSettings {
  email: string;
  linkedin: string;
}

export interface SavedSessionOverride {
  sessionId: string;
  title: string;
  topic: string;
  category: SessionCategory;
  date: string;
  role: SessionRole;
  linkedinUrl: string;
}

interface PhotoPreviewContextValue {
  // Persisted cloud media (visible to all visitors)
  overrides: Record<string, string>;
  savedCaptions: Record<string, string>;
  mediaLoaded: boolean;

  // Persisted contact & session overrides
  contactSettings: SavedContactSettings | null;
  sessionOverrides: Record<string, SavedSessionOverride>;

  // Auth & admin controls
  user: User | null;
  authReady: boolean;
  isAdmin: boolean;
  adminPanelOpen: boolean;
  openAdminPanel: (initialSlotId?: string) => void;
  closeAdminPanel: () => void;
  focusedSlotId: string | null;
  signInAdmin: () => Promise<void>;
  signOutAdmin: () => Promise<void>;

  // Persistent Firestore write actions (admin only)
  savePhotoFile: (
    slotId: string,
    file: File,
    caption?: string
  ) => Promise<{ sizeKB: number }>;
  savePhotoUrl: (
    slotId: string,
    url: string,
    caption?: string
  ) => Promise<void>;
  deleteSavedPhoto: (slotId: string) => Promise<void>;
  saveContactSettings: (email: string, linkedin: string) => Promise<void>;
  saveSessionOverride: (payload: SavedSessionOverride) => Promise<void>;
  deleteSessionOverride: (sessionId: string) => Promise<void>;

  // Backwards-compatible helpers
  setPhotoOverride: (id: string, file: File) => void;
  clearPhotoOverride: (id: string) => void;
  clearAllOverrides: () => void;
  overrideCount: number;
}

const VALID_ID_REGEX = /^[a-zA-Z0-9_-]{2,80}$/;

const PhotoPreviewContext = createContext<PhotoPreviewContextValue | null>(null);

export const PhotoPreviewProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [hasAdminRegistryDoc, setHasAdminRegistryDoc] = useState(false);

  const [savedMedia, setSavedMedia] = useState<Record<string, SavedMediaRecord>>({});
  const [mediaLoaded, setMediaLoaded] = useState(false);
  const [contactSettings, setContactSettings] =
    useState<SavedContactSettings | null>(null);
  const [sessionOverrides, setSessionOverrides] = useState<
    Record<string, SavedSessionOverride>
  >({});

  const [adminPanelOpen, setAdminPanelOpen] = useState(false);
  const [focusedSlotId, setFocusedSlotId] = useState<string | null>(null);

  // Open admin panel automatically if URL hash is #admin
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#admin') {
        setAdminPanelOpen(true);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  // Track Firebase Authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (nextUser) => {
      setUser(nextUser);
      if (nextUser && nextUser.emailVerified) {
        if (nextUser.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
          setHasAdminRegistryDoc(true);
        } else {
          try {
            const adminSnap = await getDoc(doc(db, 'admins', nextUser.uid));
            setHasAdminRegistryDoc(adminSnap.exists());
          } catch {
            setHasAdminRegistryDoc(false);
          }
        }
      } else {
        setHasAdminRegistryDoc(false);
      }
      setAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  const isAdmin = Boolean(
    user &&
      user.emailVerified &&
      (user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase() ||
        hasAdminRegistryDoc)
  );

  // Subscribe to all publicly published mediaAssets in Firestore
  useEffect(() => {
    const mediaQuery = query(
      collection(db, 'mediaAssets'),
      where('isPublic', '==', true)
    );

    const unsubMedia = onSnapshot(
      mediaQuery,
      (snapshot) => {
        const next: Record<string, SavedMediaRecord> = {};
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          if (typeof data.dataUrl === 'string' && data.dataUrl.length > 0) {
            next[docSnap.id] = {
              slotId: docSnap.id,
              dataUrl: data.dataUrl,
              caption: typeof data.caption === 'string' ? data.caption : '',
            };
          }
        });
        setSavedMedia(next);
        setMediaLoaded(true);
      },
      (error) => {
        setMediaLoaded(true);
        console.error('Media snapshot listener error:', error);
      }
    );

    const contactRef = doc(db, 'siteSettings', 'contact');
    const unsubContact = onSnapshot(
      contactRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setContactSettings({
            email: typeof data.email === 'string' ? data.email : '',
            linkedin: typeof data.linkedin === 'string' ? data.linkedin : '',
          });
        } else {
          setContactSettings(null);
        }
      },
      (error) => {
        console.error('Contact settings listener error:', error);
      }
    );

    const sessionsQuery = query(
      collection(db, 'sessions'),
      where('isPublic', '==', true)
    );
    const unsubSessions = onSnapshot(
      sessionsQuery,
      (snapshot) => {
        const next: Record<string, SavedSessionOverride> = {};
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          next[docSnap.id] = {
            sessionId: docSnap.id,
            title: String(data.title || ''),
            topic: String(data.topic || ''),
            category: data.category as SessionCategory,
            date: String(data.date || ''),
            role: data.role as SessionRole,
            linkedinUrl: String(data.linkedinUrl || ''),
          };
        });
        setSessionOverrides(next);
      },
      (error) => {
        console.error('Sessions snapshot listener error:', error);
      }
    );

    return () => {
      unsubMedia();
      unsubContact();
      unsubSessions();
    };
  }, []);

  const openAdminPanel = useCallback((initialSlotId?: string) => {
    setFocusedSlotId(initialSlotId || null);
    setAdminPanelOpen(true);
  }, []);

  const closeAdminPanel = useCallback(() => {
    setAdminPanelOpen(false);
    setFocusedSlotId(null);
    if (window.location.hash === '#admin') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, []);

  const signInAdmin = useCallback(async () => {
    await signInWithPopup(auth, googleProvider);
  }, []);

  const signOutAdmin = useCallback(async () => {
    await signOut(auth);
  }, []);

  const persistMediaRecord = useCallback(
    async (slotId: string, dataUrl: string, caption: string) => {
      if (!auth.currentUser) {
        throw new Error('Veuillez vous connecter en tant qu’administrateur.');
      }
      if (!VALID_ID_REGEX.test(slotId)) {
        throw new Error('Identifiant d’emplacement photo invalide.');
      }
      const trimmedUrl = dataUrl.trim();
      if (trimmedUrl.length < 10 || trimmedUrl.length > 800000) {
        throw new Error('La taille de l’image dépasse la limite autorisée.');
      }
      const safeCaption = caption.trim().slice(0, 300);
      const docRef = doc(db, 'mediaAssets', slotId);
      const path = `mediaAssets/${slotId}`;

      try {
        const existingSnap = await getDoc(docRef);
        if (existingSnap.exists()) {
          await updateDoc(docRef, {
            dataUrl: trimmedUrl,
            caption: safeCaption,
            updatedBy: auth.currentUser.uid,
            updatedAt: serverTimestamp(),
          });
        } else {
          await setDoc(docRef, {
            slotId,
            dataUrl: trimmedUrl,
            caption: safeCaption,
            isPublic: true,
            updatedBy: auth.currentUser.uid,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, path);
      }
    },
    []
  );

  const savePhotoFile = useCallback(
    async (slotId: string, file: File, caption = '') => {
      const optimized = await optimizeImageForStorage(file);
      await persistMediaRecord(slotId, optimized.dataUrl, caption);
      return { sizeKB: optimized.sizeKB };
    },
    [persistMediaRecord]
  );

  const savePhotoUrl = useCallback(
    async (slotId: string, url: string, caption = '') => {
      const trimmed = url.trim();
      if (!trimmed.startsWith('https://')) {
        throw new Error("L'URL de l'image doit commencer par https://");
      }
      await persistMediaRecord(slotId, trimmed, caption);
    },
    [persistMediaRecord]
  );

  const deleteSavedPhoto = useCallback(async (slotId: string) => {
    if (!auth.currentUser) {
      throw new Error('Connexion administrateur requise.');
    }
    const path = `mediaAssets/${slotId}`;
    try {
      await deleteDoc(doc(db, 'mediaAssets', slotId));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  }, []);

  const saveContactSettings = useCallback(
    async (email: string, linkedin: string) => {
      if (!auth.currentUser) {
        throw new Error('Connexion administrateur requise.');
      }
      const safeEmail = email.trim().slice(0, 160);
      const safeLinkedin = linkedin.trim().slice(0, 300);
      if (!safeEmail || !safeLinkedin) {
        throw new Error('Veuillez renseigner les champs email et LinkedIn.');
      }

      const docRef = doc(db, 'siteSettings', 'contact');
      const path = 'siteSettings/contact';
      try {
        const existingSnap = await getDoc(docRef);
        if (existingSnap.exists()) {
          await updateDoc(docRef, {
            email: safeEmail,
            linkedin: safeLinkedin,
            updatedBy: auth.currentUser.uid,
            updatedAt: serverTimestamp(),
          });
        } else {
          await setDoc(docRef, {
            email: safeEmail,
            linkedin: safeLinkedin,
            isPublic: true,
            updatedBy: auth.currentUser.uid,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, path);
      }
    },
    []
  );

  const saveSessionOverride = useCallback(
    async (payload: SavedSessionOverride) => {
      if (!auth.currentUser) {
        throw new Error('Connexion administrateur requise.');
      }
      if (!VALID_ID_REGEX.test(payload.sessionId)) {
        throw new Error('Identifiant de session invalide.');
      }
      const docRef = doc(db, 'sessions', payload.sessionId);
      const path = `sessions/${payload.sessionId}`;
      const sanitized = {
        title: payload.title.trim().slice(0, 180) || '[SESSION TITLE TO BE ADDED]',
        topic: payload.topic.trim().slice(0, 320) || '[TOPIC OR THEME TO BE ADDED]',
        category: payload.category,
        date: payload.date.trim().slice(0, 80) || '[DATE TO BE ADDED]',
        role: payload.role,
        linkedinUrl:
          payload.linkedinUrl.trim().slice(0, 500) ||
          '[LINKEDIN POST OR REPLAY URL TO BE ADDED]',
      };

      try {
        const existingSnap = await getDoc(docRef);
        if (existingSnap.exists()) {
          await updateDoc(docRef, {
            ...sanitized,
            updatedBy: auth.currentUser.uid,
            updatedAt: serverTimestamp(),
          });
        } else {
          await setDoc(docRef, {
            sessionId: payload.sessionId,
            ...sanitized,
            isPublic: true,
            updatedBy: auth.currentUser.uid,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, path);
      }
    },
    []
  );

  const deleteSessionOverride = useCallback(async (sessionId: string) => {
    if (!auth.currentUser) {
      throw new Error('Connexion administrateur requise.');
    }
    const path = `sessions/${sessionId}`;
    try {
      await deleteDoc(doc(db, 'sessions', sessionId));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  }, []);

  // Derived maps for seamless consumption across all portfolio components
  const overrides: Record<string, string> = {};
  const savedCaptions: Record<string, string> = {};
  for (const [key, rec] of Object.entries(savedMedia)) {
    overrides[key] = rec.dataUrl;
    if (rec.caption) {
      savedCaptions[key] = rec.caption;
    }
  }

  // Direct inline upload helper (only runs for verified admin)
  const setPhotoOverride = useCallback(
    (id: string, file: File) => {
      if (!isAdmin) {
        openAdminPanel(id);
        return;
      }
      void savePhotoFile(id, file, savedCaptions[id] || '');
    },
    [isAdmin, openAdminPanel, savePhotoFile, savedCaptions]
  );

  const clearPhotoOverride = useCallback(
    (id: string) => {
      if (!isAdmin) return;
      void deleteSavedPhoto(id);
    },
    [isAdmin, deleteSavedPhoto]
  );

  const clearAllOverrides = useCallback(() => {
    if (!isAdmin) return;
    Object.keys(savedMedia).forEach((slotId) => {
      void deleteSavedPhoto(slotId);
    });
  }, [isAdmin, savedMedia, deleteSavedPhoto]);

  return (
    <PhotoPreviewContext.Provider
      value={{
        overrides,
        savedCaptions,
        mediaLoaded,
        contactSettings,
        sessionOverrides,
        user,
        authReady,
        isAdmin,
        adminPanelOpen,
        openAdminPanel,
        closeAdminPanel,
        focusedSlotId,
        signInAdmin,
        signOutAdmin,
        savePhotoFile,
        savePhotoUrl,
        deleteSavedPhoto,
        saveContactSettings,
        saveSessionOverride,
        deleteSessionOverride,
        setPhotoOverride,
        clearPhotoOverride,
        clearAllOverrides,
        overrideCount: Object.keys(savedMedia).length,
      }}
    >
      {children}
    </PhotoPreviewContext.Provider>
  );
};

export function usePhotoPreview(): PhotoPreviewContextValue {
  const context = useContext(PhotoPreviewContext);
  if (!context) {
    throw new Error(
      'usePhotoPreview must be used within a PhotoPreviewProvider'
    );
  }
  return context;
}
