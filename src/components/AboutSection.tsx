import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Reveal } from './Reveal';

export const AboutSection: React.FC = () => {
  const { about } = portfolioData;
  const [leadParagraph, ...bodyParagraphs] = about.paragraphs;

  return (
    <section
      id="about"
      className="border-t border-[#303E50]/[0.08] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Editorial chapter heading & sculptural sage pull-quote */}
          <Reveal className="flex flex-col justify-between gap-10 lg:col-span-5">
            <div>
              <p className="tabular-nums text-xs font-medium tracking-[0.09em] text-[#5A6B7F]">
                01 · Biography
              </p>
              <h2 className="mt-3.5 font-editorial text-3xl font-medium tracking-[-0.02em] text-[#303E50] sm:text-[40px] sm:leading-[1.12]">
                {about.title}
              </h2>
            </div>

            <figure className="relative overflow-hidden rounded-[28px] border border-[#303E50]/[0.06] bg-[#DCEAE5]/75 p-8 shadow-[0_14px_34px_-22px_rgba(48,62,80,0.16)] sm:p-9">
              {/* Subtle organic light circle ornament */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -bottom-10 h-36 w-36 rounded-full bg-white/45"
              />
              <span
                aria-hidden="true"
                className="relative block font-editorial text-5xl leading-none text-[#303E50]/25 select-none"
              >
                &ldquo;
              </span>
              <blockquote className="relative -mt-2 font-editorial text-2xl leading-[1.34] font-normal tracking-[-0.01em] text-[#303E50] sm:text-[27px]">
                {about.highlightedStatement}
              </blockquote>
              <figcaption className="relative mt-6 flex items-center gap-2.5 text-xs font-medium text-[#4E5E72]">
                <span className="h-px w-6 bg-[#303E50]/25" aria-hidden="true" />
                <span>Guiding perspective</span>
              </figcaption>
            </figure>
          </Reveal>

          {/* Right Column: Lead editorial paragraph, body narrative & foundation pillars */}
          <Reveal delay={0.08} className="flex flex-col justify-between gap-10 lg:col-span-7">
            <div className="max-w-[64ch] space-y-5">
              <p className="font-editorial text-lg leading-[1.65] font-normal text-[#303E50] sm:text-[20px]">
                {leadParagraph}
              </p>
              <div className="space-y-4 text-[15.5px] leading-[1.82] text-[#4E5E72]">
                {bodyParagraphs.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            <dl className="grid grid-cols-1 gap-6 border-t border-[#303E50]/10 pt-8 sm:grid-cols-3">
              {about.pillars.map((pillar) => (
                <div key={pillar.label} className="space-y-1.5">
                  <dt className="text-[11.5px] font-semibold tracking-[0.04em] text-[#5A6B7F]">
                    {pillar.label}
                  </dt>
                  <dd className="text-sm font-medium leading-[1.55] text-[#303E50]">
                    {pillar.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
