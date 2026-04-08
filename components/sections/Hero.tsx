"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download, Mail } from "lucide-react";

import LineWaves from "@/components/LineWaves";
import { portfolioData } from "@/data/portfolio";
import { Button, buttonVariants } from "@/components/ui/button";

function scrollToSection(id: string) {
  const section = document.getElementById(id);
  if (!section) return;

  const offset = 80;
  const top = section.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

function scrollToProjects() {
  scrollToSection(portfolioData.hero.ctaPrimary.targetId);
}

function scrollToNextSection() {
  scrollToSection("about");
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative left-1/2 right-1/2 mt-16 -mx-[50vw] flex min-h-[calc(100svh-4rem)] w-screen scroll-mt-24 items-center justify-center overflow-visible px-0 py-16 sm:py-20"
    >
      <div
        className="absolute inset-x-0 -top-16 bottom-0 z-0 overflow-hidden opacity-75"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.68) 45%, rgba(0,0,0,0.34) 68%, rgba(0,0,0,0.14) 82%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.68) 45%, rgba(0,0,0,0.34) 68%, rgba(0,0,0,0.14) 82%, transparent 100%)",
        }}
      >
        <LineWaves
          speed={0.3}
          innerLineCount={32}
          outerLineCount={36}
          warpIntensity={1}
          rotation={-45}
          edgeFadeWidth={0.45}
          colorCycleSpeed={1}
          brightness={0.12}
          color1="#ffffff"
          color2="#ffffff"
          color3="#ffffff"
          enableMouseInteraction
          mouseInfluence={2}
        />
      </div>
      <div className="pointer-events-none absolute inset-x-0 -top-16 bottom-0 z-0 bg-linear-to-b from-background/18 via-background/52 to-background" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 mx-auto w-full max-w-3xl space-y-6 px-4 text-center sm:px-6"
      >
        <p className="text-sm font-medium tracking-[0.18em] text-muted-foreground uppercase">
          {portfolioData.hero.role}
        </p>
        <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          {portfolioData.hero.fullName}
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
          {portfolioData.hero.tagline}
        </p>
        <p className="mx-auto max-w-2xl leading-relaxed text-muted-foreground">
          {portfolioData.hero.summary}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button onClick={scrollToProjects} size="lg">
            {portfolioData.hero.ctaPrimary.label}{" "}
            <ArrowDown className="size-4" />
          </Button>
          <a
            href={portfolioData.hero.ctaSecondary.href}
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className:
                "border-border! bg-background! text-foreground! hover:bg-muted! dark:bg-background! dark:text-foreground!",
            })}
            download
          >
            {portfolioData.hero.ctaSecondary.label}{" "}
            <Download className="size-4" />
          </a>
        </div>

        <div className="flex items-center justify-center gap-3">
          {portfolioData.contact.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="flex size-11 items-center justify-center rounded-2xl border border-border/70 bg-background text-foreground transition-colors hover:bg-muted"
            >
              {social.label === "GitHub" && (
                <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              )}
              {social.label === "LinkedIn" && (
                <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              )}
              {social.label === "Email" && <Mail className="size-5" />}
              {social.label === "Threads" && (
                <svg
                  viewBox="0 0 192 192"
                  className="size-5"
                  fill="currentColor"
                >
                  <path d="M141.537 88.988a66.667 66.667 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.036l13.779 9.452c5.73-8.695 14.724-10.548 21.348-10.548h.229c8.249.053 14.474 2.452 18.502 7.13 2.932 3.405 4.893 8.11 5.864 14.05-7.314-1.243-15.224-1.626-23.68-1.14-23.82 1.371-39.134 15.264-38.105 34.568.522 9.792 5.4 18.216 13.735 23.719 7.047 4.652 16.124 6.927 25.557 6.412 12.458-.683 22.231-5.436 29.049-14.127 5.178-6.6 8.453-15.153 9.899-25.93 5.937 3.583 10.337 8.298 12.767 13.966 4.132 9.635 4.373 25.468-8.546 38.376-11.319 11.308-24.925 16.2-45.488 16.351-22.809-.169-40.06-7.484-51.275-21.742C35.236 139.966 29.808 120.682 29.605 96c.203-24.682 5.63-43.966 16.133-57.317C56.954 24.425 74.204 17.11 97.013 16.941c22.975.17 40.526 7.52 52.171 21.847 5.71 7.026 10.015 15.86 12.853 26.162l16.147-4.308c-3.44-12.68-8.853-23.606-16.219-32.668C147.036 9.607 125.202.195 97.07 0h-.113C68.882.195 47.292 9.642 32.788 28.08 19.882 44.485 13.224 67.315 13.001 95.932L13 96v.067c.224 28.617 6.882 51.447 19.788 67.854C47.292 182.358 68.882 191.805 96.957 192h.113c24.96-.173 42.554-6.708 57.048-21.189 18.963-18.945 18.392-42.692 12.142-57.27-4.484-10.454-13.033-18.945-24.723-24.553z" />
                </svg>
              )}
            </a>
          ))}
        </div>
      </motion.div>

      <motion.button
        type="button"
        onClick={scrollToNextSection}
        aria-label="Scroll to next section"
        className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 rounded-full border border-border/60 bg-background/90 p-2 text-muted-foreground backdrop-blur-sm transition-colors hover:bg-background hover:text-foreground"
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown className="size-4" />
      </motion.button>
    </section>
  );
}
