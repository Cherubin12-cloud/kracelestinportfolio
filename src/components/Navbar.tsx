import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface NavLinkItem {
  label: string;
  href: string;
  id: string;
}

const NAV_LINKS: NavLinkItem[] = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Web Work', href: '#digital-products', id: 'digital-products' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Sessions', href: '#sessions', id: 'sessions' },
  { label: 'Digital Toolkit', href: '#toolkit', id: 'toolkit' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const scrollPosition = window.scrollY + 160;
      for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
        const section = document.getElementById(NAV_LINKS[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(NAV_LINKS[i].id);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#F5F5F0]/90 backdrop-blur-md border-b border-[#303E50]/[0.08] shadow-[0_6px_24px_-18px_rgba(48,62,80,0.18)]'
          : 'bg-[#F5F5F0]/75 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-5 px-5 py-4 sm:px-8">
        {/* Zone 1: Single-line editorial brand wordmark */}
        <a
          href="#home"
          className="font-editorial text-[17px] font-semibold tracking-[-0.015em] text-[#303E50] whitespace-nowrap shrink-0 transition-opacity hover:opacity-80 sm:text-[19px]"
        >
          Yao Kra Celestin
        </a>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-4 xl:gap-6 lg:flex"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`relative py-1.5 text-[13.5px] font-medium transition-colors duration-200 whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-[#303E50]'
                    : 'text-[#5A6B7F] hover:text-[#303E50]'
                }`}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={`absolute right-0 bottom-0 left-0 h-[1.5px] bg-[#303E50] transition-transform duration-200 ease-out origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Subtle primary CTA + mobile drawer button */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#contact"
            className="hidden rounded-xl bg-[#303E50] px-4 py-2 text-[13.5px] font-medium text-white shadow-[0_6px_18px_-10px_rgba(48,62,80,0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#303E50]/92 sm:inline-flex items-center justify-center whitespace-nowrap shrink-0"
          >
            Let&apos;s Connect
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#303E50]/10 bg-white/75 text-[#303E50] transition-colors hover:bg-[#DCEAE5]/60 lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Smooth mobile navigation drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-[#303E50]/10 bg-[#F5F5F0]/98 px-5 pt-3 pb-6 backdrop-blur-md lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={handleLinkClick}
                    className={`flex min-h-[46px] items-center justify-between rounded-xl px-3.5 text-[15px] font-medium transition-colors ${
                      isActive
                        ? 'bg-[#DCEAE5]/75 text-[#303E50]'
                        : 'text-[#4E5E72] hover:bg-white/80 hover:text-[#303E50]'
                    }`}
                  >
                    <span>{link.label}</span>
                  </a>
                );
              })}
            </div>
            <div className="mt-4 border-t border-[#303E50]/10 pt-4">
              <a
                href="#contact"
                onClick={handleLinkClick}
                className="flex min-h-[46px] w-full items-center justify-center rounded-xl bg-[#303E50] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#303E50]/90"
              >
                Let&apos;s Connect
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};
