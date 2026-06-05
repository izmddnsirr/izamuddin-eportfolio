"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink, GitBranch, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog";
import type { ProjectItem } from "@/data/portfolio";
import { cn } from "@/lib/utils";

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function ImageGallery({ images, title }: { images: string[]; title: string }) {
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);

  if (images.length === 0) return null;

  const prev = () => setLightboxIndex((i) => (i! - 1 + images.length) % images.length);
  const next = () => setLightboxIndex((i) => (i! + 1) % images.length);

  const onKey = React.useCallback((e: KeyboardEvent) => {
    if (lightboxIndex === null) return;
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
    if (e.key === "Escape") setLightboxIndex(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxIndex, images.length]);

  React.useEffect(() => {
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onKey]);

  return (
    <>
      {/* Grid */}
      <div className={cn(
        "grid gap-2",
        images.length === 1 ? "grid-cols-1" :
        images.length === 2 ? "grid-cols-2" :
        "grid-cols-3"
      )}>
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setLightboxIndex(i)}
            className="group relative aspect-9/16 overflow-hidden rounded-lg border bg-muted transition-all hover:opacity-90 hover:ring-2 hover:ring-foreground/30"
          >
            <Image
              src={src}
              alt={`${title} screenshot ${i + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 33vw, 200px"
              unoptimized
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
              <span className="rounded-full bg-black/60 px-2 py-0.5 text-[10px] text-white backdrop-blur-sm">
                {i + 1} / {images.length}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close */}
          <button
            className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close"
          >
            <X className="size-5" />
          </button>

          {/* Counter */}
          <span className="absolute top-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-sm text-white backdrop-blur-sm">
            {lightboxIndex + 1} / {images.length}
          </span>

          {/* Prev */}
          {images.length > 1 && (
            <button
              className="absolute left-3 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous"
            >
              <ChevronLeft className="size-5" />
            </button>
          )}

          {/* Image */}
          <div
            className="relative mx-16 max-h-[88svh] w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightboxIndex]}
              alt={`${title} screenshot ${lightboxIndex + 1}`}
              width={390}
              height={844}
              className="mx-auto max-h-[88svh] w-auto rounded-2xl object-contain shadow-2xl"
              unoptimized
            />
          </div>

          {/* Next */}
          {images.length > 1 && (
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next"
            >
              <ChevronRight className="size-5" />
            </button>
          )}

          {/* Dot indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                className={cn(
                  "size-1.5 rounded-full transition-all",
                  i === lightboxIndex ? "bg-white scale-125" : "bg-white/40",
                )}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function renderDetails(text: string) {
  // Simple markdown-like renderer for **bold** and paragraphs
  return text.split("\n\n").map((block, i) => {
    if (block.startsWith("**") && block.includes("**\n")) {
      // Section heading: **Title**\ncontent
      const newlineIdx = block.indexOf("\n");
      const heading = block.slice(2, block.indexOf("**", 2));
      const content = block.slice(newlineIdx + 1);
      return (
        <div key={i} className="space-y-1">
          <h4 className="font-semibold text-foreground">{heading}</h4>
          <p className="text-sm leading-relaxed text-muted-foreground">{renderInline(content)}</p>
        </div>
      );
    }
    // Check if it's a list block (lines starting with -)
    if (block.includes("\n- ") || block.startsWith("- ")) {
      const lines = block.split("\n");
      const intro = lines[0].startsWith("- ") ? null : lines[0];
      const items = lines.filter((l) => l.startsWith("- ")).map((l) => l.slice(2));
      return (
        <div key={i} className="space-y-1">
          {intro && <p className="text-sm leading-relaxed text-muted-foreground">{renderInline(intro)}</p>}
          <ul className="space-y-1 pl-4">
            {items.map((item, j) => (
              <li key={j} className="list-disc text-sm leading-relaxed text-muted-foreground">
                {renderInline(item)}
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return (
      <p key={i} className="text-sm leading-relaxed text-muted-foreground">
        {renderInline(block)}
      </p>
    );
  });
}

function renderInline(text: string) {
  // Render **bold** inline
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export default function ProjectDetailModal({ project, open, onOpenChange }: ProjectDetailModalProps) {
  // Keyboard navigation for gallery
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  if (!project) return null;

  const categories = project.categories && project.categories.length > 0
    ? project.categories
    : [project.category];

  const hasImages = (project.images ?? []).length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="bg-black/60 backdrop-blur-sm" onClick={() => onOpenChange(false)} />
        <DialogContent
          showCloseButton={false}
          className="fixed top-1/2 left-1/2 z-50 flex max-h-[90svh] w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-border/70 bg-background p-0 shadow-2xl outline-none"
        >
          {/* Header */}
          <div className="flex shrink-0 items-start justify-between gap-4 border-b px-6 py-4">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-semibold">{project.title}</h2>
                {project.year && (
                  <span className="rounded-md border px-2 py-0.5 text-xs text-muted-foreground">
                    {project.year}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <Badge key={cat}>{cat}</Badge>
                ))}
              </div>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border bg-muted/50 text-muted-foreground transition hover:bg-muted hover:text-foreground"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Scrollable body */}
          <div className="flex-1 space-y-6 overflow-y-auto px-6 py-5">
            {/* Gallery */}
            {hasImages && (
              <ImageGallery images={project.images!} title={project.title} />
            )}

            {/* Description / Details */}
            {project.details ? (
              <div className="space-y-4">
                {renderDetails(project.details)}
              </div>
            ) : (
              <p className="text-sm leading-relaxed text-muted-foreground">{project.description}</p>
            )}

            {/* Tech Stack */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer actions */}
          <div className="flex shrink-0 gap-2 border-t bg-muted/30 px-6 py-4">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline" }), "flex-1 justify-center")}
            >
              <GitBranch className="size-4" /> GitHub
            </a>
            {project.liveUrl.trim() ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ variant: "default" }), "flex-1 justify-center")}
              >
                <ExternalLink className="size-4" /> Live Demo
              </a>
            ) : (
              <span
                aria-disabled="true"
                className={cn(buttonVariants({ variant: "default" }), "pointer-events-none flex-1 justify-center opacity-55")}
              >
                <ExternalLink className="size-4" /> Coming Soon
              </span>
            )}
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
