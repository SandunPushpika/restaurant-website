"use client";

import * as React from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "success" | "error";

export function Newsletter({ className }: { className?: string }) {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<Status>("idle");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!EMAIL_PATTERN.test(email)) {
      setStatus("error");
      return;
    }

    setStatus("success");
    setEmail("");
    window.setTimeout(() => setStatus("idle"), 4000);
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setStatus("idle");
          }}
          placeholder="Your email address"
          className="h-11 flex-1 rounded-full border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
        <Button type="submit" variant="primary" size="default">
          Subscribe
        </Button>
      </form>
      {status === "success" ? (
        <p
          role="status"
          className="inline-flex items-center gap-1.5 text-sm text-background"
        >
          <CheckCircle2 className="size-4 shrink-0" />
          Thank you for subscribing!
        </p>
      ) : null}
      {status === "error" ? (
        <p
          role="alert"
          className="inline-flex items-center gap-1.5 text-sm text-background"
        >
          <AlertCircle className="size-4 shrink-0" />
          Please enter a valid email address.
        </p>
      ) : null}
    </div>
  );
}
