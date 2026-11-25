import React, { useState, useRef, useEffect } from 'react';
import { Monitor, Smartphone, ExternalLink, Image as ImageIcon, Globe } from 'lucide-react';
import { DigitalProductItem } from '../types/portfolio';
import { EditablePhotoFrame } from './EditablePhotoFrame';

interface LiveWebsitePreviewProps {
  product: DigitalProductItem;
}

export const LiveWebsitePreview: React.FC<LiveWebsitePreviewProps> = ({
  product,
}) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile' | 'screenshot'>('desktop');
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeFailed, setIframeFailed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(520);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateWidth = () => {
      setContainerWidth(el.clientWidth || 520);
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const desktopVirtualWidth = 1280;
  const desktopVirtualHeight = 820;
  const desktopScale = containerWidth / desktopVirtualWidth;

  const toneStageBg =
    product.accentTone === 'sage'
      ? 'bg-[#DCEAE5]/55'
      : product.accentTone === 'blue'
      ? 'bg-[#E4ECF6]/75'
      : 'bg-[#EFEFE8]';

  const showFallback = viewMode === 'screenshot' || iframeFailed;

  return (
    <div
      className={`overflow-hidden rounded-[22px] border border-[#303E50]/[0.08] ${toneStageBg}`}
    >
      {/* Browser Window Top Chrome */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#303E50]/[0.07] bg-white/90 px-3.5 py-2.5 backdrop-blur-sm">
        {/* Left: Quiet browser chrome dots + real URL display */}
        <div className="flex min-w-0 flex-1 items-center gap-2.5">
          <div className="hidden items-center gap-1.5 sm:flex" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#303E50]/14" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#303E50]/14" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#303E50]/14" />
          </div>

          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-w-0 items-center gap-1.5 rounded-lg bg-[#F5F5F0] px-2.5 py-1 text-[11.5px] font-medium text-[#4E5E72] transition-colors hover:text-[#303E50]"
            title={`Open ${product.title} at ${product.url}`}
          >
            <Globe className="h-3 w-3 shrink-0 text-[#5A6B7F]" aria-hidden="true" />
            <span className="truncate">{product.displayDomain}</span>
          </a>
        </div>

        {/* Right: Responsive preview mode switcher & external open */}
        <div className="flex items-center gap-1 shrink-0">
          <div
            role="group"
            aria-label={`Preview mode for ${product.title}`}
            className="flex items-center rounded-lg bg-[#F0F0E8] p-0.5"
          >
            <button
              type="button"
              onClick={() => {
                setIframeFailed(false);
                setViewMode('desktop');
              }}
              className={`inline-flex h-7 w-7 items-center justify-center rounded-md transition-colors ${
                viewMode === 'desktop' && !iframeFailed
                  ? 'bg-white text-[#303E50] shadow-xs'
                  : 'text-[#5A6B7F] hover:text-[#303E50]'
              }`}
              title="Desktop live preview"
              aria-label="Desktop live preview"
            >
              <Monitor className="h-3.5 w-3.5" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => {
                setIframeFailed(false);
                setViewMode('mobile');
              }}
              className={`inline-flex h-7 w-7 items-center justify-center rounded-md transition-colors ${
                viewMode === 'mobile' && !iframeFailed
                  ? 'bg-white text-[#303E50] shadow-xs'
                  : 'text-[#5A6B7F] hover:text-[#303E50]'
              }`}
              title="Mobile live preview"
              aria-label="Mobile live preview"
            >
              <Smartphone className="h-3.5 w-3.5" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => setViewMode('screenshot')}
              className={`inline-flex h-7 w-7 items-center justify-center rounded-md transition-colors ${
                showFallback
                  ? 'bg-white text-[#303E50] shadow-xs'
                  : 'text-[#5A6B7F] hover:text-[#303E50]'
              }`}
              title="Screenshot fallback view"
              aria-label="Screenshot fallback view"
            >
              <ImageIcon className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>

          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[#4E5E72] transition-colors hover:bg-[#DCEAE5]/60 hover:text-[#303E50]"
            aria-label={`Open ${product.title} live website in a new tab`}
            title="Open live website"
          >
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Preview Viewport Stage */}
      <div
        ref={containerRef}
        className="relative aspect-[16/10] w-full overflow-hidden bg-[#F5F5F0]"
      >
        {showFallback ? (
          <div className="h-full w-full p-3">
            <EditablePhotoFrame
              asset={product.fallbackScreenshot}
              aspectClassName="h-full w-full"
              variant="landscape"
              className="h-full w-full rounded-[14px]"
            />
          </div>
        ) : viewMode === 'desktop' ? (
          <div className="relative h-full w-full overflow-hidden bg-white">
            {!iframeLoaded && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-[#F5F5F0]/95 p-6 text-center">
                <span className="font-editorial text-base font-medium text-[#303E50]">
                  Loading live preview of {product.title}
                </span>
                <span className="text-xs text-[#5A6B7F]">
                  {product.displayDomain}
                </span>
              </div>
            )}

            <div
              style={{
                width: `${desktopVirtualWidth}px`,
                height: `${desktopVirtualHeight}px`,
                transform: `scale(${desktopScale})`,
                transformOrigin: 'top left',
              }}
            >
              <iframe
                src={product.url}
                title={`${product.title} live website preview`}
                loading="lazy"
                onLoad={() => setIframeLoaded(true)}
                onError={() => setIframeFailed(true)}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                referrerPolicy="no-referrer"
                className="h-full w-full border-0 bg-white"
              />
            </div>
          </div>
        ) : (
          /* Centered Responsive Mobile Device Preview Frame */
          <div className="flex h-full w-full items-center justify-center p-3 sm:p-4">
            <div className="relative h-full w-[220px] max-w-full overflow-hidden rounded-[22px] border-[5px] border-[#303E50]/85 bg-white shadow-lg sm:w-[240px]">
              <div
                style={{
                  width: '375px',
                  height: '667px',
                  transform: 'scale(0.58)',
                  transformOrigin: 'top left',
                }}
              >
                <iframe
                  src={product.url}
                  title={`${product.title} mobile live website preview`}
                  loading="lazy"
                  onLoad={() => setIframeLoaded(true)}
                  onError={() => setIframeFailed(true)}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  referrerPolicy="no-referrer"
                  className="h-full w-full border-0 bg-white"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
