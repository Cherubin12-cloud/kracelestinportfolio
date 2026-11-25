import React, { useRef, useState } from 'react';
import { ImagePlus, RotateCcw, Expand } from 'lucide-react';
import { MediaAsset, PaletteTone } from '../types/portfolio';
import { usePhotoPreview } from '../context/PhotoPreviewContext';

interface EditablePhotoFrameProps {
  asset: MediaAsset;
  aspectClassName?: string;
  className?: string;
  variant?: 'portrait' | 'landscape' | 'gallery' | 'thumbnail';
  allowUpload?: boolean;
  showExpandHint?: boolean;
  onImageClick?: () => void;
}

const TONE_ART: Record<
  PaletteTone,
  {
    surface: string;
    shapePrimary: string;
    shapeSecondary: string;
    shapeTertiary: string;
    ink: string;
  }
> = {
  sage: {
    surface: 'bg-[#DFEBE6]',
    shapePrimary: '#B8D5CA',
    shapeSecondary: '#FFFFFF',
    shapeTertiary: '#A7B8D8',
    ink: '#303E50',
  },
  mutedSage: {
    surface: 'bg-[#E5EFEA]',
    shapePrimary: '#B8D5CA',
    shapeSecondary: '#A7B8D8',
    shapeTertiary: '#FFFFFF',
    ink: '#303E50',
  },
  blue: {
    surface: 'bg-[#E4ECF6]',
    shapePrimary: '#A7B8D8',
    shapeSecondary: '#DCEAE5',
    shapeTertiary: '#FFFFFF',
    ink: '#303E50',
  },
  lavender: {
    surface: 'bg-[#EFE8F4]',
    shapePrimary: '#C7A7D8',
    shapeSecondary: '#DCEAE5',
    shapeTertiary: '#FFFFFF',
    ink: '#303E50',
  },
  ivory: {
    surface: 'bg-[#EFEFE8]',
    shapePrimary: '#B8D5CA',
    shapeSecondary: '#A7B8D8',
    shapeTertiary: '#C7A7D8',
    ink: '#303E50',
  },
};

export const EditablePhotoFrame: React.FC<EditablePhotoFrameProps> = ({
  asset,
  aspectClassName = 'aspect-[4/3]',
  className = '',
  variant = 'landscape',
  allowUpload = true,
  showExpandHint = false,
  onImageClick,
}) => {
  const { overrides, setPhotoOverride, clearPhotoOverride } = usePhotoPreview();
  const [hasError, setHasError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const previewSrc = overrides[asset.id] || null;
  const activeSrc = !hasError ? previewSrc || asset.src : null;
  const art = TONE_ART[asset.tone];
  const isCompact = variant === 'thumbnail';

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setHasError(false);
      setPhotoOverride(asset.id, file);
    }
    event.target.value = '';
  };

  const triggerUpload = (e: React.MouseEvent) => {
    e.stopPropagation();
    inputRef.current?.click();
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHasError(false);
    clearPhotoOverride(asset.id);
  };

  return (
    <div
      className={`group/frame relative overflow-hidden rounded-[20px] border border-[#303E50]/[0.06] ${art.surface} ${aspectClassName} ${className} ${
        onImageClick ? 'cursor-pointer' : ''
      }`}
      onClick={onImageClick}
    >
      {allowUpload && (
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="sr-only"
          aria-label={`Preview local photograph for ${asset.slotLabel}`}
        />
      )}

      {activeSrc ? (
        <>
          <img
            src={activeSrc}
            alt={asset.alt}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setHasError(true)}
            className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/frame:scale-[1.035]"
          />

          {/* Subtle vignette at bottom on hover for control legibility */}
          {!isCompact && (allowUpload || showExpandHint) && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#303E50]/45 via-[#303E50]/12 to-transparent opacity-0 transition-opacity duration-200 group-hover/frame:opacity-100" />
          )}

          {!isCompact && (allowUpload || showExpandHint) && (
            <div className="absolute right-3 bottom-3 left-3 flex items-center justify-between gap-2 opacity-0 transition-opacity duration-200 group-hover/frame:opacity-100 focus-within:opacity-100">
              {showExpandHint ? (
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-white/92 px-3 py-1.5 text-[11px] font-medium text-[#303E50] shadow-xs backdrop-blur-sm">
                  <Expand className="h-3 w-3" aria-hidden="true" />
                  Inspect gallery
                </span>
              ) : (
                <span />
              )}

              {allowUpload && (
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={triggerUpload}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-white/95 px-3 py-1.5 text-xs font-medium text-[#303E50] shadow-xs backdrop-blur-sm transition-colors hover:bg-white whitespace-nowrap shrink-0"
                  >
                    <ImagePlus className="h-3.5 w-3.5" aria-hidden="true" />
                    Change photo
                  </button>
                  {previewSrc && (
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-[#303E50]/90 text-white shadow-xs backdrop-blur-sm transition-colors hover:bg-[#303E50]"
                      aria-label="Reset preview photo"
                      title="Reset to placeholder"
                    >
                      <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <div
          className={`relative flex h-full w-full flex-col justify-between ${
            isCompact ? 'p-2.5' : 'p-5 sm:p-6'
          }`}
        >
          {/* Art-directed Bauhaus / Editorial architectural placeholder composition */}
          <svg
            aria-hidden="true"
            viewBox={variant === 'portrait' ? '0 0 400 500' : '0 0 480 340'}
            fill="none"
            className="pointer-events-none absolute inset-0 h-full w-full"
            preserveAspectRatio="xMidYMid slice"
          >
            {variant === 'portrait' ? (
              <>
                {/* Soft tonal overlapping editorial forms */}
                <circle
                  cx="312"
                  cy="112"
                  r="138"
                  fill={art.shapePrimary}
                  fillOpacity="0.48"
                />
                <circle
                  cx="78"
                  cy="392"
                  r="132"
                  fill={art.shapeTertiary}
                  fillOpacity="0.34"
                />
                <path
                  d="M72 480V220C72 149.308 129.308 92 200 92C270.692 92 328 149.308 328 220V480"
                  fill={art.shapeSecondary}
                  fillOpacity="0.42"
                />
                {/* Arch outline & refined viewfinder registration marks */}
                <path
                  d="M84 468V224C84 159.935 135.935 108 200 108C264.065 108 316 159.935 316 224V468"
                  stroke={art.ink}
                  strokeOpacity="0.14"
                  strokeWidth="1.2"
                />
                {/* Minimal editorial silhouette study lines */}
                <circle
                  cx="200"
                  cy="214"
                  r="44"
                  stroke={art.ink}
                  strokeOpacity="0.2"
                  strokeWidth="1.35"
                />
                <path
                  d="M124 358C136 308 164 282 200 282C236 282 264 308 276 358"
                  stroke={art.ink}
                  strokeOpacity="0.2"
                  strokeWidth="1.35"
                  strokeLinecap="round"
                />
                {/* Fine optical crosshair accents */}
                <path
                  d="M28 52V28H52M348 28H372V52M28 448V472H52M348 472H372V448"
                  stroke={art.ink}
                  strokeOpacity="0.18"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </>
            ) : (
              <>
                <circle
                  cx="392"
                  cy="74"
                  r="130"
                  fill={art.shapePrimary}
                  fillOpacity="0.46"
                />
                <circle
                  cx="82"
                  cy="296"
                  r="118"
                  fill={art.shapeSecondary}
                  fillOpacity="0.52"
                />
                <rect
                  x="44"
                  y="44"
                  width="392"
                  height="252"
                  rx="20"
                  fill={art.shapeTertiary}
                  fillOpacity="0.28"
                  stroke={art.ink}
                  strokeOpacity="0.11"
                  strokeWidth="1.15"
                />
                {/* Subtle editorial horizon & geometric composition */}
                <line
                  x1="44"
                  y1="224"
                  x2="436"
                  y2="224"
                  stroke={art.ink}
                  strokeOpacity="0.09"
                  strokeWidth="1"
                />
                <circle
                  cx="176"
                  cy="142"
                  r="34"
                  stroke={art.ink}
                  strokeOpacity="0.18"
                  strokeWidth="1.25"
                />
                <path
                  d="M126 224L204 156L266 206L314 166L368 224"
                  stroke={art.ink}
                  strokeOpacity="0.2"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Viewfinder corner registration marks */}
                <path
                  d="M24 44V24H44M436 24H456V44M24 296V316H44M436 316H456V296"
                  stroke={art.ink}
                  strokeOpacity="0.16"
                  strokeWidth="1.15"
                  strokeLinecap="round"
                />
              </>
            )}
          </svg>

          {!isCompact && (
            <>
              {/* Quiet top metadata */}
              <div className="relative z-10 flex items-center justify-between gap-2 text-[11px] font-medium text-[#303E50]/75">
                <span className="tracking-wide">{asset.slotLabel}</span>
                <span className="tabular-nums text-[#303E50]/50">
                  {variant === 'portrait' ? '4 : 5' : '4 : 3'}
                </span>
              </div>

              {/* Bottom editorial caption & preview action */}
              <div className="relative z-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <p className="max-w-[27ch] text-xs leading-relaxed text-[#303E50]/75">
                  {asset.suggestedPhoto}
                </p>

                {allowUpload && (
                  <button
                    type="button"
                    onClick={triggerUpload}
                    className="inline-flex min-h-[36px] w-fit items-center gap-1.5 rounded-xl border border-[#303E50]/10 bg-white/92 px-3.5 py-1.5 text-xs font-medium text-[#303E50] shadow-xs backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-sm whitespace-nowrap shrink-0"
                  >
                    <ImagePlus className="h-3.5 w-3.5" aria-hidden="true" />
                    Preview photo
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
