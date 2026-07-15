"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { mainNavLinks } from "@/constants/navigation";
import { siteConfig } from "@/constants/site";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { cn } from "@/lib/utils";

export function Navbar() {
  const scrolled = useScrollPosition();
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  React.useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
        scrolled
          ? "bg-background/90 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className={cn(
            "font-display text-xl tracking-wide transition-colors",
            scrolled ? "text-foreground" : "text-[#F8F4ED]"
          )}
        >
          {siteConfig.name}
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {mainNavLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm font-medium uppercase tracking-wide transition-colors hover:text-accent",
                    isActive
                      ? "text-accent"
                      : scrolled
                        ? "text-foreground"
                        : "text-[#F8F4ED]"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle
            className={scrolled ? undefined : "text-[#F8F4ED] hover:bg-[#F8F4ED]/10"}
          />
          <Button asChild variant="primary" size="sm">
            <Link href="/reservations">Reserve a Table</Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle
            className={scrolled ? undefined : "text-[#F8F4ED] hover:bg-[#F8F4ED]/10"}
          />
          <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "size-11 rounded-full p-0",
                  scrolled ? "text-foreground" : "text-[#F8F4ED] hover:bg-[#F8F4ED]/10"
                )}
                aria-label="Open menu"
              >
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>{siteConfig.name}</SheetTitle>
                <SheetDescription>Site navigation menu</SheetDescription>
              </SheetHeader>
              <ul className="flex flex-col gap-6 px-6">
                {mainNavLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={cn(
                          "text-lg font-medium uppercase tracking-wide",
                          isActive ? "text-primary" : "text-foreground"
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-auto px-6 pb-6">
                <Button asChild variant="primary" size="lg" className="w-full">
                  <Link href="/reservations">Reserve a Table</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
