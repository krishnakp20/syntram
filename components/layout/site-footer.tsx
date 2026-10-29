import Link from "next/link";

import { CookieSettingsButton } from "@/components/analytics/cookie-settings-button";
import { Logo } from "@/components/brand/logo";
import { ButtonLink } from "@/components/shared/button-link";
import { Container } from "@/components/shared/layout-primitives";
import { OfficeList } from "@/components/shared/office-list";
import { SocialLinks } from "@/components/shared/social-links";
import { footerColumns } from "@/content/navigation";
import { analyticsEnabled } from "@/lib/analytics/config";
import { isPlaceholder, siteConfig, whatsappUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

const isExternal = (href: string) => /^https?:\/\//.test(href);

export function SiteFooter() {
  const { contact } = siteConfig;
  const whatsapp = whatsappUrl();

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
            {(!isPlaceholder(contact.email) || !isPlaceholder(contact.phone) || whatsapp) && (
              <address className="flex flex-col gap-1 text-sm not-italic text-muted-foreground">
                {!isPlaceholder(contact.email) && (
                  <a href={`mailto:${contact.email}`} className="hover:text-foreground">
                    {contact.email}
                  </a>
                )}
                {!isPlaceholder(contact.phone) && (
                  <a href={`tel:${contact.phone}`} className="hover:text-foreground">
                    {contact.phone}
                  </a>
                )}
                {whatsapp && (
                  <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                    Chat on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                )}
              </address>
            )}
            <SocialLinks size="sm" />
          </div>

          <nav
            aria-label="Footer"
            className={cn(
              "grid grid-cols-2 gap-x-6 gap-y-10",
              footerColumns.length > 4 ? "sm:grid-cols-3 xl:grid-cols-5" : "sm:grid-cols-4",
            )}
          >
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h2 className="font-mono text-xs font-medium tracking-[0.14em] text-subtle uppercase">{col.title}</h2>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {col.links.map((link) =>
                    isExternal(link.href) ? (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {link.label}
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      </li>
                    ) : (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {siteConfig.offices.length > 0 && (
          <div className="mt-14 border-t border-line pt-10">
            <h2 className="font-mono text-xs font-medium tracking-[0.14em] text-subtle uppercase">Our offices</h2>
            <OfficeList compact className="mt-5 sm:grid-cols-2 lg:grid-cols-4" />
          </div>
        )}

        <div className="mt-14 flex flex-col gap-2 border-t border-line pt-8 text-sm text-subtle sm:flex-row sm:items-center sm:gap-6">
          <p>
            © {new Date().getFullYear()} {siteConfig.legal.entityName}. All rights reserved.
          </p>
          {analyticsEnabled && <CookieSettingsButton />}
        </div>
      </Container>
    </footer>
  );
}
