"use client";

import * as React from "react";
import { Menu, X } from "lucide-react";

import ThemeToggle from "@/components/ThemeToggle";
import { portfolioData } from "@/data/portfolio";
import { Button } from "@/components/ui/button";

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const offset = 80;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [active, setActive] = React.useState<string>(
    portfolioData.nav[0]?.id ?? "hero",
  );

  React.useEffect(() => {
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname);
    }

    const ids = portfolioData.nav.map((item) => item.id);

    function onScroll() {
      const scrollY = window.scrollY + 100;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) current = id;
      }
      setActive(current);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-white/10 backdrop-blur-md backdrop-saturate-150">
      <div className="mx-auto flex w-full max-w-6xl items-center px-4 py-3 sm:px-6">
        <button
          onClick={() => scrollToSection("hero")}
          className="text-lg font-semibold tracking-tight"
        >
          Portfolio
        </button>

        <div className="hidden flex-1 items-center justify-center gap-1 md:flex">
          {portfolioData.nav.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`px-3 py-2 text-sm transition-colors duration-200 hover:text-foreground ${active === item.id ? "text-foreground font-medium" : "text-muted-foreground"}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="hidden md:flex">
          <ThemeToggle />
        </div>

        <div className="ml-auto flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Button
            aria-label="Toggle menu"
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? (
              <X className="size-4" />
            ) : (
              <Menu className="size-4" />
            )}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 px-4 py-2 md:hidden">
          <nav className="flex flex-col">
            {portfolioData.nav.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  scrollToSection(item.id);
                  setMobileOpen(false);
                }}
                className="rounded-md px-3 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-white/10"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
