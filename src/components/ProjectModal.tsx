import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ProjectItem } from '../types/portfolio';
import { EditablePhotoFrame } from './EditablePhotoFrame';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setActiveImageIndex(0);
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && project.gallery.length > 1) {
        setActiveImageIndex((prev) => (prev + 1) % project.gallery.length);
      } else if (e.key === 'ArrowLeft' && project.gallery.length > 1) {
        setActiveImageIndex(
          (prev) => (prev - 1 + project.gallery.length) % project.gallery.length
        );
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  const activeAsset = project
    ? project.gallery[activeImageIndex] || project.gallery[0]
    : null;
  const hasMultiplePhotos = project ? project.gallery.length > 1 : false;

  return (
    <AnimatePresence>
      {project && activeAsset && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#303E50]/55 p-4 backdrop-blur-md sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 0, y: 16, scale: 0.985 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 12, scale: 0.985 }
            }
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[30px] border border-white/60 bg-[#F5F5F0] p-6 shadow-2xl sm:p-9"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-medium text-[#5A6B7F]">
                  <span>{project.role}</span>
                  {project.edition && (
                    <>
                      <span aria-hidden="true" className="text-[#B8D5CA]">·</span>
                      <span>{project.edition}</span>
                    </>
                  )}
                  {project.achievement && (
                    <>
                      <span aria-hidden="true" className="text-[#B8D5CA]">·</span>
                      <span className="font-semibold text-[#303E50]">
                        {project.achievement}
                      </span>
                    </>
                  )}
                </div>

                <h3
                  id="project-modal-title"
                  className="mt-2 font-editorial text-2xl font-medium tracking-[-0.015em] text-[#303E50] sm:text-3xl"
                >
                  {project.title}
                </h3>

                {project.organisation && (
                  <p className="mt-1 text-sm text-[#4E5E72]">
                    {project.organisation}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#303E50]/10 bg-white text-[#303E50] shadow-xs transition-colors hover:bg-[#DCEAE5]/75"
                aria-label="Close project details"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Matted Main Stage */}
            <div className="mt-7 rounded-[26px] border border-[#303E50]/[0.06] bg-white p-3 sm:p-4">
              <EditablePhotoFrame
                asset={activeAsset}
                aspectClassName="aspect-[16/10]"
                variant="gallery"
                className="w-full rounded-[18px]"
              />

              <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3 px-1">
                <p className="text-xs leading-relaxed text-[#4E5E72]">
                  {activeAsset.caption}
                </p>

                {hasMultiplePhotos && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveImageIndex(
                          (prev) =>
                            (prev - 1 + project.gallery.length) %
                            project.gallery.length
                        )
                      }
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#303E50]/10 bg-[#F5F5F0] text-[#303E50] transition-colors hover:bg-[#DCEAE5]/75"
                      aria-label="Previous gallery photo"
                    >
                      <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <span className="tabular-nums text-xs font-medium text-[#4E5E72]">
                      {activeImageIndex + 1} / {project.gallery.length}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveImageIndex(
                          (prev) => (prev + 1) % project.gallery.length
                        )
                      }
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#303E50]/10 bg-[#F5F5F0] text-[#303E50] transition-colors hover:bg-[#DCEAE5]/75"
                      aria-label="Next gallery photo"
                    >
                      <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnail Selector Strip */}
            {hasMultiplePhotos && (
              <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
                {project.gallery.map((photo, index) => (
                  <button
                    key={photo.id}
                    type="button"
                    onClick={() => setActiveImageIndex(index)}
                    className={`overflow-hidden rounded-2xl p-1.5 text-left transition-all ${
                      index === activeImageIndex
                        ? 'bg-white ring-2 ring-[#303E50]'
                        : 'bg-white/65 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <EditablePhotoFrame
                      asset={photo}
                      aspectClassName="aspect-[4/3]"
                      variant="thumbnail"
                      allowUpload={false}
                      className="rounded-xl"
                    />
                    <span className="mt-1.5 block truncate px-1 text-[11px] font-medium text-[#303E50]">
                      {photo.slotLabel}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Editorial Details */}
            <div className="mt-8 grid grid-cols-1 gap-7 border-t border-[#303E50]/10 pt-7 md:grid-cols-12">
              <div className="md:col-span-8">
                <h4 className="text-xs font-semibold tracking-[0.04em] text-[#303E50]">
                  Overview
                </h4>
                <p className="mt-2.5 text-[15px] leading-[1.78] text-[#4E5E72]">
                  {project.description}
                </p>
              </div>

              <div className="space-y-5 md:col-span-4">
                {(project.prize || project.reachMetric) && (
                  <div>
                    <h4 className="text-xs font-semibold tracking-[0.04em] text-[#303E50]">
                      Key Outcome
                    </h4>
                    <p className="mt-1.5 tabular-nums text-sm font-semibold text-[#303E50]">
                      {project.prize || project.reachMetric}
                    </p>
                  </div>
                )}

                <div>
                  <h4 className="text-xs font-semibold tracking-[0.04em] text-[#303E50]">
                    Project Highlights
                  </h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#4E5E72]">
                    {project.highlights.join(' · ')}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
