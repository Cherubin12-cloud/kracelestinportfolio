import React from 'react';
import { BookOpen, Cpu, MessageSquareText, Users } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { ExpertiseItem, PaletteTone } from '../types/portfolio';
import { Reveal } from './Reveal';

const TONE_STYLES: Record<
  PaletteTone,
  { iconBg: string; cornerTint: string }
> = {
  sage: {
    iconBg: 'bg-[#DCEAE5] text-[#303E50] ring-1 ring-[#303E50]/[0.06]',
    cornerTint: 'bg-[#DCEAE5]/45',
  },
  blue: {
    iconBg: 'bg-[#A7B8D8]/35 text-[#303E50] ring-1 ring-[#303E50]/[0.06]',
    cornerTint: 'bg-[#A7B8D8]/25',
  },
  lavender: {
    iconBg: 'bg-[#C7A7D8]/35 text-[#303E50] ring-1 ring-[#303E50]/[0.06]',
    cornerTint: 'bg-[#C7A7D8]/25',
  },
  mutedSage: {
    iconBg: 'bg-[#B8D5CA]/45 text-[#303E50] ring-1 ring-[#303E50]/[0.06]',
    cornerTint: 'bg-[#B8D5CA]/35',
  },
  ivory: {
    iconBg: 'bg-[#F5F5F0] text-[#303E50] ring-1 ring-[#303E50]/[0.06]',
    cornerTint: 'bg-[#F5F5F0]',
  },
};

const renderIcon = (icon: ExpertiseItem['icon']) => {
  const iconClass = 'h-5 w-5 stroke-[1.65]';
  switch (icon) {
    case 'edtech':
      return <BookOpen className={iconClass} aria-hidden="true" />;
    case 'ai':
      return <Cpu className={iconClass} aria-hidden="true" />;
    case 'communication':
      return <MessageSquareText className={iconClass} aria-hidden="true" />;
    case 'coordination':
      return <Users className={iconClass} aria-hidden="true" />;
  }
};

export const ExpertiseSection: React.FC = () => {
  const { expertise } = portfolioData;

  return (
    <section
      id="expertise"
      className="border-t border-[#303E50]/[0.08] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="tabular-nums text-xs font-medium tracking-[0.09em] text-[#5A6B7F]">
              02 · Focus &amp; Practice
            </p>
            <h2 className="mt-3.5 font-editorial text-3xl font-medium tracking-[-0.02em] text-[#303E50] sm:text-[40px] sm:leading-[1.12]">
              {expertise.title}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-[1.7] text-[#4E5E72]">
            {expertise.subtitle}
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {expertise.items.map((item, idx) => {
            const style = TONE_STYLES[item.tone];
            return (
              <Reveal key={item.id} delay={idx * 0.06} className="h-full">
                <article className="surface-card surface-card-hover group relative flex h-full flex-col justify-between overflow-hidden rounded-[26px] p-7">
                  {/* Soft ambient tonal corner accent that gently expands on hover */}
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full opacity-55 transition-transform duration-300 ease-out group-hover:scale-125 ${style.cornerTint}`}
                  />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-200 group-hover:scale-105 ${style.iconBg}`}
                      >
                        {renderIcon(item.icon)}
                      </div>
                      <span className="tabular-nums text-xs font-medium text-[#5A6B7F]/80">
                        0{idx + 1}
                      </span>
                    </div>

                    <h3 className="mt-8 font-editorial text-[21px] font-medium leading-[1.28] text-[#303E50]">
                      {item.title}
                    </h3>

                    <p className="mt-3.5 text-sm leading-[1.75] text-[#4E5E72]">
                      {item.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
