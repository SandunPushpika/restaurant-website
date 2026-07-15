"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { fadeUp } from "@/lib/animations";

const partySizes = Array.from({ length: 8 }, (_, index) => index + 1);

const timeSlots = [
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
];

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  date?: string;
  time?: string;
}

const inputClassName =
  "h-11 w-full rounded-full border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ReservationForm() {
  const [submitted, setSubmitted] = React.useState<{
    name: string;
    date: string;
    time: string;
    partySize: string;
  } | null>(null);
  const [errors, setErrors] = React.useState<FormErrors>({});

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const date = String(formData.get("date") ?? "").trim();
    const time = String(formData.get("time") ?? "").trim();
    const partySize = String(formData.get("partySize") ?? "2");

    const nextErrors: FormErrors = {};
    if (!name) nextErrors.name = "Please enter your name.";
    if (!EMAIL_PATTERN.test(email))
      nextErrors.email = "Please enter a valid email address.";
    if (!phone) nextErrors.phone = "Please enter a phone number.";
    if (!date) nextErrors.date = "Please choose a date.";
    if (!time) nextErrors.time = "Please choose a time.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitted({ name, date, time, partySize });
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
          Reservation Requested
        </h3>
        <p className="max-w-md text-muted-foreground">
          Thank you, {submitted.name}. We've noted your request for{" "}
          {submitted.partySize}{" "}
          {Number(submitted.partySize) === 1 ? "guest" : "guests"} on{" "}
          {submitted.date} at {submitted.time}. Our team will confirm shortly.
        </p>
        <Button variant="primary" onClick={() => setSubmitted(null)}>
          Make Another Reservation
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-3">
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

        <div className="flex flex-col gap-2">
          <label
            htmlFor="phone"
            className="text-sm font-medium text-foreground"
          >
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+45 00 00 00 00"
            className={inputClassName}
          />
          {errors.phone ? (
            <p role="alert" className="text-xs text-primary">
              {errors.phone}
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <div className="flex flex-col gap-2">
          <label htmlFor="date" className="text-sm font-medium text-foreground">
            Date
          </label>
          <input id="date" name="date" type="date" className={inputClassName} />
          {errors.date ? (
            <p role="alert" className="text-xs text-primary">
              {errors.date}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="time" className="text-sm font-medium text-foreground">
            Time
          </label>
          <select id="time" name="time" defaultValue="" className={inputClassName}>
            <option value="" disabled>
              Select a time
            </option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          {errors.time ? (
            <p role="alert" className="text-xs text-primary">
              {errors.time}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="partySize"
            className="text-sm font-medium text-foreground"
          >
            Party Size
          </label>
          <select
            id="partySize"
            name="partySize"
            defaultValue="2"
            className={inputClassName}
          >
            {partySizes.map((size) => (
              <option key={size} value={size}>
                {size} {size === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="notes"
          className="text-sm font-medium text-foreground"
        >
          Special Requests
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          placeholder="Allergies, celebrations, seating preferences…"
          className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </div>

      <Button type="submit" variant="primary" size="lg" className="sm:w-fit">
        Request Reservation
      </Button>
    </form>
  );
}
