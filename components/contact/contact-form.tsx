"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { fadeUp } from "@/lib/animations";

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const inputClassName =
  "h-11 w-full rounded-full border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const [submitted, setSubmitted] = React.useState(false);
  const [errors, setErrors] = React.useState<FormErrors>({});

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const subject = String(formData.get("subject") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    const nextErrors: FormErrors = {};
    if (!name) nextErrors.name = "Please enter your name.";
    if (!EMAIL_PATTERN.test(email))
      nextErrors.email = "Please enter a valid email address.";
    if (!subject) nextErrors.subject = "Please enter a subject.";
    if (!message) nextErrors.message = "Please enter a message.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitted(true);
    event.currentTarget.reset();
  }

  if (submitted) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="flex flex-col items-center gap-4 rounded-2xl bg-card p-10 text-center text-card-foreground shadow-sm"
      >
        <CheckCircle2 className="size-12 text-secondary" aria-hidden="true" />
        <h3 className="font-display text-2xl text-foreground">
          Message Sent
        </h3>
        <p className="max-w-md text-muted-foreground">
          Thank you for reaching out. Our team will get back to you as soon
          as possible.
        </p>
        <Button variant="primary" onClick={() => setSubmitted(false)}>
          Send Another Message
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium text-foreground">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your name"
            className={inputClassName}
          />
          {errors.name ? (
            <p role="alert" className="text-xs text-primary">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-sm font-medium text-foreground"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            className={inputClassName}
          />
          {errors.email ? (
            <p role="alert" className="text-xs text-primary">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="subject"
          className="text-sm font-medium text-foreground"
        >
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          placeholder="How can we help?"
          className={inputClassName}
        />
        {errors.subject ? (
          <p role="alert" className="text-xs text-primary">
            {errors.subject}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="message"
          className="text-sm font-medium text-foreground"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tell us more…"
          className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
        {errors.message ? (
          <p role="alert" className="text-xs text-primary">
            {errors.message}
          </p>
        ) : null}
      </div>

      <Button type="submit" variant="primary" size="lg" className="sm:w-fit">
        Send Message
      </Button>
    </form>
  );
}
