import React, { useMemo, useState } from 'react';
import { Calendar, Linkedin, ArrowUpRight, Mic2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { SessionCategory, SessionItem } from '../types/portfolio';
import { EditablePhotoFrame } from './EditablePhotoFrame';
import { Reveal } from './Reveal';
import { usePhotoPreview } from '../context/PhotoPreviewContext';

export const SessionsSection: React.FC = () => {
  const { sessions } = portfolioData;
  const { sessionOverrides } = usePhotoPreview();
  const [selectedCategory, setSelectedCategory] = useState<'All' | SessionCategory>('All');
  const [linkNoticeId, setLinkNoticeId] = useState<string | null>(null);

  const mergedSessions = useMemo(() => {
    return sessions.items.map((item) => {
      const saved = sessionOverrides[item.id];
      if (!saved) return item;
      return {
        ...item,
        title: saved.title || item.title,
        topic: saved.topic || item.topic,
        category: saved.category || item.category,
        date: saved.date || item.date,
        role: saved.role || item.role,
        linkedinUrl: saved.linkedinUrl || item.linkedinUrl,
      };
    });
  }, [sessions.items, sessionOverrides]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: mergedSessions.length };
    for (const cat of sessions.categories) {
      counts[cat] = mergedSessions.filter((item) => item.category === cat).length;
    }
    return counts;
  }, [mergedSessions, sessions.categories]);

  const filteredSessions = useMemo(() => {
    if (selectedCategory === 'All') return mergedSessions;
    return mergedSessions.filter((item) => item.category === selectedCategory);
  }, [mergedSessions, selectedCategory]);

  const isUrlConfigured = (url: string) =>
    url.startsWith('http') && !url.includes('[LINKEDIN');

  const handleLinkedInClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    session: SessionItem
  ) => {
    if (!isUrlConfigured(session.linkedinUrl)) {
      e.preventDefault();
      setLinkNoticeId((prev) => (prev === session.id ? null : session.id));
    }
  };

  return (
    <section
      id="sessions"
      className="border-t border-[#303E50]/[0.08] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        {/* Editorial Header */}
        <Reveal className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="tabular-nums text-xs font-medium tracking-[0.09em] text-[#5A6B7F]">
              06 · LinkedIn Sessions &amp; Facilitation
            </p>
            <h2 className="mt-3.5 font-editorial text-3xl font-medium tracking-[-0.02em] text-[#303E50] sm:text-[40px] sm:leading-[1.12]">
              Knowledge Sharing &amp;{' '}
              <em className="font-normal italic">Community Learning</em>
            </h2>
            <p className="mt-4 max-w-[58ch] text-base leading-[1.72] text-[#4E5E72]">
              {sessions.subtitle}
            </p>
          </div>

          <div className="surface-card rounded-[24px] p-6 lg:col-span-5">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.03em] text-[#303E50]">
              <Linkedin className="h-4 w-4 text-[#5D76A8]" aria-hidden="true" />
              <span>Hosted &amp; Facilitated on LinkedIn</span>
            </div>
            <p className="mt-2.5 text-xs leading-[1.7] text-[#4E5E72]">
              {sessions.platformNote}
            </p>
          </div>
        </Reveal>

        {/* Five Core Knowledge-Sharing Capabilities Strip */}
        <Reveal delay={0.06}>
          <div className="mt-10 rounded-[26px] border border-[#303E50]/[0.06] bg-white/75 p-6 sm:p-7">
            <p className="text-[11.5px] font-semibold tracking-[0.05em] text-[#5A6B7F]">
              What These Sessions Cultivate
            </p>
            <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3.5 sm:grid-cols-2 lg:grid-cols-5">
              {sessions.capabilities.map((capability, idx) => (
                <li
                  key={capability}
                  className="flex flex-col gap-1.5 border-t border-[#303E50]/8 pt-3 text-[13px] leading-[1.58] text-[#303E50]"
                >
                  <span className="tabular-nums text-[11px] font-medium text-[#5A6B7F]">
                    0{idx + 1}
                  </span>
                  <span>{capability}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Category Filter Controls */}
        <div className="mt-10 flex flex-col gap-3 border-y border-[#303E50]/10 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div
            role="group"
            aria-label="Filter sessions by category"
            className="flex flex-wrap items-center gap-1.5"
          >
            <button
              type="button"
              onClick={() => setSelectedCategory('All')}
              className={`min-h-[40px] rounded-xl px-3.5 py-2 text-xs font-medium transition-all duration-150 whitespace-nowrap shrink-0 ${
                selectedCategory === 'All'
                  ? 'bg-[#303E50] text-white shadow-xs'
                  : 'border border-[#303E50]/[0.08] bg-white/80 text-[#4E5E72] hover:bg-white hover:text-[#303E50]'
              }`}
            >
              All Sessions{' '}
              <span className="tabular-nums opacity-75">
                ({categoryCounts.All})
              </span>
            </button>

            {sessions.categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`min-h-[40px] rounded-xl px-3.5 py-2 text-xs font-medium transition-all duration-150 whitespace-nowrap shrink-0 ${
                  selectedCategory === category
                    ? 'bg-[#303E50] text-white shadow-xs'
                    : 'border border-[#303E50]/[0.08] bg-white/80 text-[#4E5E72] hover:bg-white hover:text-[#303E50]'
                }`}
              >
                {category}{' '}
                <span className="tabular-nums opacity-75">
                  ({categoryCounts[category]})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Session Gallery Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSessions.map((session, idx) => {
            const configured = isUrlConfigured(session.linkedinUrl);
            const showNotice = linkNoticeId === session.id;

            return (
              <Reveal key={session.id} delay={idx * 0.05} className="h-full">
                <article className="surface-card surface-card-hover flex h-full flex-col justify-between rounded-[26px] p-5 sm:p-6">
                  <div>
                    {/* Event Poster or Authentic Screenshot Frame */}
                    <EditablePhotoFrame
                      asset={session.media}
                      aspectClassName="aspect-[16/10]"
                      variant="landscape"
                      className="rounded-[18px]"
                    />

                    {/* Clean Unboxed Metadata: Category · Role */}
                    <div className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-medium text-[#5A6B7F]">
                      <span>{session.category}</span>
                      <span aria-hidden="true" className="text-[#B8D5CA]">
                        ·
                      </span>
                      <span className="inline-flex items-center gap-1 text-[#303E50]">
                        <Mic2 className="h-3 w-3 text-[#5D76A8]" aria-hidden="true" />
                        {session.role}
                      </span>
                    </div>

                    {/* Session Title */}
                    <h3 className="mt-2.5 font-editorial text-xl font-medium leading-snug text-[#303E50]">
                      {session.title}
                    </h3>

                    {/* Topic / Theme & Date Details */}
                    <dl className="mt-4 space-y-2.5 border-t border-[#303E50]/8 pt-4 text-xs">
                      <div>
                        <dt className="font-medium text-[#5A6B7F]">
                          Topic / Theme
                        </dt>
                        <dd className="mt-0.5 text-sm leading-relaxed text-[#475569]">
                          {session.topic}
                        </dd>
                      </div>

                      <div className="flex items-center gap-1.5 text-[#5A6B7F]">
                        <Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <dt className="sr-only">Date</dt>
                        <dd className="tabular-nums font-medium text-[#303E50]">
                          {session.date}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  {/* Card Footer: LinkedIn Post / Replay Action */}
                  <div className="mt-6 border-t border-[#303E50]/8 pt-4">
                    <a
                      href={configured ? session.linkedinUrl : '#sessions'}
                      target={configured ? '_blank' : undefined}
                      rel={configured ? 'noopener noreferrer' : undefined}
                      onClick={(e) => handleLinkedInClick(e, session)}
                      className="group/link inline-flex min-h-[40px] w-full items-center justify-between gap-2 rounded-xl border border-[#303E50]/12 bg-[#F5F5F0]/80 px-4 py-2 text-xs font-semibold text-[#303E50] transition-colors hover:border-[#303E50]/30 hover:bg-[#DCEAE5]/55"
                    >
                      <span className="inline-flex items-center gap-2">
                        <Linkedin className="h-3.5 w-3.5 text-[#5D76A8]" aria-hidden="true" />
                        <span>LinkedIn Post / Replay</span>
                      </span>
                      <ArrowUpRight
                        className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </a>

                    {showNotice && (
                      <div
                        role="status"
                        className="mt-3 rounded-xl border border-[#303E50]/[0.08] bg-[#DCEAE5]/55 px-3.5 py-2.5 text-[11.5px] leading-relaxed text-[#303E50]"
                      >
                        Configure this session&apos;s authentic title, date, topic, and LinkedIn link directly from the{' '}
                        <span className="font-semibold">Espace Admin</span> in the footer.
                      </div>
                    )}
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
