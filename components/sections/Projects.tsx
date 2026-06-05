"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import SectionReveal from "@/components/SectionReveal";
import { buttonVariants } from "@/components/ui/button";
import { portfolioData } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const categories = [
  "All",
  ...new Set(
    portfolioData.projects.flatMap((p) =>
      p.categories && p.categories.length > 0 ? p.categories : [p.category],
    ),
  ),
] as const;

/* ── Lightbox ─────────────────────────────────────────────────────────── */
function Lightbox({
  images, title, index, onClose, onPrev, onNext,
}: {
  images: string[]; title: string; index: number;
  onClose: () => void; onPrev: () => void; onNext: () => void;
}) {
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-200 flex items-center justify-center bg-black/95 backdrop-blur-md"
      onClick={onClose}
    >
      {/* top bar */}
      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-4 py-3">
        <span className="text-sm font-medium text-white/60">{title}</span>
        <span className="absolute left-1/2 -translate-x-1/2 text-sm text-white/50">
          {index + 1} / {images.length}
        </span>
        <button onClick={onClose} className="flex size-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition">
          <X className="size-4" />
        </button>
      </div>

      {/* nav */}
      {images.length > 1 && (
        <>
          <button onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-3 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition">
            <ChevronLeft className="size-5" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition">
            <ChevronRight className="size-5" />
          </button>
        </>
      )}

      {/* image */}
      <motion.div key={index} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.18 }}
        className="relative mx-12 max-h-[85svh] w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <Image src={images[index]} alt={`${title} ${index + 1}`} width={1280} height={900}
          className="mx-auto max-h-[85svh] w-auto max-w-full rounded-2xl object-contain shadow-2xl" unoptimized />
      </motion.div>

      {/* dots */}
      {images.length > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, i) => (
            <button key={i} onClick={(e) => { e.stopPropagation(); }}
              className={cn("size-1.5 rounded-full transition-all", i === index ? "bg-white scale-125" : "bg-white/30")} />
          ))}
        </div>
      )}
    </motion.div>,
    document.body,
  );
}

/* ── Image strip ──────────────────────────────────────────────────────── */
function ImageStrip({ images, title }: { images: string[]; title: string }) {
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);
  const stripRef = React.useRef<HTMLDivElement>(null);
  const animRef = React.useRef<number>(0);
  const pausedRef = React.useRef(false);
  const posRef = React.useRef(0);

  const prev = React.useCallback(() => setLightboxIndex((i) => (i! - 1 + images.length) % images.length), [images.length]);
  const next = React.useCallback(() => setLightboxIndex((i) => (i! + 1) % images.length), [images.length]);

  // Auto-scroll
  React.useEffect(() => {
    const el = stripRef.current;
    if (!el || images.length <= 3) return;

    const speed = 0.6; // px per frame

    const tick = () => {
      if (!pausedRef.current && el) {
        posRef.current += speed;
        // Reset when scrolled half (we duplicate images for seamless loop)
        if (posRef.current >= el.scrollWidth / 2) {
          posRef.current = 0;
        }
        el.scrollLeft = posRef.current;
      }
      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [images.length]);

  if (images.length === 0) return null;

  // Duplicate images for seamless loop
  const looped = images.length > 3 ? [...images, ...images] : images;

  return (
    <>
      <div
        ref={stripRef}
        className="flex gap-3 overflow-x-hidden pb-2"
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
        onTouchStart={() => { pausedRef.current = true; }}
        onTouchEnd={() => { pausedRef.current = false; }}
      >
        {looped.map((src, i) => (
          <button key={i} onClick={() => setLightboxIndex(i % images.length)}
            className="group relative shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-muted shadow-md transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:border-white/20">
            <Image src={src} alt={`${title} ${(i % images.length) + 1}`} width={480} height={480}
              className="block h-52 w-auto object-contain transition-transform duration-500 group-hover:scale-[1.04]" sizes="auto" unoptimized />
            <div className="absolute inset-0 rounded-2xl bg-black/0 transition-all duration-300 group-hover:bg-black/10" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox images={images} title={title} index={lightboxIndex}
            onClose={() => setLightboxIndex(null)} onPrev={prev} onNext={next} />
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Project card ─────────────────────────────────────────────────────── */
function ProjectCard({ project }: { project: (typeof portfolioData.projects)[number] }) {
  const hasImages = (project.images ?? []).length > 0;
  const cats = project.categories && project.categories.length > 0 ? project.categories : [project.category];
  const featured = project.featured ?? false;
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group relative"
    >
      {/* card */}
      <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-500 hover:shadow-2xl hover:border-border">

          <div className="relative z-10 px-5 py-4">
          {/* title row */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              {featured && (
                <svg className="size-6 shrink-0 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              )}
              <h3 className="text-xl font-bold tracking-tight sm:text-2xl">{project.title}</h3>
            </div>
            {/* buttons */}
            <div className="flex shrink-0 items-center gap-2">
              <a href={project.githubUrl} target="_blank" rel="noreferrer"
                className="flex size-8 items-center justify-center rounded-full border border-border/70 bg-background text-muted-foreground transition-all hover:border-foreground/30 hover:bg-muted hover:text-foreground"
                aria-label="GitHub">
                <svg viewBox="0 0 24 24" className="size-4" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
              </a>
              {project.liveUrl.trim() ? (
                <a href={project.liveUrl} target="_blank" rel="noreferrer"
                  className={cn(buttonVariants({ variant: "default", size: "sm" }), "rounded-full gap-1.5")}>
                  <ExternalLink className="size-3.5" /> Live Demo
                </a>
              ) : (
                <span className={cn(buttonVariants({ variant: "outline", size: "sm" }), "rounded-full pointer-events-none opacity-50 gap-1.5")}>
                  <ExternalLink className="size-3.5" /> Coming Soon
                </span>
              )}
            </div>
          </div>

          {/* description */}
          <p className="mb-4 w-full text-sm leading-relaxed text-muted-foreground sm:text-base">
            {project.description}
          </p>

          {/* tech stack + badges row */}
          <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span key={tech} className="rounded-lg bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {cats.map((cat) => (
                <span key={cat} className="rounded-full border border-foreground/10 bg-foreground/5 px-2.5 py-0.5 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                  {cat}
                </span>
              ))}
              {project.year && (
                <span className="rounded-full border border-foreground/10 bg-foreground/5 px-2.5 py-0.5 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                  {project.year}
                </span>
              )}
            </div>
          </div>

          {/* image strip */}
          {hasImages && <ImageStrip images={project.images!} title={project.title} />}
        </div>

        {/* gradient line at top */}
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-foreground/10 to-transparent" />
      </div>
    </motion.div>
  );
}

/* ── Section ──────────────────────────────────────────────────────────── */
export default function Projects() {
  const [activeCategory, setActiveCategory] = React.useState<(typeof categories)[number]>("All");
  const [showAll, setShowAll] = React.useState(false);

  const items = portfolioData.projects
    .filter((p) => {
      if (activeCategory === "All") return true;
      const pc = p.categories && p.categories.length > 0 ? p.categories : [p.category];
      return pc.includes(activeCategory);
    })
    .sort((a, b) => (b.year ?? 0) - (a.year ?? 0));

  const visibleItems = showAll ? items : items.slice(0, 3);
  const canToggle = items.length > 3;

  return (
    <section id="projects" className="scroll-mt-24 py-16 sm:py-20">
      <SectionReveal className="space-y-10">
        {/* heading */}
        <div className="space-y-2 text-center">
          <p className="text-sm font-medium tracking-[0.18em] text-muted-foreground uppercase">Projects</p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Selected work</h2>
        </div>

        {/* filter */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button key={cat}
              onClick={() => { setActiveCategory(cat); setShowAll(false); }}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200",
                activeCategory === cat
                  ? "border-transparent bg-foreground text-background shadow-md"
                  : "border-border/60 bg-background text-muted-foreground hover:border-foreground/20 hover:bg-muted hover:text-foreground",
              )}>
              {cat}
            </button>
          ))}
        </div>

        {/* projects */}
        <AnimatePresence mode="wait">
          <div className="flex flex-col gap-5">
            {visibleItems.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </AnimatePresence>

        {canToggle && (
          <div className="flex justify-center">
            <button type="button" onClick={() => setShowAll((p) => !p)}
              className={cn(buttonVariants({ variant: "outline" }), "min-w-36 rounded-full")}>
              {showAll ? "View Less" : "View More"}
            </button>
          </div>
        )}
      </SectionReveal>
    </section>
  );
}
