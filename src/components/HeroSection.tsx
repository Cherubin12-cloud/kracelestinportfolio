import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { portfolioData } from '../data/portfolioData';
import { EditablePhotoFrame } from './EditablePhotoFrame';

export const HeroSection: React.FC = () => {
  const { identity } = portfolioData;
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-10 pb-20 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28"
    >
      {/* Subtle architectural tonal backdrop washes — quiet, soft, never neon */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-[-8%] h-[440px] w-[440px] rounded-full bg-[#DCEAE5]/55 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-44 left-[-10%] h-[360px] w-[360px] rounded-full bg-[#A7B8D8]/20 blur-3xl"
      />

      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Editorial typography hierarchy, positioning & actions */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center lg:col-span-7"
          >
            <div className="flex items-center gap-3 text-xs font-medium tracking-[0.09em] text-[#5A6B7F]">
              <span>{identity.eyebrow}</span>
            </div>

            <h1 className="mt-5 font-editorial text-[clamp(2.85rem,5.4vw,4.65rem)] font-medium leading-[1.03] tracking-[-0.025em] text-[#303E50]">
              {identity.fullName}
            </h1>

            <p className="mt-5 max-w-[24ch] font-editorial text-[clamp(1.5rem,2.55vw,2.2rem)] font-normal leading-[1.22] tracking-[-0.015em] text-[#303E50]/90">
              Connecting Ideas, Technology and{' '}
              <em className="font-normal italic text-[#303E50]">
                Human Potential.
              </em>
            </p>

            <p className="mt-6 max-w-[56ch] text-base leading-[1.78] text-[#4E5E72] sm:text-[17px]">
              {identity.heroDescription}
            </p>

            {/* Unboxed domain index separated by delicate typographic slashes */}
            <div
              aria-label="Professional positioning"
              className="mt-8 flex flex-wrap items-center gap-x-3.5 gap-y-2 border-y border-[#303E50]/10 py-4 text-[13.5px] font-medium text-[#303E50]"
            >
              {identity.domains.map((domain, index) => (
                <React.Fragment key={domain}>
                  <span>{domain}</span>
                  {index < identity.domains.length - 1 && (
                    <span aria-hidden="true" className="text-[#A7B8D8]">
                      /
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Primary & Secondary Actions */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="group inline-flex min-h-[48px] items-center gap-2.5 rounded-2xl bg-[#303E50] px-7 py-3 text-sm font-medium text-white shadow-[0_12px_28px_-14px_rgba(48,62,80,0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#303E50]/92 whitespace-nowrap shrink-0"
              >
                <span>Explore My Work</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>

              <a
                href="#contact"
                className="group inline-flex min-h-[48px] items-center gap-2 rounded-2xl border border-[#303E50]/18 bg-white/85 px-7 py-3 text-sm font-medium text-[#303E50] shadow-[0_4px_16px_-10px_rgba(48,62,80,0.16)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#303E50]/35 hover:bg-white whitespace-nowrap shrink-0"
              >
                <span>Let&apos;s Connect</span>
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Sculptural museum-mat portrait frame with layered soft shapes */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.65,
              delay: 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative flex items-center justify-center lg:col-span-5"
          >
            <div className="relative w-full max-w-[440px] lg:max-w-none">
              {/* Tasteful layered soft UI geometric accents */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-6 -right-5 h-36 w-36 rounded-[34px] bg-[#A7B8D8]/35"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-6 -left-6 h-44 w-44 rounded-full bg-[#C7A7D8]/28"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-14 -left-4 h-28 w-28 rounded-[24px] border border-[#303E50]/[0.08] bg-[#DCEAE5]/75 backdrop-blur-xs"
              />

              {/* Gallery mat container with refined caption footer */}
              <div className="surface-mat relative rounded-[32px] p-3.5 sm:p-4">
                <EditablePhotoFrame
                  asset={identity.portrait}
                  aspectClassName="aspect-[4/5]"
                  variant="portrait"
                  className="rounded-[22px]"
                />
                <div className="mt-3.5 flex items-center justify-between px-2 pb-1 text-xs text-[#5A6B7F]">
                  <span className="font-medium text-[#303E50]">
                    {identity.fullName}
                  </span>
                  <span>{identity.location}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-width editorial manifesto strip below the hero split */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="surface-card mt-16 grid grid-cols-1 gap-6 rounded-[26px] px-7 py-7 sm:px-10 sm:py-8 lg:mt-20 lg:grid-cols-12 lg:items-center"
        >
          <p className="font-editorial text-lg leading-[1.45] text-[#303E50] sm:text-[21px] lg:col-span-7">
            &ldquo;{identity.supportingStatement}&rdquo;
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#303E50]/8 pt-4 text-xs font-medium text-[#5A6B7F] lg:col-span-5 lg:justify-end lg:border-t-0 lg:border-l lg:border-[#303E50]/10 lg:pt-0 lg:pl-8">
            <span className="text-[#303E50]">Digital Innovation</span>
            <span aria-hidden="true" className="text-[#B8D5CA]">·</span>
            <span>Education Technology</span>
            <span aria-hidden="true" className="text-[#B8D5CA]">·</span>
            <span>Youth Leadership</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
