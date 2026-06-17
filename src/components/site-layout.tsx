import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import edutalkLogo from "@/assets/edutalk-logo.png";
import { useI18n } from "@/lib/i18n";

export function SiteNav({ cta = true }: { cta?: boolean }) {
  const { t, toggleLang } = useI18n();
  return (
    <nav className="sticky top-0 z-50 w-full bg-surface/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2 min-w-0">
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <div className="size-9 rounded-md overflow-hidden shadow-brand ring-1 ring-border/40">
            <img
              src={edutalkLogo}
              alt="EduTalk AI logo"
              className="h-full w-full object-cover"
            />
          </div>
          <span className="font-display text-lg sm:text-xl font-bold text-heading tracking-tight">
            EduTalk AI
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-body">
          <Link
            to="/workbench"
            className="hover:text-brand transition-colors whitespace-nowrap"
            activeProps={{ className: "text-heading" }}
          >
            {t.navWorkbench}
          </Link>
          <a href="/#features" className="hover:text-brand transition-colors whitespace-nowrap">
            {t.navFeatures}
          </a>
          <a href="/#how" className="hover:text-brand transition-colors whitespace-nowrap">
            {t.navHowItWorks}
          </a>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Language toggle */}
          <button
            onClick={toggleLang}
            className="px-2.5 sm:px-3 py-1.5 rounded-full border border-border text-xs font-bold text-body hover:border-brand hover:text-brand transition-all whitespace-nowrap"
            title="Switch language / மொழி மாற்று"
          >
            {t.langToggleLabel}
          </button>
          {cta && (
            <Link
              to="/workbench"
              className="bg-brand text-brand-foreground px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold hover:bg-brand/90 transition-all shadow-brand whitespace-nowrap hidden sm:inline-flex"
            >
              {t.navTryWorkbench}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="py-12 px-4 sm:px-6 border-t border-border bg-surface">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-md overflow-hidden ring-1 ring-border/40">
            <img
              src={edutalkLogo}
              alt="EduTalk AI logo"
              className="h-full w-full object-cover"
            />
          </div>
          <span className="font-display text-lg font-bold text-heading">
            EduTalk AI
          </span>
        </div>
        <div className="text-sm text-muted-foreground font-medium text-center">
          © {new Date().getFullYear()} EduTalk AI. {t.footerCopy}
        </div>
      </div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      {children}
      <SiteFooter />
    </div>
  );
}
