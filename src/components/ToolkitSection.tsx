import React, { useState, useMemo } from 'react';
import {
  CheckCircle2,
  Compass,
  Bookmark,
  Layers,
  SlidersHorizontal,
  Film,
  Palette,
  PenTool,
  GraduationCap,
  ClipboardList,
  Accessibility,
  Briefcase,
  Calendar,
  FileText,
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { ExperienceStatus, ToolCategory, ToolItem } from '../types/portfolio';
import { Reveal } from './Reveal';

const renderPlatformIcon = (iconKey: ToolItem['iconKey']) => {
  const cls = 'h-5 w-5 stroke-[1.65] text-[#303E50]';
  switch (iconKey) {
    case 'gemini':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-[#303E50]" aria-hidden="true">
          <path
            d="M12 3C12 8.2 15.8 12 21 12C15.8 12 12 15.8 12 21C12 15.8 8.2 12 3 12C8.2 12 12 8.2 12 3Z"
            stroke="currentColor"
            strokeWidth="1.65"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'aistudio':
      return <SlidersHorizontal className={cls} aria-hidden="true" />;
    case 'flow':
      return <Film className={cls} aria-hidden="true" />;
    case 'canva':
      return <Palette className={cls} aria-hidden="true" />;
    case 'figma':
      return <PenTool className={cls} aria-hidden="true" />;
    case 'classroom':
      return <GraduationCap className={cls} aria-hidden="true" />;
    case 'forms':
      return <ClipboardList className={cls} aria-hidden="true" />;
    case 'cboard':
      return <Accessibility className={cls} aria-hidden="true" />;
    case 'workspace':
      return <Briefcase className={cls} aria-hidden="true" />;
    case 'calendar':
      return <Calendar className={cls} aria-hidden="true" />;
    case 'notion':
      return <FileText className={cls} aria-hidden="true" />;
    default:
      return <Layers className={cls} aria-hidden="true" />;
  }
};

const getCategoryToneBg = (category: ToolCategory): string => {
  switch (category) {
    case 'AI & Content Creation':
      return 'bg-[#DCEAE5] ring-1 ring-[#303E50]/[0.06]';
    case 'Digital Communication & Design':
      return 'bg-[#C7A7D8]/30 ring-1 ring-[#303E50]/[0.06]';
    case 'Education & Digital Learning':
      return 'bg-[#A7B8D8]/35 ring-1 ring-[#303E50]/[0.06]';
    case 'Project Management & Productivity':
      return 'bg-[#B8D5CA]/45 ring-1 ring-[#303E50]/[0.06]';
  }
};

const renderStatusIndicator = (status: ExperienceStatus) => {
  switch (status) {
    case 'Used in practice':
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#303E50]">
          <CheckCircle2 className="h-3.5 w-3.5 text-[#3D7A68]" aria-hidden="true" />
          <span>Used in practice</span>
        </span>
      );
    case 'Explored':
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#4E5E72]">
          <Compass className="h-3.5 w-3.5 text-[#5D76A8]" aria-hidden="true" />
          <span>Explored</span>
        </span>
      );
    case 'Recommended for future projects':
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#4E5E72]">
          <Bookmark className="h-3.5 w-3.5 text-[#85629B]" aria-hidden="true" />
          <span>Recommended for future projects</span>
        </span>
      );
  }
};

export const ToolkitSection: React.FC = () => {
  const { toolkit } = portfolioData;
  const [selectedCategory, setSelectedCategory] = useState<'All' | ToolCategory>('All');
  const [selectedStatus, setSelectedStatus] = useState<'All' | ExperienceStatus>('All');

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: toolkit.items.length };
    for (const cat of toolkit.categories) {
      counts[cat] = toolkit.items.filter((item) => item.category === cat).length;
    }
    return counts;
  }, [toolkit.items, toolkit.categories]);

  const filteredTools = useMemo(() => {
    return toolkit.items.filter((tool) => {
      const categoryMatch =
        selectedCategory === 'All' || tool.category === selectedCategory;
      const statusMatch =
        selectedStatus === 'All' || tool.status === selectedStatus;
      return categoryMatch && statusMatch;
    });
  }, [toolkit.items, selectedCategory, selectedStatus]);

  return (
    <section
      id="toolkit"
      className="border-t border-[#303E50]/[0.08] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="tabular-nums text-xs font-medium tracking-[0.09em] text-[#5A6B7F]">
              07 · Digital Toolkit &amp; Platforms
            </p>
            <h2 className="mt-3.5 font-editorial text-3xl font-medium tracking-[-0.02em] text-[#303E50] sm:text-[40px] sm:leading-[1.12]">
              {toolkit.title}
            </h2>
            <p className="mt-4 max-w-[60ch] text-base leading-[1.72] text-[#4E5E72]">
              {toolkit.subtitle}
            </p>
          </div>

          {/* Transparent engagement-level ledger */}
          <div className="surface-card rounded-[24px] p-6 lg:col-span-5">
            <p className="text-xs font-semibold tracking-[0.03em] text-[#303E50]">
              Experience-level transparency
            </p>
            <div className="mt-3.5 space-y-2.5">
              {toolkit.statusLegend.map((entry) => (
                <div key={entry.status} className="space-y-0.5 text-xs">
                  <div>{renderStatusIndicator(entry.status)}</div>
                  <p className="pl-5 text-[12px] leading-snug text-[#5A6B7F]">
                    {entry.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Interactive Filter Controls */}
        <div className="mt-12 flex flex-col gap-4 border-y border-[#303E50]/10 py-5 lg:flex-row lg:items-center lg:justify-between">
          {/* Category Filter Buttons */}
          <div
            role="group"
            aria-label="Filter tools by category"
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
              All <span className="tabular-nums opacity-75">({categoryCounts.All})</span>
            </button>
            {toolkit.categories.map((category) => (
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

          {/* Experience Status Segmented Control */}
          <div
            role="group"
            aria-label="Filter tools by engagement level"
            className="flex flex-wrap items-center gap-1 self-start rounded-xl border border-[#303E50]/[0.06] bg-[#EAEAE3]/90 p-1 lg:self-auto"
          >
            {(
              [
                { value: 'All', label: 'All' },
                { value: 'Used in practice', label: 'Used' },
                { value: 'Explored', label: 'Explored' },
                { value: 'Recommended for future projects', label: 'Recommended' },
              ] as const
            ).map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setSelectedStatus(opt.value)}
                className={`min-h-[34px] rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-150 whitespace-nowrap shrink-0 ${
                  selectedStatus === opt.value
                    ? 'bg-white text-[#303E50] shadow-xs'
                    : 'text-[#4E5E72] hover:text-[#303E50]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Curated Platform Cards */}
        {filteredTools.length === 0 ? (
          <div className="surface-card mt-10 rounded-[26px] p-12 text-center">
            <p className="text-sm font-medium text-[#303E50]">
              No platforms match this combination of category and experience status.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSelectedStatus('All');
              }}
              className="mt-4 inline-flex min-h-[42px] items-center justify-center rounded-xl bg-[#303E50] px-5 py-2 text-xs font-medium text-white transition-colors hover:bg-[#303E50]/90"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTools.map((tool) => (
              <article
                key={tool.id}
                className="surface-card surface-card-hover flex flex-col justify-between rounded-[24px] p-6 sm:p-7"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${getCategoryToneBg(
                        tool.category
                      )}`}
                    >
                      {renderPlatformIcon(tool.iconKey)}
                    </div>
                    <span className="text-right text-[11px] font-medium leading-snug text-[#5A6B7F]">
                      {tool.category}
                    </span>
                  </div>

                  <h3 className="mt-5 font-editorial text-[21px] font-medium text-[#303E50]">
                    {tool.name}
                  </h3>

                  <p className="mt-2.5 text-sm leading-[1.72] text-[#4E5E72]">
                    {tool.purpose}
                  </p>

                  {tool.note && (
                    <p className="mt-3.5 rounded-2xl border border-[#303E50]/[0.06] bg-[#F5F5F0]/90 px-3.5 py-2.5 text-xs leading-relaxed text-[#475569]">
                      {tool.note}
                    </p>
                  )}
                </div>

                <div className="mt-6 border-t border-[#303E50]/8 pt-4">
                  {renderStatusIndicator(tool.status)}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
