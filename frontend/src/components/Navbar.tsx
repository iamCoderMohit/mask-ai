import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full border-b border-neutral-200 dark:border-neutral-800 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">

        {/* Logo */}
        <a href="/" className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-white">
          Mask
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 text-sm text-neutral-600 dark:text-neutral-400">
          <a href="/examples" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
            Examples
          </a>
          <a href="/pricing" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
            Pricing
          </a>
          <a href="/how-it-works" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
            How it works
          </a>
        </div>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium hover:opacity-80 transition-opacity"
          >
            Start building
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-md text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3L15 15M15 3L3 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 5H15M3 9H15M3 13H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-4 py-3 flex flex-col gap-3 text-sm text-neutral-600 dark:text-neutral-400">
          <a href="/examples" className="py-1.5 hover:text-neutral-900 dark:hover:text-white transition-colors">
            Examples
          </a>
          <a href="/pricing" className="py-1.5 hover:text-neutral-900 dark:hover:text-white transition-colors">
            Pricing
          </a>
          <a href="/how-it-works" className="py-1.5 hover:text-neutral-900 dark:hover:text-white transition-colors">
            How it works
          </a>
          <a
            href="/build"
            className="mt-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium hover:opacity-80 transition-opacity"
          >
            Start building
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      )}
    </nav>
  );
}