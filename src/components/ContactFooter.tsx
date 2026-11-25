import React, { useState } from 'react';
import { Mail, Linkedin, MapPin, ArrowUp, RotateCcw, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { usePhotoPreview } from '../context/PhotoPreviewContext';
import { Reveal } from './Reveal';

export const ContactFooter: React.FC = () => {
  const { contact } = portfolioData;
  const { overrideCount, clearAllOverrides } = usePhotoPreview();
  const [notice, setNotice] = useState<string | null>(null);

  const isEmailConfigured =
    contact.email.includes('@') && !contact.email.includes('[EMAIL');
  const isLinkedinConfigured =
    contact.linkedin.startsWith('http') &&
    !contact.linkedin.includes('[LINKEDIN');

  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isEmailConfigured) {
      e.preventDefault();
      setNotice(
        'Email address is ready to be updated in src/data/portfolioData.ts under contact.email.'
      );
    }
  };

  const handleLinkedinClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isLinkedinConfigured) {
      e.preventDefault();
      setNotice(
        'LinkedIn profile URL is ready to be updated in src/data/portfolioData.ts under contact.linkedin.'
      );
    }
  };

  return (
    <footer
      id="contact"
      className="border-t border-[#303E50]/[0.08] bg-white/55 pt-24 pb-12 sm:pt-32"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <div className="surface-mat relative overflow-hidden rounded-[34px] p-8 sm:p-12 lg:p-14">
            {/* Soft architectural tonal corner glows */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#DCEAE5]/60 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#A7B8D8]/25 blur-3xl"
            />

            <div className="relative z-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
              <div className="lg:col-span-7">
                <p className="tabular-nums text-xs font-medium tracking-[0.09em] text-[#5A6B7F]">
                  10 · Contact &amp; Collaboration
                </p>
                <h2 className="mt-3.5 font-editorial text-3xl font-medium tracking-[-0.02em] text-[#303E50] sm:text-4xl lg:text-[46px] lg:leading-[1.1]">
                  Let&apos;s Create Something{' '}
                  <em className="font-normal italic">Meaningful.</em>
                </h2>
                <p className="mt-5 max-w-[52ch] text-base leading-[1.76] text-[#4E5E72]">
                  {contact.description}
                </p>

                {/* Primary & Secondary Contact Buttons */}
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <a
                    href={isEmailConfigured ? `mailto:${contact.email}` : '#contact'}
                    onClick={handleEmailClick}
                    className="group inline-flex min-h-[48px] items-center gap-2.5 rounded-2xl bg-[#303E50] px-7 py-3 text-sm font-medium text-white shadow-[0_12px_28px_-14px_rgba(48,62,80,0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#303E50]/92 whitespace-nowrap shrink-0"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    <span>Email Contact</span>
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </a>

                  <a
                    href={isLinkedinConfigured ? contact.linkedin : '#contact'}
                    target={isLinkedinConfigured ? '_blank' : undefined}
                    rel={isLinkedinConfigured ? 'noopener noreferrer' : undefined}
                    onClick={handleLinkedinClick}
                    className="inline-flex min-h-[48px] items-center gap-2.5 rounded-2xl border border-[#303E50]/18 bg-[#F5F5F0]/80 px-7 py-3 text-sm font-medium text-[#303E50] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#303E50]/35 hover:bg-[#DCEAE5]/55 whitespace-nowrap shrink-0"
                  >
                    <Linkedin className="h-4 w-4" aria-hidden="true" />
                    <span>LinkedIn Profile</span>
                  </a>
                </div>

                {notice && (
                  <div
                    role="status"
                    className="mt-5 flex items-center justify-between gap-4 rounded-2xl border border-[#303E50]/[0.08] bg-[#DCEAE5]/60 px-4 py-3 text-xs leading-relaxed text-[#303E50]"
                  >
                    <span>{notice}</span>
                    <button
                      type="button"
                      onClick={() => setNotice(null)}
                      className="shrink-0 font-semibold underline underline-offset-2 hover:opacity-75"
                    >
                      Dismiss
                    </button>
                  </div>
                )}
              </div>

              {/* Architectural Contact Ledger */}
              <div className="rounded-[26px] border border-[#303E50]/[0.07] bg-[#F5F5F0]/90 p-7 sm:p-8 lg:col-span-5">
                <dl className="space-y-5 text-sm">
                  <div>
                    <dt className="text-[11.5px] font-medium tracking-[0.04em] text-[#5A6B7F]">
                      Name
                    </dt>
                    <dd className="mt-1 font-editorial text-xl font-medium text-[#303E50]">
                      {contact.name}
                    </dd>
                  </div>

                  <div className="border-t border-[#303E50]/8 pt-4">
                    <dt className="text-[11.5px] font-medium tracking-[0.04em] text-[#5A6B7F]">
                      Location
                    </dt>
                    <dd className="mt-1 inline-flex items-center gap-1.5 font-medium text-[#303E50]">
                      <MapPin className="h-3.5 w-3.5 text-[#5A6B7F]" aria-hidden="true" />
                      {contact.location}
                    </dd>
                  </div>

                  <div className="border-t border-[#303E50]/8 pt-4">
                    <dt className="text-[11.5px] font-medium tracking-[0.04em] text-[#5A6B7F]">
                      Email
                    </dt>
                    <dd className="mt-1 break-all font-medium text-[#303E50]">
                      {contact.email}
                    </dd>
                  </div>

                  <div className="border-t border-[#303E50]/8 pt-4">
                    <dt className="text-[11.5px] font-medium tracking-[0.04em] text-[#5A6B7F]">
                      LinkedIn
                    </dt>
                    <dd className="mt-1 break-all font-medium text-[#303E50]">
                      {contact.linkedin}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Quiet Editorial Colophon Footer */}
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-[#303E50]/10 pt-8 text-xs text-[#5A6B7F] sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-medium text-[#303E50]">
              &copy; {contact.copyrightYear} {contact.name}
            </span>
            <span aria-hidden="true" className="text-[#B8D5CA]">·</span>
            <span>All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            {overrideCount > 0 && (
              <button
                type="button"
                onClick={clearAllOverrides}
                className="inline-flex items-center gap-1.5 font-medium text-[#5A6B7F] transition-colors hover:text-[#303E50]"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                Reset preview photos ({overrideCount})
              </button>
            )}

            <a
              href="#home"
              className="group inline-flex items-center gap-1.5 font-medium text-[#303E50] transition-colors hover:text-[#5A6B7F]"
            >
              <span>Back to top</span>
              <ArrowUp
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
