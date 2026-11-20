"use client";

import { useId, useRef, useState } from "react";
import { CircleCheck, LoaderCircle, TriangleAlert, Upload, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics/events";
import { submitApplication } from "@/lib/careers/actions";
import { experienceOptions, RESUME_MAX_BYTES, RESUME_TYPES, type ApplicationResult } from "@/lib/careers/schema";
import { cn } from "@/lib/utils";

const fieldClass =
  "block w-full rounded-xl border border-input bg-background px-4 py-2.5 text-[0.9375rem] text-foreground placeholder:text-subtle transition-colors focus-visible:border-signal focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-signal/40 aria-[invalid=true]:border-destructive";

function Field({
  id,
  label,
  required,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
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
      {children}
      {error && (
        <p id={`${id}-error`} className="flex items-center gap-1.5 text-sm text-destructive">
          <TriangleAlert aria-hidden="true" className="size-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

/** Kept outside the component so render stays pure. */
const now = () => Date.now();

/**
 * "Apply" button + application form in a native <dialog>. Sends the details
 * and résumé to a Server Action, which emails them to the team inbox.
 */
export function ApplyDialog({
  role,
  label = "Apply",
  size = "cta",
  className,
}: {
  role: string;
  label?: React.ReactNode;
  size?: "cta" | "cta-lg";
  className?: string;
}) {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const startedAt = useRef(0);
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<ApplicationResult | null>(null);
  const [fileName, setFileName] = useState<string>();
  const errors = result?.fieldErrors ?? {};

  const open = () => {
    startedAt.current = now();
    setResult(null);
    dialogRef.current?.showModal();
    document.documentElement.style.overflow = "hidden";
    track("generate_lead", { form: "job_application", role, step: "open" });
  };
  const close = () => {
    dialogRef.current?.close();
  };
  const onClose = () => {
    document.documentElement.style.overflow = "";
    if (result?.ok) {
      formRef.current?.reset();
      setFileName(undefined);
      setResult(null);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("role", role);
    data.set("startedAt", String(startedAt.current));

    // Quick client-side file checks; the server checks again.
    const file = data.get("resume");
    if (file instanceof File && file.size > 0) {
      if (!RESUME_TYPES[file.type]) return setResult({ ok: false, fieldErrors: { resume: "Please upload a PDF or Word document." } });
      if (file.size > RESUME_MAX_BYTES)
        return setResult({ ok: false, fieldErrors: { resume: "Your file is larger than 3 MB. Please upload a smaller file." } });
    }

    setPending(true);
    try {
      const res = await submitApplication(data);
      setResult(res);
      if (res.ok) track("generate_lead", { form: "job_application", role, step: "submitted" });
    } catch {
      setResult({ ok: false, message: "Something went wrong. Please check your connection and try again." });
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      <Button type="button" size={size} onClick={open} className={className} data-track-cta={`careers_apply_${role}`}>
        {label}
        <span className="sr-only"> for {role}</span>
      </Button>

      <dialog
        ref={dialogRef}
        onClose={onClose}
        aria-labelledby={id("title")}
        className="m-auto max-h-[92dvh] w-[min(640px,calc(100vw-2rem))] overflow-y-auto rounded-3xl border border-line-strong bg-background p-0 text-foreground shadow-2xl backdrop:bg-slate-900/50 backdrop:backdrop-blur-sm"
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-line bg-background px-6 py-5">
          <div>
            <p className="font-mono text-[0.6875rem] tracking-wider text-signal uppercase">Apply</p>
            <h2 id={id("title")} className="mt-1 font-display text-xl font-semibold">
              {role}
            </h2>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close application form"
            className="grid size-10 shrink-0 place-items-center rounded-lg hover:bg-secondary"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>

        {result?.ok ? (
          <div className="flex flex-col items-center px-6 py-14 text-center" role="status">
            <CircleCheck aria-hidden="true" className="size-12 text-signal" />
            <p className="mt-5 font-display text-xl font-semibold">Application sent — thank you!</p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
              We&apos;ve received your details and CV for {role}. Our team will review them and get back to you if
              there&apos;s a match.
            </p>
            <Button type="button" size="cta" variant="outline" className="mt-8" onClick={close}>
              Close
            </Button>
          </div>
        ) : (
          <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-5 px-6 py-6 sm:grid-cols-2">
            {/* Honeypot: hidden from people, tempting for bots. */}
            <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
              <label htmlFor={id("website")}>Website</label>
              <input id={id("website")} name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <Field id={id("name")} label="Full name" required error={errors.name}>
              <input id={id("name")} name="name" autoComplete="name" required className={fieldClass} aria-invalid={!!errors.name} />
            </Field>
            <Field id={id("email")} label="Email" required error={errors.email}>
              <input
                id={id("email")}
                name="email"
                type="email"
                autoComplete="email"
                required
                className={fieldClass}
                aria-invalid={!!errors.email}
              />
            </Field>
            <Field id={id("phone")} label="Phone" required error={errors.phone}>
              <input
                id={id("phone")}
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                className={fieldClass}
                aria-invalid={!!errors.phone}
              />
            </Field>
            <Field id={id("experience")} label="Experience" required error={errors.experience}>
              <select
                id={id("experience")}
                name="experience"
                required
                defaultValue=""
                className={fieldClass}
                aria-invalid={!!errors.experience}
              >
                <option value="" disabled>
                  Select
                </option>
                {experienceOptions.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </Field>
            <Field id={id("location")} label="Current location" error={errors.location}>
              <input id={id("location")} name="location" autoComplete="address-level2" className={fieldClass} />
            </Field>
            <Field id={id("profileUrl")} label="LinkedIn or portfolio" error={errors.profileUrl}>
              <input
                id={id("profileUrl")}
                name="profileUrl"
                type="url"
                placeholder="https://"
                className={fieldClass}
                aria-invalid={!!errors.profileUrl}
              />
            </Field>

            <Field id={id("resume")} label="CV / résumé" required error={errors.resume} className="sm:col-span-2">
              <label
                htmlFor={id("resume")}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-xl border border-dashed px-4 py-4 transition-colors hover:border-signal",
                  errors.resume ? "border-destructive" : "border-line-strong",
                )}
              >
                <Upload aria-hidden="true" className="size-5 shrink-0 text-signal" />
                <span className="min-w-0 text-sm">
                  <span className="block truncate font-medium text-foreground">{fileName ?? "Choose a file"}</span>
                  <span className="text-xs text-subtle">PDF or Word, up to 3 MB</span>
                </span>
              </label>
              <input
                id={id("resume")}
                name="resume"
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                required
                className="sr-only"
                aria-invalid={!!errors.resume}
                onChange={(e) => setFileName(e.currentTarget.files?.[0]?.name)}
              />
            </Field>

            <Field id={id("message")} label="Why this role?" error={errors.message} className="sm:col-span-2">
              <textarea id={id("message")} name="message" rows={4} className={cn(fieldClass, "resize-y")} />
            </Field>

            {result && !result.ok && result.message && (
              <p role="alert" className="flex items-start gap-2 text-sm text-destructive sm:col-span-2">
                <TriangleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                {result.message}
              </p>
            )}

            <div className="flex flex-col-reverse gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-subtle">We use your details only to assess your application.</p>
              <Button type="submit" size="cta" disabled={pending}>
                {pending ? (
                  <>
                    <LoaderCircle aria-hidden="true" className="animate-spin" />
                    Sending…
                  </>
                ) : (
                  "Submit application"
                )}
              </Button>
            </div>
          </form>
        )}
      </dialog>
    </>
  );
}
