import { CalendarCheck, Mail, MessageCircle, Phone } from "lucide-react";

import { ContactForm } from "@/components/forms/contact-form";
import { PageHero } from "@/components/sections/page-hero";
import { Container, Section } from "@/components/shared/layout-primitives";
import { nextSteps } from "@/content/contact";
import { buildMetadata } from "@/lib/seo";
import { OfficeList } from "@/components/shared/office-list";
import { getSocialLinks, SocialLinks } from "@/components/shared/social-links";
import { isPlaceholder, siteConfig, whatsappUrl } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Contact Us — Talk to Our Team",
  description:
    "Tell Syntram Technologies about your AI, voice AI, automation or software project. We'll reply with practical next steps and an honest view on fit.",
  path: "/contact",
});

export default function ContactPage() {
  const { email, phone, meetingUrl } = siteConfig.contact;
  const whatsapp = whatsappUrl("Hi Syntram, I'd like to discuss a project.");
  const channels = [
    whatsapp && { href: whatsapp, label: "WhatsApp", detail: "Chat with our team", Icon: MessageCircle, external: true },
    !isPlaceholder(meetingUrl) && { href: meetingUrl, label: "Book a call", detail: "Pick a time that suits you", Icon: CalendarCheck, external: true, meeting: true },
    !isPlaceholder(email) && { href: `mailto:${email}`, label: "Email", detail: email, Icon: Mail },
    !isPlaceholder(phone) && { href: `tel:${phone}`, label: "Phone", detail: phone, Icon: Phone },
  ].filter(Boolean) as {
    href: string;
    label: string;
    detail: string;
    Icon: typeof Mail;
    external?: boolean;
    meeting?: boolean;
  }[];

  return (
    <>
      <PageHero
        breadcrumb={[{ name: "Contact", path: "/contact" }]}
        eyebrow="Contact"
        title="Let's talk about what you're building"
        intro="Tell us about the workflow, product or idea on your mind. You'll hear back from a person — with honest advice on whether and how we can help."
      />

      <Section aria-label="Contact form">
        <Container className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div className="rounded-3xl border border-line-strong bg-surface p-6 sm:p-10">
            <ContactForm />
          </div>

          <aside className="flex flex-col gap-10">
            <div>
              <h2 className="font-display text-xl font-semibold text-foreground">What happens next</h2>
              <ol className="mt-6 flex flex-col gap-6">
                {nextSteps.map((step, i) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full border border-line-strong font-mono text-xs text-signal">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-medium text-foreground">{step.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {channels.length > 0 && (
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground">Other ways to reach us</h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {channels.map(({ href, label, detail, Icon, external, meeting }) => (
                    <li key={label}>
                      <a
                        href={href}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        {...(meeting ? { "data-track-meeting": "" } : {})}
                        className="flex items-center gap-4 rounded-2xl border border-line bg-card p-4 transition-colors hover:border-line-strong"
                      >
                        <Icon aria-hidden="true" className="size-5 shrink-0 text-signal" />
                        <span className="flex flex-col">
                          <span className="text-sm font-medium text-foreground">{label}</span>
                          <span className="text-sm text-muted-foreground">{detail}</span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {getSocialLinks().length > 0 && (
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground">Follow us</h2>
                <SocialLinks className="mt-5" />
              </div>
            )}
          </aside>
        </Container>
      </Section>

      {siteConfig.offices.length > 0 && (
        <Section tone="surface" aria-labelledby="offices-title" className="border-t border-line">
          <Container>
            <h2 id="offices-title" className="text-display-md font-semibold text-foreground">
              Our offices
            </h2>
            <OfficeList className="mt-8 lg:grid-cols-3" />
          </Container>
        </Section>
      )}
    </>
  );
}
