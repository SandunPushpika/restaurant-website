"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import type { GalleryImage } from "@/types";

interface LightboxProps {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export function Lightbox({
  images,
  index,
  onClose,
  onIndexChange,
}: LightboxProps) {
  const image = images[index];

  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") {
        onIndexChange((index + 1) % images.length);
      }
      if (event.key === "ArrowLeft") {
        onIndexChange((index - 1 + images.length) % images.length);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [index, images.length, onClose, onIndexChange]);

  if (!image) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        role="dialog"
        aria-modal="true"
        aria-label={image.alt}
        onClick={onClose}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/90 p-6"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close gallery image"
          className="absolute right-6 top-6 flex size-11 items-center justify-center rounded-full text-[#F8F4ED] transition-opacity hover:opacity-70"
        >
          <X className="size-6" />
        </button>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onIndexChange((index - 1 + images.length) % images.length);
          }}
          aria-label="Previous image"
          className="absolute left-4 flex size-11 items-center justify-center rounded-full text-[#F8F4ED] transition-opacity hover:opacity-70 sm:left-8"
        >
          <ChevronLeft className="size-8" />
        </button>

        <motion.div
          key={image.id}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          onClick={(event) => event.stopPropagation()}
          className="relative h-[70vh] w-full max-w-4xl"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 768px) 60vw, 100vw"
            className="object-contain"
          />
        </motion.div>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onIndexChange((index + 1) % images.length);
          }}
          aria-label="Next image"
          className="absolute right-4 flex size-11 items-center justify-center rounded-full text-[#F8F4ED] transition-opacity hover:opacity-70 sm:right-8"
        >
          <ChevronRight className="size-8" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
