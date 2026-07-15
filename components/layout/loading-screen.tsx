"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

import { siteConfig } from "@/constants/site";

export function LoadingScreen() {
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.3em" }}
            animate={{ opacity: 1, letterSpacing: "0.1em" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="font-display text-3xl text-foreground"
          >
            {siteConfig.name}
          </motion.span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
