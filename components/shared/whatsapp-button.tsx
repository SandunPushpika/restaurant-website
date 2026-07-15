import { MessageCircle } from "lucide-react";

import { siteConfig } from "@/constants/site";

export function WhatsAppButton() {
  const href = `https://wa.me/${siteConfig.whatsappNumber}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 left-6 z-40 flex size-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-lg transition-transform hover:scale-105"
    >
      <MessageCircle className="size-6" />
    </a>
  );
}
