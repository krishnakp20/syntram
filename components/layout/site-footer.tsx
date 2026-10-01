import Link from "next/link";

import { CookieSettingsButton } from "@/components/analytics/cookie-settings-button";
import { Logo } from "@/components/brand/logo";
import { analyticsEnabled } from "@/lib/analytics/config";
import { ButtonLink } from "@/components/shared/button-link";
import { Container } from "@/components/shared/layout-primitives";
import { footerColumns } from "@/content/navigation";
import { isPlaceholder, siteConfig } from "@/lib/site";

export function SiteFooter() {
  const { contact, social } = siteConfig;
  const socialLinks = [
    { label: "LinkedIn", href: social.linkedin },
    { label: "X", href: social.x },
    { label: "GitHub", href: social.github },
  ].filter((s) => !isPlaceholder(s.href));

  return (
    <footer className="border-t border-line bg-surface">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_2fr]">
          <div className="flex max-w-sm flex-col gap-5">
            <Logo />
            <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">
              AI-powered software, voice agents and automation — engineered for production and built
              around how your business actually works.
            </p>
            <div>
              <ButtonLink href="/contact" variant="outline" size="cta" trackAs="footer_start_conversation">
                Start a conversation
              </ButtonLink>
            </div>
            {(!isPlaceholder(contact.email) || !isPlaceholder(contact.phone)) && (
              <address className="flex flex-col gap-1 text-sm not-italic text-muted-foreground">
                {!isPlaceholder(contact.email) && (
                  <a href={`mailto:${contact.email}`} data-track-contact="email" className="hover:text-foreground">
                    {contact.email}
                  </a>
                )}
                {!isPlaceholder(contact.phone) && (
                  <a href={`tel:${contact.phone}`} data-track-contact="phone" className="hover:text-foreground">
                    {contact.phone}
                  </a>
                )}
              </address>
            )}
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h2 className="font-mono text-xs font-medium tracking-[0.14em] text-subtle uppercase">{col.title}</h2>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
            <p>
              © {new Date().getFullYear()} {siteConfig.legal.entityName}. All rights reserved.
            </p>
            {analyticsEnabled && <CookieSettingsButton />}
          </div>
          {socialLinks.length > 0 && (
            <ul className="flex gap-5">
              {socialLinks.map((s) => (
                <li key={s.label}>
                  <a href={s.href} rel="noopener noreferrer" target="_blank" className="hover:text-foreground">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </footer>
  );
}
