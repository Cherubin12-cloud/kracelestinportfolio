import React, { useState } from 'react';
import { ArrowUpRight, Images, Trophy } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { ProjectItem } from '../types/portfolio';
import { EditablePhotoFrame } from './EditablePhotoFrame';
import { ProjectModal } from './ProjectModal';
import { Reveal } from './Reveal';

export const ProjectsSection: React.FC = () => {
  const { projects } = portfolioData;
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null
  );

  const getBentoSpan = (project: ProjectItem) => {
    switch (project.bentoSize) {
      case 'featured':
        return 'md:col-span-6 lg:col-span-7';
      case 'wide':
        return 'md:col-span-6 lg:col-span-5';
      case 'standard':
        return 'md:col-span-3 lg:col-span-4';
    }
  };

  return (
    <section
      id="projects"
      className="border-t border-[#303E50]/[0.08] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="tabular-nums text-xs font-medium tracking-[0.09em] text-[#5A6B7F]">
              05 · Selected Works
            </p>
            <h2 className="mt-3.5 font-editorial text-3xl font-medium tracking-[-0.02em] text-[#303E50] sm:text-[40px] sm:leading-[1.12]">
              {projects.title}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-[1.7] text-[#4E5E72]">
            {projects.subtitle}
          </p>
        </Reveal>

        {/* Award-caliber Editorial Bento Grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-6 lg:grid-cols-12">
          {projects.items.map((project, idx) => {
            const isFeatured = project.bentoSize === 'featured';
            const isWide = project.bentoSize === 'wide';
            const leadPhoto = project.gallery[0];
            const companionPhotos = isFeatured ? project.gallery.slice(1, 3) : [];

            const cardTint =
              project.id === 'hacktourism-2024'
                ? 'bg-gradient-to-b from-[#EDF2FA] via-white to-white'
                : 'bg-white';

            return (
              <Reveal
                key={project.id}
                delay={idx * 0.05}
                className={`h-full ${getBentoSpan(project)}`}
              >
                <article
                  className={`surface-card surface-card-hover group flex h-full flex-col justify-between rounded-[28px] p-6 sm:p-7 ${cardTint}`}
                >
                  <div>
                    {/* Media composition: Featured card shows multi-frame gallery preview */}
                    {isFeatured && companionPhotos.length > 0 ? (
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-12">
                        <div className="sm:col-span-8">
                          <EditablePhotoFrame
                            asset={leadPhoto}
                            aspectClassName="aspect-[16/11]"
                            variant="landscape"
                            showExpandHint
                            onImageClick={() => setSelectedProject(project)}
                            className="h-full"
                          />
                        </div>
                        <div className="hidden grid-rows-2 gap-3 sm:col-span-4 sm:grid">
                          {companionPhotos.map((subPhoto) => (
                            <EditablePhotoFrame
                              key={subPhoto.id}
                              asset={subPhoto}
                              aspectClassName="aspect-[4/3]"
                              variant="thumbnail"
                              allowUpload={false}
                              onImageClick={() => setSelectedProject(project)}
                              className="h-full"
                            />
                          ))}
                        </div>
                      </div>
                    ) : (
                      <EditablePhotoFrame
                        asset={leadPhoto}
                        aspectClassName={isWide ? 'aspect-[16/10]' : 'aspect-[4/3]'}
                        variant="landscape"
                        showExpandHint
                        onImageClick={() => setSelectedProject(project)}
                      />
                    )}

                    {/* Clean unboxed editorial metadata */}
                    <div className="mt-6 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-medium text-[#5A6B7F]">
                      <span>{project.role}</span>
                      {project.edition && (
                        <>
                          <span aria-hidden="true" className="text-[#B8D5CA]">
                            ·
                          </span>
                          <span>{project.edition}</span>
                        </>
                      )}
                      {project.achievement && (
                        <>
                          <span aria-hidden="true" className="text-[#B8D5CA]">
                            ·
                          </span>
                          <span className="inline-flex items-center gap-1 font-semibold text-[#303E50]">
                            <Trophy className="h-3 w-3 text-[#5D76A8]" aria-hidden="true" />
                            {project.achievement}
                          </span>
                        </>
                      )}
                    </div>

                    <h3
                      className={`mt-2.5 font-editorial font-medium leading-[1.2] tracking-[-0.015em] text-[#303E50] ${
                        isFeatured
                          ? 'text-2xl sm:text-[28px]'
                          : 'text-[22px] sm:text-2xl'
                      }`}
                    >
                      {project.title}
                    </h3>

                    {project.organisation && (
                      <p className="mt-1 text-xs font-medium text-[#5A6B7F]">
                        {project.organisation}
                      </p>
                    )}

                    {/* Highlighted factual outcome (National Prize / Student Reach) */}
                    {(project.prize || project.reachMetric) && (
                      <div className="mt-4 rounded-2xl border border-[#303E50]/[0.06] bg-[#F5F5F0]/85 px-4 py-2.5">
                        <p className="tabular-nums text-[13px] font-semibold text-[#303E50]">
                          {project.prize || project.reachMetric}
                        </p>
                      </div>
                    )}

                    <p className="mt-4 text-sm leading-[1.76] text-[#4E5E72]">
                      {project.description}
                    </p>
                  </div>

                  {/* Card Footer: Unboxed highlights & gallery lightbox trigger */}
                  <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-[#303E50]/8 pt-4">
                    <p className="text-xs leading-relaxed text-[#5A6B7F]">
                      {project.highlights.join(' · ')}
                    </p>

                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="group/btn inline-flex min-h-[40px] items-center gap-1.5 text-xs font-semibold text-[#303E50] transition-colors hover:text-[#303E50]/70 whitespace-nowrap shrink-0"
                    >
                      <Images className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>
                        {project.gallery.length > 1
                          ? `Gallery (${project.gallery.length})`
                          : 'View details'}
                      </span>
                      <ArrowUpRight
                        className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
