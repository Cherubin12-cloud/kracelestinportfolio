import React from 'react';
import { ArrowUpRight, Code2, Award } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { LiveWebsitePreview } from './LiveWebsitePreview';
import { Reveal } from './Reveal';

export const DigitalProductsSection: React.FC = () => {
  const { digitalProducts } = portfolioData;

  return (
    <section
      id="digital-products"
      className="border-t border-[#303E50]/[0.08] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        {/* Editorial Section Header */}
        <Reveal className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="tabular-nums text-xs font-medium tracking-[0.09em] text-[#5A6B7F]">
              04 · {digitalProducts.kicker}
            </p>
            <h2 className="mt-3.5 font-editorial text-3xl font-medium tracking-[-0.02em] text-[#303E50] sm:text-[42px] sm:leading-[1.1]">
              {digitalProducts.title}
            </h2>
            <p className="mt-3 font-editorial text-xl font-normal text-[#303E50]/85 sm:text-2xl">
              Turning Ideas into{' '}
              <em className="font-normal italic">Digital Experiences</em>
            </p>
          </div>

          <p className="max-w-sm text-sm leading-[1.7] text-[#4E5E72]">
            Live websites designed and developed to turn environmental and organisational ideas into accessible online platforms.
          </p>
        </Reveal>

        {/* Premium 2-Column Bento Showcase Grid */}
        <div className="mt-14 grid grid-cols-1 gap-7 lg:grid-cols-12">
          {digitalProducts.items.map((product, idx) => {
            const cardAccent =
              product.accentTone === 'sage'
                ? 'bg-gradient-to-b from-[#EFF6F3]/80 via-white to-white'
                : 'bg-gradient-to-b from-[#EFF3FA]/80 via-white to-white';

            return (
              <Reveal
                key={product.id}
                delay={idx * 0.08}
                className="h-full lg:col-span-6"
              >
                <article
                  className={`surface-mat surface-card-hover flex h-full flex-col justify-between rounded-[30px] p-5 sm:p-7 ${cardAccent}`}
                >
                  <div>
                    {/* Responsive Live Website Preview Frame */}
                    <LiveWebsitePreview product={product} />

                    {/* Unboxed Clean Metadata Line */}
                    <div className="mt-6 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-medium text-[#5A6B7F]">
                      <span className="tabular-nums font-semibold text-[#303E50]">
                        {product.index}
                      </span>
                      <span aria-hidden="true" className="text-[#B8D5CA]">
                        ·
                      </span>
                      <span>{product.category}</span>
                    </div>

                    {/* Product Title */}
                    <h3 className="mt-2.5 font-editorial text-2xl font-medium tracking-[-0.015em] text-[#303E50] sm:text-[29px] sm:leading-[1.18]">
                      {product.title}
                    </h3>

                    {/* Role & Highlight Ledger */}
                    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-[#303E50]/8 py-3 text-xs">
                      <span className="inline-flex items-center gap-1.5 font-medium text-[#303E50]">
                        <Code2
                          className="h-3.5 w-3.5 text-[#5D76A8]"
                          aria-hidden="true"
                        />
                        <span>Role: {product.role}</span>
                      </span>

                      <span className="inline-flex items-center gap-1.5 font-semibold text-[#303E50]">
                        <Award
                          className="h-3.5 w-3.5 text-[#3D7A68]"
                          aria-hidden="true"
                        />
                        <span>{product.highlightLabel}</span>
                      </span>
                    </div>

                    {/* Authentic Project Description */}
                    <p className="mt-5 text-[15px] leading-[1.78] text-[#4E5E72]">
                      {product.description}
                    </p>

                    {/* Optional Special Highlight Note (EcoLink Live Bootcamp Development) */}
                    {product.specialHighlight && (
                      <div className="mt-5 rounded-[20px] border border-[#303E50]/[0.06] bg-[#DCEAE5]/55 px-5 py-4">
                        <p className="text-[11.5px] font-semibold tracking-[0.04em] text-[#303E50]">
                          {product.highlightLabel}
                        </p>
                        <p className="mt-1.5 text-sm leading-[1.68] text-[#303E50]/90">
                          {product.specialHighlight}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Primary Live Website Action Footer */}
                  <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-[#303E50]/8 pt-5">
                    <span className="truncate text-xs font-medium text-[#5A6B7F]">
                      {product.displayDomain}
                    </span>

                    <a
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/cta inline-flex min-h-[44px] items-center gap-2 rounded-2xl bg-[#303E50] px-5 py-2.5 text-xs font-medium text-white shadow-[0_10px_24px_-12px_rgba(48,62,80,0.5)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#303E50]/92 whitespace-nowrap shrink-0"
                    >
                      <span>Explore Live Website</span>
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </a>
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
