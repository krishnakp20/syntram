"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useForm, type FieldErrors, type UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CircleCheck, LoaderCircle, TriangleAlert } from "lucide-react";

import { budgetOptions, serviceOptions } from "@/content/contact";
import { track } from "@/lib/analytics/events";
import { submitContact } from "@/lib/contact/actions";
import { contactSchema, type ContactFormInput, type ContactSubmission } from "@/lib/contact/schema";
import { cn } from "@/lib/utils";

const fieldClass =
  "block w-full rounded-xl border border-input bg-background px-4 py-3 text-[0.9375rem] text-foreground placeholder:text-subtle transition-colors focus-visible:border-signal focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-signal/40 aria-[invalid=true]:border-destructive";

interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: (describedBy: string | undefined) => React.ReactNode;
}

function Field({ id, label, required, error, hint, className, children }: FieldProps) {
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
        {required ? (
          <span className="text-signal" aria-hidden="true">
            {" "}
            *
          </span>
        ) : (
          <span className="font-normal text-subtle"> (optional)</span>
        )}
      </label>
      {children(describedBy)}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-subtle">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="flex items-center gap-1.5 text-sm text-destructive">
          <TriangleAlert aria-hidden="true" className="size-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

/** Event-handler-only timestamp (kept outside the component for render purity). */
function timestamp(): number {
  return Date.now();
}

function readUtm(): Pick<ContactFormInput, "utmSource" | "utmMedium" | "utmCampaign"> {
  const params = new URLSearchParams(window.location.search);
  const get = (k: string) => params.get(k)?.slice(0, 120) || undefined;
  return { utmSource: get("utm_source"), utmMedium: get("utm_medium"), utmCampaign: get("utm_campaign") };
}

/**
 * Contact form: React Hook Form + Zod on the client for instant, accessible
 * feedback; the same schema is enforced again in the server action.
 */
export function ContactForm({ defaultService }: { defaultService?: ContactFormInput["service"] }) {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const statusRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<{ kind: "idle" | "success" | "error"; message?: string }>({ kind: "idle" });

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInput, unknown, ContactSubmission>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    shouldFocusError: true,
    defaultValues: { service: defaultService ?? "", budget: "", startedAt: 0 },
  });

  // Client-only values: render time (spam timing), page and campaign attribution.
  useEffect(() => {
    setValue("startedAt", timestamp());
    setValue("sourcePath", window.location.pathname);
    const utm = readUtm();
    setValue("utmSource", utm.utmSource);
    setValue("utmMedium", utm.utmMedium);
    setValue("utmCampaign", utm.utmCampaign);
  }, [setValue]);

  useEffect(() => {
    if (status.kind !== "idle") statusRef.current?.focus();
  }, [status.kind]);

  const onValid = async (values: ContactSubmission) => {
    setStatus({ kind: "idle" });
    // Send raw input; the server re-validates and normalises independently.
    const result = await submitContact({ ...values, service: values.service ?? "", budget: values.budget ?? "" });
    if (result.ok) {
      track("generate_lead", { form: "contact", service: values.service ?? "unspecified", page: values.sourcePath });
      reset({ service: "", budget: "", startedAt: timestamp(), sourcePath: values.sourcePath });
      setStatus({ kind: "success" });
      return;
    }
    if (result.fieldErrors) {
      for (const [name, message] of Object.entries(result.fieldErrors)) {
        setError(name as keyof ContactFormInput, { message });
      }
    }
    track("contact_form_error", { reason: result.fieldErrors ? "validation" : "server" });
    setStatus({ kind: "error", message: result.message });
  };

  const onInvalid = (errs: FieldErrors<ContactFormInput>) => {
    track("contact_form_error", { reason: "validation", fields: Object.keys(errs).join(",") });
  };

  const input = (reg: UseFormRegisterReturn, name: keyof ContactFormInput, describedBy?: string) => ({
    ...reg,
    id: id(name),
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": describedBy,
    className: fieldClass,
  });

  if (status.kind === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="flex flex-col items-start gap-4 rounded-2xl border border-signal/30 bg-signal-soft p-8 outline-none"
      >
        <CircleCheck aria-hidden="true" className="size-8 text-signal" />
        <h2 className="font-display text-2xl font-semibold text-foreground">Thanks — your message is on its way</h2>
        <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">
          A member of our team will read it and reply by email with next steps. If anything changes in the meantime,
          just send another message.
        </p>
        <button
          type="button"
          onClick={() => setStatus({ kind: "idle" })}
          className="text-sm font-medium text-signal underline-offset-4 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)} noValidate aria-describedby={`${uid}-required-note`}>
      <p id={`${uid}-required-note`} className="mb-6 text-sm text-muted-foreground">
        Fields marked <span className="text-signal">*</span> are required.
      </p>

      {status.kind === "error" && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="mb-6 flex items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-foreground outline-none"
        >
          <TriangleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-destructive" />
          <p>{status.message}</p>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={id("name")} label="Name" required error={errors.name?.message}>
          {(d) => <input type="text" autoComplete="name" {...input(register("name"), "name", d)} />}
        </Field>
        <Field id={id("company")} label="Company" error={errors.company?.message}>
          {(d) => <input type="text" autoComplete="organization" {...input(register("company"), "company", d)} />}
        </Field>
        <Field id={id("email")} label="Work email" required error={errors.email?.message}>
          {(d) => (
            <input type="email" autoComplete="email" inputMode="email" {...input(register("email"), "email", d)} />
          )}
        </Field>
        <Field id={id("phone")} label="Phone" error={errors.phone?.message} hint="Include your country code.">
          {(d) => <input type="tel" autoComplete="tel" inputMode="tel" {...input(register("phone"), "phone", d)} />}
        </Field>
        <Field id={id("country")} label="Country" error={errors.country?.message}>
          {(d) => <input type="text" autoComplete="country-name" {...input(register("country"), "country", d)} />}
        </Field>
        <Field id={id("service")} label="Service" error={errors.service?.message}>
          {(d) => (
            <select {...input(register("service"), "service", d)}>
              <option value="">Select a service</option>
              {serviceOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          )}
        </Field>
        <Field id={id("budget")} label="Budget" error={errors.budget?.message} className="sm:col-span-2">
          {(d) => (
            <select {...input(register("budget"), "budget", d)}>
              <option value="">Select a range</option>
              {budgetOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          )}
        </Field>
        <Field
          id={id("message")}
          label="How can we help?"
          required
          error={errors.message?.message}
          hint="A few sentences about your goals, timeline and current setup is perfect."
          className="sm:col-span-2"
        >
          {(d) => <textarea rows={6} {...input(register("message"), "message", d)} className={cn(fieldClass, "resize-y")} />}
        </Field>
      </div>

      {/* Honeypot — hidden from people and assistive tech; bots tend to fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={id("website")}>Website</label>
        <input type="text" id={id("website")} tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>
      <input type="hidden" {...register("startedAt", { valueAsNumber: true })} />
      <input type="hidden" {...register("sourcePath")} />

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-xs leading-relaxed text-subtle">
          We use your details only to respond to your enquiry. We don&apos;t sell or share them, and we won&apos;t add
          you to a mailing list.
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-[0.9375rem] font-medium text-primary-foreground transition-colors hover:bg-primary/85 disabled:cursor-wait disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send message
              <ArrowRight aria-hidden="true" className="size-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
