import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { PaletteTone } from '../types/portfolio';
import { Reveal } from './Reveal';

const AREA_STYLES: Record<PaletteTone, { card: string; accent: string }> = {
  sage: {
    card: 'bg-[#DCEAE5]/60 border-[#303E50]/[0.06]',
    accent: 'bg-white/60',
  },
  blue: {
    card: 'bg-[#E5ECF6]/80 border-[#303E50]/[0.06]',
    accent: 'bg-white/65',
  },
  lavender: {
    card: 'bg-[#EFE8F4]/80 border-[#303E50]/[0.06]',
    accent: 'bg-white/65',
  },
  mutedSage: {
    card: 'bg-[#B8D5CA]/35 border-[#303E50]/[0.06]',
    accent: 'bg-white/60',
  },
  ivory: {
    card: 'bg-white border-[#303E50]/[0.06]',
    accent: 'bg-[#F5F5F0]',
  },
};

export const CollaborationSection: React.FC = () => {
  const { collaboration } = portfolioData;

  return (
    <section
      id="collaboration"
      className="border-t border-[#303E50]/[0.08] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="tabular-nums text-xs font-medium tracking-[0.09em] text-[#5A6B7F]">
              08 · Areas of Interest &amp; Collaboration
            </p>
            <h2 className="mt-3.5 font-editorial text-3xl font-medium tracking-[-0.02em] text-[#303E50] sm:text-[40px] sm:leading-[1.12]">
              Where Ideas Meet{' '}
              <em className="font-normal italic">Opportunities</em>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-[1.7] text-[#4E5E72]">
            {collaboration.description}
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {collaboration.areas.map((area, idx) => {
            const style = AREA_STYLES[area.tone];
            return (
              <Reveal key={area.id} delay={idx * 0.06} className="h-full">
                <article
                  className={`relative flex h-full flex-col justify-between overflow-hidden rounded-[28px] border p-8 transition-transform duration-200 hover:-translate-y-1 ${style.card}`}
                >
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute -right-10 -bottom-10 h-32 w-32 rounded-full ${style.accent}`}
                  />
                  <div className="relative z-10">
                    <span className="tabular-nums text-xs font-semibold text-[#303E50]/65">
                      {area.index}
                    </span>
                    <h3 className="mt-5 font-editorial text-[22px] font-medium leading-[1.28] text-[#303E50]">
                      {area.title}
                    </h3>
                    <p className="mt-3.5 text-sm leading-[1.78] text-[#475569]">
                      {area.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Showpiece Editorial Philosophy Statement */}
        <Reveal delay={0.1}>
          <figure className="surface-card relative mt-12 overflow-hidden rounded-[32px] px-8 py-12 sm:px-14 sm:py-14">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-16 -left-16 h-48 w-48 rounded-full bg-[#DCEAE5]/45 blur-2xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-[#C7A7D8]/25 blur-2xl"
            />
            <blockquote className="relative z-10 mx-auto max-w-3xl text-center font-editorial text-2xl leading-[1.42] font-normal tracking-[-0.01em] text-[#303E50] sm:text-[30px]">
              &ldquo;{collaboration.highlightedStatement}&rdquo;
            </blockquote>
          </figure>
        </Reveal>
      </div>
    </section>
  );
};
