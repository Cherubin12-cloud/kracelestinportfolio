import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  X,
  Upload,
  Trash2,
  CheckCircle2,
  ShieldCheck,
  LogOut,
  Image as ImageIcon,
  Mail,
  Linkedin,
  Link as LinkIcon,
  Loader2,
  Save,
  Calendar,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { portfolioData } from '../data/portfolioData';
import { usePhotoPreview } from '../context/PhotoPreviewContext';
import { ADMIN_EMAIL } from '../firebase';
import {
  MediaAsset,
  SessionCategory,
  SessionRole,
} from '../types/portfolio';

type AdminTab = 'photos' | 'sessions' | 'contact';
type PhotoGroupFilter =
  | 'Tous'
  | 'Portrait'
  | 'Expériences'
  | 'Projets'
  | 'Sessions'
  | 'Sites Web';

interface IndexedMediaSlot {
  asset: MediaAsset;
  group: Exclude<PhotoGroupFilter, 'Tous'>;
  contextTitle: string;
}

function collectAllMediaSlots(): IndexedMediaSlot[] {
  const slots: IndexedMediaSlot[] = [
    {
      asset: portfolioData.identity.portrait,
      group: 'Portrait',
      contextTitle: 'Section Hero — Portrait principal',
    },
  ];

  for (const exp of portfolioData.experience.items) {
    slots.push({
      asset: exp.media,
      group: 'Expériences',
      contextTitle: exp.organisation,
    });
  }

  for (const proj of portfolioData.projects.items) {
    proj.gallery.forEach((photo, idx) => {
      slots.push({
        asset: photo,
        group: 'Projets',
        contextTitle: `${proj.title} (Photo ${idx + 1})`,
      });
    });
  }

  for (const session of portfolioData.sessions.items) {
    slots.push({
      asset: session.media,
      group: 'Sessions',
      contextTitle: `Session LinkedIn — ${session.category}`,
    });
  }

  for (const prod of portfolioData.digitalProducts.items) {
    slots.push({
      asset: prod.fallbackScreenshot,
      group: 'Sites Web',
      contextTitle: `${prod.title} — Capture de secours`,
    });
  }

  return slots;
}

const PHOTO_GROUPS: PhotoGroupFilter[] = [
  'Tous',
  'Portrait',
  'Expériences',
  'Projets',
  'Sessions',
  'Sites Web',
];

const SESSION_CATEGORIES: SessionCategory[] = [
  'AI & Technology',
  'Digital Skills',
  'Education',
  'Leadership & Youth Development',
  'Professional Development',
];

const SESSION_ROLES: SessionRole[] = ['Host', 'Facilitator', 'Speaker'];

export const AdminPanel: React.FC = () => {
  const {
    adminPanelOpen,
    closeAdminPanel,
    focusedSlotId,
    user,
    authReady,
    isAdmin,
    signInAdmin,
    signOutAdmin,
    overrides,
    savedCaptions,
    savePhotoFile,
    savePhotoUrl,
    deleteSavedPhoto,
    contactSettings,
    saveContactSettings,
    sessionOverrides,
    saveSessionOverride,
    deleteSessionOverride,
  } = usePhotoPreview();

  const allSlots = useMemo(() => collectAllMediaSlots(), []);

  const [activeTab, setActiveTab] = useState<AdminTab>('photos');
  const [groupFilter, setGroupFilter] = useState<PhotoGroupFilter>('Tous');
  const [busySlotId, setBusySlotId] = useState<string | null>(null);
  const [slotMessages, setSlotMessages] = useState<
    Record<string, { type: 'success' | 'error'; text: string }>
  >({});
  const [urlInputs, setUrlInputs] = useState<Record<string, string>>({});
  const [captionInputs, setCaptionInputs] = useState<Record<string, string>>({});
  const [showUrlRow, setShowUrlRow] = useState<Record<string, boolean>>({});
  const [authError, setAuthError] = useState<string | null>(null);
  const [signingIn, setSigningIn] = useState(false);

  // Contact form state
  const [emailInput, setEmailInput] = useState(portfolioData.contact.email);
  const [linkedinInput, setLinkedinInput] = useState(portfolioData.contact.linkedin);
  const [savingContact, setSavingContact] = useState(false);
  const [contactStatus, setContactStatus] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  // Session form state
  const [sessionDrafts, setSessionDrafts] = useState<
    Record<
      string,
      {
        title: string;
        topic: string;
        category: SessionCategory;
        date: string;
        role: SessionRole;
        linkedinUrl: string;
      }
    >
  >({});
  const [savingSessionId, setSavingSessionId] = useState<string | null>(null);
  const [sessionStatus, setSessionStatus] = useState<
    Record<string, { type: 'success' | 'error'; text: string }>
  >({});

  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  // Sync contact inputs with persisted settings
  useEffect(() => {
    setEmailInput(contactSettings?.email || portfolioData.contact.email);
    setLinkedinInput(contactSettings?.linkedin || portfolioData.contact.linkedin);
  }, [contactSettings]);

  // Sync session drafts with persisted overrides
  useEffect(() => {
    const nextDrafts: typeof sessionDrafts = {};
    for (const s of portfolioData.sessions.items) {
      const saved = sessionOverrides[s.id];
      nextDrafts[s.id] = {
        title: saved?.title ?? s.title,
        topic: saved?.topic ?? s.topic,
        category: saved?.category ?? s.category,
        date: saved?.date ?? s.date,
        role: saved?.role ?? s.role,
        linkedinUrl: saved?.linkedinUrl ?? s.linkedinUrl,
      };
    }
    setSessionDrafts(nextDrafts);
  }, [sessionOverrides]);

  // Jump to focused slot's group when opened from a specific photo frame
  useEffect(() => {
    if (adminPanelOpen && focusedSlotId) {
      setActiveTab('photos');
      const match = allSlots.find((s) => s.asset.id === focusedSlotId);
      if (match) {
        setGroupFilter(match.group);
      }
    }
  }, [adminPanelOpen, focusedSlotId, allSlots]);

  // Lock background scroll & support ESC close
  useEffect(() => {
    if (!adminPanelOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeAdminPanel();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [adminPanelOpen, closeAdminPanel]);

  const filteredSlots = useMemo(() => {
    if (groupFilter === 'Tous') return allSlots;
    return allSlots.filter((slot) => slot.group === groupFilter);
  }, [allSlots, groupFilter]);

  const savedPhotosCount = useMemo(
    () => allSlots.filter((s) => Boolean(overrides[s.asset.id])).length,
    [allSlots, overrides]
  );

  const handleGoogleSignIn = async () => {
    setAuthError(null);
    setSigningIn(true);
    try {
      await signInAdmin();
    } catch (err) {
      setAuthError(
        err instanceof Error
          ? err.message
          : 'Impossible de finaliser la connexion Google.'
      );
    } finally {
      setSigningIn(false);
    }
  };

  const handleFileUpload = async (
    slot: IndexedMediaSlot,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    const slotId = slot.asset.id;
    setBusySlotId(slotId);
    setSlotMessages((prev) => {
      const next = { ...prev };
      delete next[slotId];
      return next;
    });

    try {
      const caption =
        captionInputs[slotId] ?? savedCaptions[slotId] ?? slot.asset.caption;
      const { sizeKB } = await savePhotoFile(slotId, file, caption);
      setSlotMessages((prev) => ({
        ...prev,
        [slotId]: {
          type: 'success',
          text: `Enregistrée définitivement (${sizeKB} Ko).`,
        },
      }));
    } catch (err) {
      setSlotMessages((prev) => ({
        ...prev,
        [slotId]: {
          type: 'error',
          text:
            err instanceof Error
              ? err.message
              : "Échec de l'enregistrement de la photo.",
        },
      }));
    } finally {
      setBusySlotId(null);
    }
  };

  const handleUrlSave = async (slot: IndexedMediaSlot) => {
    const slotId = slot.asset.id;
    const url = (urlInputs[slotId] || '').trim();
    if (!url) return;

    setBusySlotId(slotId);
    try {
      const caption =
        captionInputs[slotId] ?? savedCaptions[slotId] ?? slot.asset.caption;
      await savePhotoUrl(slotId, url, caption);
      setUrlInputs((prev) => ({ ...prev, [slotId]: '' }));
      setShowUrlRow((prev) => ({ ...prev, [slotId]: false }));
      setSlotMessages((prev) => ({
        ...prev,
        [slotId]: {
          type: 'success',
          text: 'Lien image enregistré définitivement.',
        },
      }));
    } catch (err) {
      setSlotMessages((prev) => ({
        ...prev,
        [slotId]: {
          type: 'error',
          text:
            err instanceof Error
              ? err.message
              : "Impossible d'enregistrer ce lien.",
        },
      }));
    } finally {
      setBusySlotId(null);
    }
  };

  const handleDeletePhoto = async (slotId: string) => {
    setBusySlotId(slotId);
    try {
      await deleteSavedPhoto(slotId);
      setSlotMessages((prev) => ({
        ...prev,
        [slotId]: {
          type: 'success',
          text: 'Photo supprimée. Emplacement réinitialisé.',
        },
      }));
    } catch (err) {
      setSlotMessages((prev) => ({
        ...prev,
        [slotId]: {
          type: 'error',
          text:
            err instanceof Error
              ? err.message
              : 'Impossible de supprimer cette photo.',
        },
      }));
    } finally {
      setBusySlotId(null);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingContact(true);
    setContactStatus(null);
    try {
      await saveContactSettings(emailInput, linkedinInput);
      setContactStatus({
        type: 'success',
        text: 'Coordonnées enregistrées définitivement et publiées sur le portfolio.',
      });
    } catch (err) {
      setContactStatus({
        type: 'error',
        text:
          err instanceof Error
            ? err.message
            : "Erreur lors de l'enregistrement.",
      });
    } finally {
      setSavingContact(false);
    }
  };

  const handleSaveSession = async (sessionId: string) => {
    const draft = sessionDrafts[sessionId];
    if (!draft) return;

    setSavingSessionId(sessionId);
    setSessionStatus((prev) => {
      const next = { ...prev };
      delete next[sessionId];
      return next;
    });

    try {
      await saveSessionOverride({
        sessionId,
        ...draft,
      });
      setSessionStatus((prev) => ({
        ...prev,
        [sessionId]: {
          type: 'success',
          text: 'Session enregistrée et publiée.',
        },
      }));
    } catch (err) {
      setSessionStatus((prev) => ({
        ...prev,
        [sessionId]: {
          type: 'error',
          text:
            err instanceof Error
              ? err.message
              : "Erreur lors de l'enregistrement.",
        },
      }));
    } finally {
      setSavingSessionId(null);
    }
  };

  const handleResetSession = async (sessionId: string) => {
    setSavingSessionId(sessionId);
    try {
      await deleteSessionOverride(sessionId);
      setSessionStatus((prev) => ({
        ...prev,
        [sessionId]: {
          type: 'success',
          text: 'Session réinitialisée.',
        },
      }));
    } catch (err) {
      setSessionStatus((prev) => ({
        ...prev,
        [sessionId]: {
          type: 'error',
          text:
            err instanceof Error
              ? err.message
              : 'Impossible de réinitialiser la session.',
        },
      }));
    } finally {
      setSavingSessionId(null);
    }
  };

  return (
    <AnimatePresence>
      {adminPanelOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="admin-panel-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#303E50]/55 p-3 backdrop-blur-md sm:p-6"
          onClick={closeAdminPanel}
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.985 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-[30px] border border-white/60 bg-[#F5F5F0] shadow-2xl"
          >
            {/* Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#303E50]/10 bg-white/90 px-6 py-5 sm:px-8">
              <div>
                <div className="flex items-center gap-2 text-xs font-medium text-[#5A6B7F]">
                  <ShieldCheck
                    className="h-4 w-4 text-[#3D7A68]"
                    aria-hidden="true"
                  />
                  <span>Espace Administration · Sauvegarde Permanente</span>
                </div>
                <h2
                  id="admin-panel-title"
                  className="mt-1 font-editorial text-2xl font-medium text-[#303E50]"
                >
                  Gestion du Portfolio
                </h2>
              </div>

              <div className="flex items-center gap-2.5">
                {user && (
                  <div className="hidden items-center gap-3 pr-2 text-right sm:flex">
                    <div>
                      <p className="text-xs font-semibold text-[#303E50]">
                        {user.displayName || 'Administrateur'}
                      </p>
                      <p className="text-[11px] text-[#5A6B7F]">{user.email}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => void signOutAdmin()}
                      className="inline-flex min-h-[38px] items-center gap-1.5 rounded-xl border border-[#303E50]/12 bg-[#F5F5F0] px-3 py-1.5 text-xs font-medium text-[#303E50] transition-colors hover:bg-[#DCEAE5]/60"
                    >
                      <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Déconnexion</span>
                    </button>
                  </div>
                )}

                <button
                  type="button"
                  onClick={closeAdminPanel}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#303E50]/10 bg-[#F5F5F0] text-[#303E50] transition-colors hover:bg-[#DCEAE5]/70"
                  aria-label="Fermer le panneau admin"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-8 sm:py-7">
              {!authReady ? (
                <div className="flex min-h-[260px] items-center justify-center gap-2.5 text-sm text-[#5A6B7F]">
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  <span>Vérification de la session...</span>
                </div>
              ) : !user ? (
                /* Sign-in Gate */
                <div className="mx-auto my-8 max-w-md rounded-[26px] border border-[#303E50]/[0.07] bg-white p-8 text-center shadow-xs">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#DCEAE5] text-[#303E50]">
                    <ShieldCheck className="h-6 w-6" aria-hidden="true" />
                  </div>

                  <h3 className="mt-5 font-editorial text-2xl font-medium text-[#303E50]">
                    Connexion Administrateur
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#4E5E72]">
                    Connectez-vous avec votre compte Google autorisé ({ADMIN_EMAIL}) pour importer vos photos et les enregistrer définitivement pour tous les visiteurs.
                  </p>

                  <button
                    type="button"
                    disabled={signingIn}
                    onClick={() => void handleGoogleSignIn()}
                    className="mt-6 inline-flex min-h-[48px] w-full items-center justify-center gap-2.5 rounded-2xl bg-[#303E50] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#303E50]/92 disabled:opacity-60"
                  >
                    {signingIn ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        <span>Connexion en cours...</span>
                      </>
                    ) : (
                      <span>Se connecter avec Google</span>
                    )}
                  </button>

                  {authError && (
                    <p
                      role="alert"
                      className="mt-4 rounded-xl bg-red-50 px-4 py-2.5 text-xs text-red-700"
                    >
                      {authError}
                    </p>
                  )}
                </div>
              ) : !isAdmin ? (
                /* Unauthorized Google Account */
                <div className="mx-auto my-8 max-w-md rounded-[26px] border border-[#303E50]/[0.07] bg-white p-8 text-center">
                  <h3 className="font-editorial text-2xl font-medium text-[#303E50]">
                    Accès non autorisé
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#4E5E72]">
                    Le compte <strong className="text-[#303E50]">{user.email}</strong> n&apos;a pas les droits d&apos;administration de ce portfolio. Connectez-vous avec <strong className="text-[#303E50]">{ADMIN_EMAIL}</strong>.
                  </p>
                  <button
                    type="button"
                    onClick={() => void signOutAdmin()}
                    className="mt-6 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#303E50] px-5 py-2.5 text-sm font-medium text-white"
                  >
                    <LogOut className="h-4 w-4" aria-hidden="true" />
                    <span>Changer de compte</span>
                  </button>
                </div>
              ) : (
                /* Authenticated Admin Workspace */
                <div>
                  {/* Workspace Tabs */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#303E50]/10 pb-5">
                    <div
                      role="tablist"
                      aria-label="Sections d'administration"
                      className="flex flex-wrap items-center gap-1.5"
                    >
                      <button
                        type="button"
                        role="tab"
                        aria-selected={activeTab === 'photos'}
                        onClick={() => setActiveTab('photos')}
                        className={`inline-flex min-h-[42px] items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                          activeTab === 'photos'
                            ? 'bg-[#303E50] text-white'
                            : 'bg-white text-[#4E5E72] hover:text-[#303E50]'
                        }`}
                      >
                        <ImageIcon className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>
                          Photos du Portfolio ({savedPhotosCount}/{allSlots.length})
                        </span>
                      </button>

                      <button
                        type="button"
                        role="tab"
                        aria-selected={activeTab === 'sessions'}
                        onClick={() => setActiveTab('sessions')}
                        className={`inline-flex min-h-[42px] items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                          activeTab === 'sessions'
                            ? 'bg-[#303E50] text-white'
                            : 'bg-white text-[#4E5E72] hover:text-[#303E50]'
                        }`}
                      >
                        <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Sessions LinkedIn</span>
                      </button>

                      <button
                        type="button"
                        role="tab"
                        aria-selected={activeTab === 'contact'}
                        onClick={() => setActiveTab('contact')}
                        className={`inline-flex min-h-[42px] items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                          activeTab === 'contact'
                            ? 'bg-[#303E50] text-white'
                            : 'bg-white text-[#4E5E72] hover:text-[#303E50]'
                        }`}
                      >
                        <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Contact &amp; Liens</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => void signOutAdmin()}
                      className="inline-flex min-h-[38px] items-center gap-1.5 rounded-xl border border-[#303E50]/12 bg-white px-3 py-1.5 text-xs font-medium text-[#303E50] sm:hidden"
                    >
                      <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Déconnexion</span>
                    </button>
                  </div>

                  {/* TAB 1: PHOTOS */}
                  {activeTab === 'photos' && (
                    <div className="mt-6">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-1.5">
                          {PHOTO_GROUPS.map((group) => (
                            <button
                              key={group}
                              type="button"
                              onClick={() => setGroupFilter(group)}
                              className={`min-h-[36px] rounded-xl px-3.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                                groupFilter === group
                                  ? 'bg-[#DCEAE5] text-[#303E50]'
                                  : 'bg-white/80 text-[#5A6B7F] hover:bg-white hover:text-[#303E50]'
                              }`}
                            >
                              {group}
                            </button>
                          ))}
                        </div>
                        <p className="text-xs text-[#5A6B7F]">
                          Compression automatique et sauvegarde cloud permanente.
                        </p>
                      </div>

                      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                        {filteredSlots.map((slot) => {
                          const slotId = slot.asset.id;
                          const savedSrc = overrides[slotId] || slot.asset.src;
                          const isBusy = busySlotId === slotId;
                          const feedback = slotMessages[slotId];
                          const isHighlighted = focusedSlotId === slotId;

                          return (
                            <div
                              key={slotId}
                              className={`flex flex-col justify-between rounded-[22px] border bg-white p-4 transition-all ${
                                isHighlighted
                                  ? 'border-[#303E50] ring-2 ring-[#303E50]/15'
                                  : 'border-[#303E50]/[0.08]'
                              }`}
                            >
                              <div className="flex gap-4">
                                {/* Thumbnail */}
                                <div className="h-24 w-28 shrink-0 overflow-hidden rounded-2xl border border-[#303E50]/[0.08] bg-[#DCEAE5]/45">
                                  {savedSrc ? (
                                    <img
                                      src={savedSrc}
                                      alt={slot.asset.alt}
                                      referrerPolicy="no-referrer"
                                      className="h-full w-full object-cover"
                                    />
                                  ) : (
                                    <div className="flex h-full w-full flex-col items-center justify-center p-2 text-center text-[11px] text-[#5A6B7F]">
                                      <ImageIcon
                                        className="mb-1 h-5 w-5 opacity-50"
                                        aria-hidden="true"
                                      />
                                      <span>Vide</span>
                                    </div>
                                  )}
                                </div>

                                {/* Slot Metadata */}
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center justify-between gap-2 text-[11px] text-[#5A6B7F]">
                                    <span className="font-medium">
                                      {slot.group}
                                    </span>
                                    {overrides[slotId] ? (
                                      <span className="inline-flex items-center gap-1 font-semibold text-[#3D7A68]">
                                        <CheckCircle2
                                          className="h-3 w-3"
                                          aria-hidden="true"
                                        />
                                        Enregistrée
                                      </span>
                                    ) : (
                                      <span>Emplacement libre</span>
                                    )}
                                  </div>

                                  <h4 className="mt-1 truncate font-editorial text-base font-medium text-[#303E50]">
                                    {slot.contextTitle}
                                  </h4>
                                  <p className="mt-0.5 line-clamp-2 text-xs text-[#5A6B7F]">
                                    {slot.asset.slotLabel}
                                  </p>
                                </div>
                              </div>

                              {/* Optional Caption Input */}
                              <div className="mt-3">
                                <label
                                  htmlFor={`caption-${slotId}`}
                                  className="sr-only"
                                >
                                  Légende pour {slot.contextTitle}
                                </label>
                                <input
                                  id={`caption-${slotId}`}
                                  type="text"
                                  maxLength={300}
                                  value={
                                    captionInputs[slotId] ??
                                    savedCaptions[slotId] ??
                                    slot.asset.caption
                                  }
                                  onChange={(e) =>
                                    setCaptionInputs((prev) => ({
                                      ...prev,
                                      [slotId]: e.target.value,
                                    }))
                                  }
                                  placeholder="Légende de la photo..."
                                  className="w-full rounded-xl border border-[#303E50]/10 bg-[#F5F5F0]/75 px-3 py-2 text-xs text-[#303E50] placeholder:text-[#5A6B7F]/70 focus:border-[#303E50]/35 focus:bg-white focus:outline-none"
                                />
                              </div>

                              {/* Actions */}
                              <div className="mt-3 flex flex-wrap items-center gap-2">
                                <input
                                  ref={(el) => {
                                    fileInputRefs.current[slotId] = el;
                                  }}
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => void handleFileUpload(slot, e)}
                                  className="sr-only"
                                />

                                <button
                                  type="button"
                                  disabled={isBusy}
                                  onClick={() =>
                                    fileInputRefs.current[slotId]?.click()
                                  }
                                  className="inline-flex min-h-[38px] flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#303E50] px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-[#303E50]/90 disabled:opacity-60 whitespace-nowrap"
                                >
                                  {isBusy ? (
                                    <>
                                      <Loader2
                                        className="h-3.5 w-3.5 animate-spin"
                                        aria-hidden="true"
                                      />
                                      <span>Enregistrement...</span>
                                    </>
                                  ) : (
                                    <>
                                      <Upload
                                        className="h-3.5 w-3.5"
                                        aria-hidden="true"
                                      />
                                      <span>
                                        {overrides[slotId]
                                          ? 'Remplacer la photo'
                                          : 'Importer & Enregistrer'}
                                      </span>
                                    </>
                                  )}
                                </button>

                                <button
                                  type="button"
                                  disabled={isBusy}
                                  onClick={() =>
                                    setShowUrlRow((prev) => ({
                                      ...prev,
                                      [slotId]: !prev[slotId],
                                    }))
                                  }
                                  className="inline-flex min-h-[38px] items-center justify-center gap-1 rounded-xl border border-[#303E50]/12 bg-[#F5F5F0] px-3 py-2 text-xs font-medium text-[#303E50] transition-colors hover:bg-[#DCEAE5]/60 whitespace-nowrap"
                                  title="Coller un lien image HTTPS"
                                >
                                  <LinkIcon
                                    className="h-3.5 w-3.5"
                                    aria-hidden="true"
                                  />
                                  <span>URL</span>
                                </button>

                                {overrides[slotId] && (
                                  <button
                                    type="button"
                                    disabled={isBusy}
                                    onClick={() => void handleDeletePhoto(slotId)}
                                    className="inline-flex h-[38px] w-[38px] items-center justify-center rounded-xl border border-red-200 bg-red-50/70 text-red-700 transition-colors hover:bg-red-100"
                                    aria-label={`Supprimer la photo de ${slot.contextTitle}`}
                                    title="Supprimer la photo enregistrée"
                                  >
                                    <Trash2
                                      className="h-3.5 w-3.5"
                                      aria-hidden="true"
                                    />
                                  </button>
                                )}
                              </div>

                              {/* Optional External HTTPS URL Row */}
                              {showUrlRow[slotId] && (
                                <div className="mt-2.5 flex items-center gap-2">
                                  <input
                                    type="url"
                                    value={urlInputs[slotId] || ''}
                                    onChange={(e) =>
                                      setUrlInputs((prev) => ({
                                        ...prev,
                                        [slotId]: e.target.value,
                                      }))
                                    }
                                    placeholder="https://exemple.com/photo.jpg"
                                    className="min-w-0 flex-1 rounded-xl border border-[#303E50]/15 bg-[#F5F5F0] px-3 py-2 text-xs text-[#303E50] focus:bg-white focus:outline-none"
                                  />
                                  <button
                                    type="button"
                                    disabled={isBusy || !(urlInputs[slotId] || '').trim()}
                                    onClick={() => void handleUrlSave(slot)}
                                    className="inline-flex min-h-[36px] items-center rounded-xl bg-[#3D7A68] px-3.5 py-1.5 text-xs font-medium text-white hover:opacity-90 disabled:opacity-50"
                                  >
                                    Valider
                                  </button>
                                </div>
                              )}

                              {feedback && (
                                <p
                                  role="status"
                                  className={`mt-2.5 rounded-xl px-3 py-2 text-[11.5px] font-medium ${
                                    feedback.type === 'success'
                                      ? 'bg-[#DCEAE5]/70 text-[#303E50]'
                                      : 'bg-red-50 text-red-700'
                                  }`}
                                >
                                  {feedback.text}
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* TAB 2: LINKEDIN SESSIONS */}
                  {activeTab === 'sessions' && (
                    <div className="mt-6 space-y-5">
                      <p className="text-xs leading-relaxed text-[#4E5E72]">
                        Renseignez ici vos vraies sessions LinkedIn (titre, thème, date, rôle et lien vers le post ou replay). Les modifications sont enregistrées définitivement en ligne.
                      </p>

                      {portfolioData.sessions.items.map((baseSession, idx) => {
                        const draft = sessionDrafts[baseSession.id];
                        if (!draft) return null;
                        const isBusy = savingSessionId === baseSession.id;
                        const status = sessionStatus[baseSession.id];

                        return (
                          <div
                            key={baseSession.id}
                            className="rounded-[24px] border border-[#303E50]/[0.08] bg-white p-5 sm:p-6"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <h4 className="font-editorial text-lg font-medium text-[#303E50]">
                                Session 0{idx + 1} · {baseSession.category}
                              </h4>
                              {sessionOverrides[baseSession.id] && (
                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#3D7A68]">
                                  <CheckCircle2
                                    className="h-3.5 w-3.5"
                                    aria-hidden="true"
                                  />
                                  Publiée
                                </span>
                              )}
                            </div>

                            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                              <div>
                                <label className="block text-[11.5px] font-medium text-[#5A6B7F]">
                                  Titre de la session
                                </label>
                                <input
                                  type="text"
                                  maxLength={180}
                                  value={draft.title}
                                  onChange={(e) =>
                                    setSessionDrafts((prev) => ({
                                      ...prev,
                                      [baseSession.id]: {
                                        ...prev[baseSession.id],
                                        title: e.target.value,
                                      },
                                    }))
                                  }
                                  className="mt-1 w-full rounded-xl border border-[#303E50]/12 bg-[#F5F5F0]/75 px-3.5 py-2.5 text-sm text-[#303E50] focus:bg-white focus:outline-none"
                                />
                              </div>

                              <div>
                                <label className="block text-[11.5px] font-medium text-[#5A6B7F]">
                                  Date
                                </label>
                                <input
                                  type="text"
                                  maxLength={80}
                                  value={draft.date}
                                  onChange={(e) =>
                                    setSessionDrafts((prev) => ({
                                      ...prev,
                                      [baseSession.id]: {
                                        ...prev[baseSession.id],
                                        date: e.target.value,
                                      },
                                    }))
                                  }
                                  className="mt-1 w-full rounded-xl border border-[#303E50]/12 bg-[#F5F5F0]/75 px-3.5 py-2.5 text-sm text-[#303E50] focus:bg-white focus:outline-none"
                                />
                              </div>

                              <div className="sm:col-span-2">
                                <label className="block text-[11.5px] font-medium text-[#5A6B7F]">
                                  Thème / Sujet abordé
                                </label>
                                <input
                                  type="text"
                                  maxLength={320}
                                  value={draft.topic}
                                  onChange={(e) =>
                                    setSessionDrafts((prev) => ({
                                      ...prev,
                                      [baseSession.id]: {
                                        ...prev[baseSession.id],
                                        topic: e.target.value,
                                      },
                                    }))
                                  }
                                  className="mt-1 w-full rounded-xl border border-[#303E50]/12 bg-[#F5F5F0]/75 px-3.5 py-2.5 text-sm text-[#303E50] focus:bg-white focus:outline-none"
                                />
                              </div>

                              <div>
                                <label className="block text-[11.5px] font-medium text-[#5A6B7F]">
                                  Catégorie
                                </label>
                                <select
                                  value={draft.category}
                                  onChange={(e) =>
                                    setSessionDrafts((prev) => ({
                                      ...prev,
                                      [baseSession.id]: {
                                        ...prev[baseSession.id],
                                        category: e.target.value as SessionCategory,
                                      },
                                    }))
                                  }
                                  className="mt-1 w-full rounded-xl border border-[#303E50]/12 bg-[#F5F5F0]/75 px-3.5 py-2.5 text-sm text-[#303E50] focus:bg-white focus:outline-none"
                                >
                                  {SESSION_CATEGORIES.map((cat) => (
                                    <option key={cat} value={cat}>
                                      {cat}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div>
                                <label className="block text-[11.5px] font-medium text-[#5A6B7F]">
                                  Rôle
                                </label>
                                <select
                                  value={draft.role}
                                  onChange={(e) =>
                                    setSessionDrafts((prev) => ({
                                      ...prev,
                                      [baseSession.id]: {
                                        ...prev[baseSession.id],
                                        role: e.target.value as SessionRole,
                                      },
                                    }))
                                  }
                                  className="mt-1 w-full rounded-xl border border-[#303E50]/12 bg-[#F5F5F0]/75 px-3.5 py-2.5 text-sm text-[#303E50] focus:bg-white focus:outline-none"
                                >
                                  {SESSION_ROLES.map((r) => (
                                    <option key={r} value={r}>
                                      {r}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div className="sm:col-span-2">
                                <label className="block text-[11.5px] font-medium text-[#5A6B7F]">
                                  Lien du post ou replay LinkedIn
                                </label>
                                <input
                                  type="text"
                                  maxLength={500}
                                  value={draft.linkedinUrl}
                                  onChange={(e) =>
                                    setSessionDrafts((prev) => ({
                                      ...prev,
                                      [baseSession.id]: {
                                        ...prev[baseSession.id],
                                        linkedinUrl: e.target.value,
                                      },
                                    }))
                                  }
                                  className="mt-1 w-full rounded-xl border border-[#303E50]/12 bg-[#F5F5F0]/75 px-3.5 py-2.5 text-sm text-[#303E50] focus:bg-white focus:outline-none"
                                />
                              </div>
                            </div>

                            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  disabled={isBusy}
                                  onClick={() =>
                                    void handleSaveSession(baseSession.id)
                                  }
                                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl bg-[#303E50] px-4 py-2 text-xs font-medium text-white hover:bg-[#303E50]/90 disabled:opacity-60"
                                >
                                  {isBusy ? (
                                    <Loader2
                                      className="h-3.5 w-3.5 animate-spin"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <Save
                                      className="h-3.5 w-3.5"
                                      aria-hidden="true"
                                    />
                                  )}
                                  <span>Enregistrer cette session</span>
                                </button>

                                {sessionOverrides[baseSession.id] && (
                                  <button
                                    type="button"
                                    disabled={isBusy}
                                    onClick={() =>
                                      void handleResetSession(baseSession.id)
                                    }
                                    className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border border-[#303E50]/15 px-3.5 py-2 text-xs font-medium text-[#4E5E72] hover:bg-[#F5F5F0]"
                                  >
                                    Réinitialiser
                                  </button>
                                )}
                              </div>

                              {status && (
                                <span
                                  className={`text-xs font-medium ${
                                    status.type === 'success'
                                      ? 'text-[#3D7A68]'
                                      : 'text-red-700'
                                  }`}
                                >
                                  {status.text}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* TAB 3: CONTACT & LINKS */}
                  {activeTab === 'contact' && (
                    <form
                      onSubmit={(e) => void handleContactSubmit(e)}
                      className="mt-6 max-w-xl rounded-[26px] border border-[#303E50]/[0.08] bg-white p-6 sm:p-8"
                    >
                      <h3 className="font-editorial text-xl font-medium text-[#303E50]">
                        Coordonnées publiques du portfolio
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-[#4E5E72]">
                        Mettez à jour votre adresse email et votre lien LinkedIn pour activer directement les boutons de contact sur tout le site.
                      </p>

                      <div className="mt-6 space-y-4">
                        <div>
                          <label
                            htmlFor="admin-contact-email"
                            className="flex items-center gap-1.5 text-xs font-medium text-[#303E50]"
                          >
                            <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>Adresse Email professionnelle</span>
                          </label>
                          <input
                            id="admin-contact-email"
                            type="text"
                            maxLength={160}
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                            placeholder="ex: nom@exemple.com"
                            className="mt-1.5 w-full rounded-xl border border-[#303E50]/15 bg-[#F5F5F0]/75 px-4 py-2.5 text-sm text-[#303E50] focus:bg-white focus:outline-none"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="admin-contact-linkedin"
                            className="flex items-center gap-1.5 text-xs font-medium text-[#303E50]"
                          >
                            <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>URL du profil LinkedIn</span>
                          </label>
                          <input
                            id="admin-contact-linkedin"
                            type="text"
                            maxLength={300}
                            value={linkedinInput}
                            onChange={(e) => setLinkedinInput(e.target.value)}
                            placeholder="https://www.linkedin.com/in/..."
                            className="mt-1.5 w-full rounded-xl border border-[#303E50]/15 bg-[#F5F5F0]/75 px-4 py-2.5 text-sm text-[#303E50] focus:bg-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="mt-6 flex flex-wrap items-center gap-4">
                        <button
                          type="submit"
                          disabled={savingContact}
                          className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#303E50] px-6 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#303E50]/90 disabled:opacity-60"
                        >
                          {savingContact ? (
                            <Loader2
                              className="h-4 w-4 animate-spin"
                              aria-hidden="true"
                            />
                          ) : (
                            <Save className="h-4 w-4" aria-hidden="true" />
                          )}
                          <span>Enregistrer définitivement</span>
                        </button>

                        {contactStatus && (
                          <p
                            role="status"
                            className={`text-xs font-medium ${
                              contactStatus.type === 'success'
                                ? 'text-[#3D7A68]'
                                : 'text-red-700'
                            }`}
                          >
                            {contactStatus.text}
                          </p>
                        )}
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
