import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { EditablePhotoFrame } from './EditablePhotoFrame';
import { Reveal } from './Reveal';

export const ExperienceSection: React.FC = () => {
  const { experience } = portfolioData;

  return (
    <section
      id="experience"
      className="border-t border-[#303E50]/[0.08] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="tabular-nums text-xs font-medium tracking-[0.09em] text-[#5A6B7F]">
              03 · Professional Experience
            </p>
            <h2 className="mt-3.5 font-editorial text-3xl font-medium tracking-[-0.02em] text-[#303E50] sm:text-[40px] sm:leading-[1.12]">
              {experience.title}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-[1.7] text-[#4E5E72]">
            {experience.subtitle}
          </p>
        </Reveal>

        {/* Editorial Timeline Layout */}
        <div className="relative mt-16 space-y-8">
          {experience.items.map((item, idx) => (
            <Reveal key={item.id} delay={idx * 0.06}>
              <article className="surface-card surface-card-hover grid grid-cols-1 items-stretch gap-8 rounded-[30px] p-6 sm:p-9 lg:grid-cols-12 lg:gap-12">
                {/* Left Editorial Narrative */}
                <div className="flex flex-col justify-between lg:col-span-7">
                  <div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-[#5A6B7F]">
                      <span className="tabular-nums font-semibold text-[#303E50]">
                        0{idx + 1}
                      </span>
                      <span aria-hidden="true" className="text-[#B8D5CA]">·</span>
                      <span>{item.location}</span>
                    </div>

                    <h3 className="mt-3.5 font-editorial text-2xl font-medium leading-[1.22] tracking-[-0.015em] text-[#303E50] sm:text-[28px]">
                      {item.organisation}
                    </h3>

                    <p className="mt-2.5 text-sm font-semibold text-[#4E5E72]">
                      {item.position}
                    </p>

                    <p className="mt-5 max-w-[58ch] text-[15.5px] leading-[1.78] text-[#4E5E72]">
                      {item.description}
                    </p>

                    {item.keyActivities && item.keyActivities.length > 0 && (
                      <div className="mt-7 border-t border-[#303E50]/8 pt-6">
                        <h4 className="text-xs font-semibold tracking-[0.04em] text-[#303E50]">
                          Key Activities
                        </h4>
                        <ul className="mt-3.5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {item.keyActivities.map((activity) => (
                            <li
                              key={activity}
                              className="flex items-start gap-2.5 text-sm leading-relaxed text-[#4E5E72]"
                            >
                              <span
                                aria-hidden="true"
                                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B8D5CA]"
                              />
                              <span>{activity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Matted Organisation Photo Composition */}
                <div className="flex flex-col justify-center lg:col-span-5">
                  <div className="rounded-[24px] border border-[#303E50]/[0.06] bg-[#F5F5F0]/80 p-2.5">
                    <EditablePhotoFrame
                      asset={item.media}
                      aspectClassName="aspect-[4/3]"
                      variant="landscape"
                      className="rounded-[18px]"
                    />
                    <p className="mt-2.5 px-2 pb-0.5 text-[11.5px] font-medium text-[#5A6B7F]">
                      {item.media.caption}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
