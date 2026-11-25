import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface PhotoPreviewContextValue {
  overrides: Record<string, string>;
  setPhotoOverride: (id: string, file: File) => void;
  clearPhotoOverride: (id: string) => void;
  clearAllOverrides: () => void;
  overrideCount: number;
}

const STORAGE_KEY = 'ykc_portfolio_photo_previews_v1';

const PhotoPreviewContext = createContext<PhotoPreviewContextValue | null>(null);

export const PhotoPreviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [overrides, setOverrides] = useState<Record<string, string>>(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      return saved ? (JSON.parse(saved) as Record<string, string>) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
    } catch {
      // If localStorage quota is exceeded with large preview photos, keep in memory for the session
    }
  }, [overrides]);

  const setPhotoOverride = useCallback((id: string, file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setOverrides((prev) => ({ ...prev, [id]: reader.result as string }));
      }
    };
    reader.readAsDataURL(file);
  }, []);

  const clearPhotoOverride = useCallback((id: string) => {
    setOverrides((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const clearAllOverrides = useCallback(() => {
    setOverrides({});
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  }, []);

  return (
    <PhotoPreviewContext.Provider
      value={{
        overrides,
        setPhotoOverride,
        clearPhotoOverride,
        clearAllOverrides,
        overrideCount: Object.keys(overrides).length,
      }}
    >
      {children}
    </PhotoPreviewContext.Provider>
  );
};

export function usePhotoPreview(): PhotoPreviewContextValue {
  const context = useContext(PhotoPreviewContext);
  if (!context) {
    throw new Error('usePhotoPreview must be used within a PhotoPreviewProvider');
  }
  return context;
}
