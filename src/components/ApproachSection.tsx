import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Reveal } from './Reveal';

const NODE_TONES = [
  'bg-[#DCEAE5] text-[#303E50]',
  'bg-[#E4ECF6] text-[#303E50]',
  'bg-[#EFE8F4] text-[#303E50]',
  'bg-[#D4E6DF] text-[#303E50]',
  'bg-[#DCEAE5] text-[#303E50]',
  'bg-[#E4ECF6] text-[#303E50]',
];

export const ApproachSection: React.FC = () => {
  const { approach } = portfolioData;

  return (
    <section
      id="approach"
      className="border-t border-[#303E50]/[0.08] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="tabular-nums text-xs font-medium tracking-[0.09em] text-[#5A6B7F]">
              09 · Methodology
            </p>
            <h2 className="mt-3.5 font-editorial text-3xl font-medium tracking-[-0.02em] text-[#303E50] sm:text-[40px] sm:leading-[1.12]">
              {approach.title}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-[1.7] text-[#4E5E72]">
            {approach.subtitle}
          </p>
        </Reveal>

        {/* Six-step horizontal track on desktop, vertical flow on mobile */}
        <div className="relative mt-16">
          {/* Desktop hairline rail connecting the six numbered medallions */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[26px] right-10 left-10 hidden h-px bg-[#303E50]/12 lg:block"
          />

          <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6 lg:gap-5">
            {approach.steps.map((step, index) => (
              <Reveal key={step.number} delay={index * 0.05} className="h-full">
                <li className="surface-card surface-card-hover relative flex h-full flex-row items-start gap-4 rounded-[24px] p-5 lg:flex-col lg:gap-5 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none lg:hover:translate-y-0 lg:hover:shadow-none">
                  <div
                    className={`relative z-10 flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl border border-[#303E50]/[0.07] tabular-nums text-sm font-semibold shadow-[0_8px_20px_-12px_rgba(48,62,80,0.2)] transition-transform duration-200 lg:hover:-translate-y-0.5 ${
                      NODE_TONES[index % NODE_TONES.length]
                    }`}
                  >
                    {step.number}
                  </div>

                  <div className="lg:pr-2">
                    <h3 className="font-editorial text-[19px] font-medium text-[#303E50]">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-[1.68] text-[#4E5E72]">
                      {step.description}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};
