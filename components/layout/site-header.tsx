import { Logo } from "@/components/brand/logo";
import { DesktopNav, type DesktopNavEntry } from "@/components/layout/desktop-nav";
import { MobileNav } from "@/components/layout/mobile-nav";
import { NavPanel } from "@/components/layout/nav-panel";
import { ButtonLink } from "@/components/shared/button-link";
import { Container } from "@/components/shared/layout-primitives";
import { isNavGroup, mainNav, primaryCta } from "@/content/navigation";

const desktopEntries: DesktopNavEntry[] = mainNav.map((entry) => ({
  label: entry.label,
  href: entry.href,
  panel: isNavGroup(entry) ? <NavPanel group={entry} /> : undefined,
}));

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/80">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo />
        <DesktopNav entries={desktopEntries} />
        <div className="flex items-center gap-2">
          <ButtonLink
            href={primaryCta.href}
            size="cta"
            className="hidden h-10 lg:inline-flex"
            trackAs="header_lets_talk"
          >
            {primaryCta.label}
          </ButtonLink>
          <MobileNav items={mainNav} cta={primaryCta} />
        </div>
      </Container>
    </header>
  );
}

/** First focusable element on every page (WCAG 2.4.1). */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only z-50 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
    >
      Skip to content
    </a>
  );
}
