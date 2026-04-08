"use client";

import * as React from "react";
import Image from "next/image";
import { ExternalLink, GitBranch } from "lucide-react";

import SectionReveal from "@/components/SectionReveal";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { portfolioData } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const categories = [
  "All",
  ...new Set(
    portfolioData.projects.flatMap((project) =>
      project.categories && project.categories.length > 0
        ? project.categories
        : [project.category],
    ),
  ),
] as const;

function ProjectPreview({ title, image, year }: { title: string; image: string; year?: number }) {
  const [hasError, setHasError] = React.useState(false);

  return (
    <div className="relative h-44 w-full overflow-hidden border-b bg-linear-to-br from-muted/70 via-muted/30 to-background">
      <div className="absolute inset-0 grid place-items-center">
        <span className="rounded-full border border-foreground/10 bg-background/80 px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-muted-foreground uppercase backdrop-blur-sm">
          {title}
        </span>
      </div>
      {year && (
        <span className="absolute right-3 top-3 z-10 rounded-md border border-foreground/10 bg-background/80 px-2 py-0.5 text-xs font-medium text-muted-foreground backdrop-blur-sm">
          {year}
        </span>
      )}

      {!hasError && (
        <Image
          src={image}
          alt={`${title} screenshot`}
          fill
          unoptimized={image.endsWith(".svg")}
          onError={() => setHasError(true)}
          className="object-cover transition-transform duration-500 group-hover/card:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-background/70 to-transparent" />
    </div>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] =
    React.useState<(typeof categories)[number]>("All");
  const [showAll, setShowAll] = React.useState(false);

  const items = portfolioData.projects.filter((project) => {
    if (activeCategory === "All") return true;
    const projectCategories =
      project.categories && project.categories.length > 0
        ? project.categories
        : [project.category];
    return projectCategories.includes(activeCategory);
  });
  const visibleItems = showAll ? items : items.slice(0, 3);
  const canToggleView = items.length > 3;

  return (
    <section id="projects" className="scroll-mt-24 py-16 sm:py-20">
      <SectionReveal className="space-y-8">
        <div className="space-y-2 text-center">
          <p className="text-sm font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Projects
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Selected work
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setShowAll(false);
              }}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm transition-colors",
                activeCategory === category
                  ? "border-transparent bg-primary text-primary-foreground"
                  : "bg-background text-muted-foreground hover:bg-muted",
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visibleItems.map((project) => (
            <Card
              key={project.title}
              className="overflow-hidden border border-border/70 pt-0 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <ProjectPreview title={project.title} image={project.image} year={project.year} />
              <CardHeader className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <div className="flex flex-wrap items-center justify-end gap-1">
                    {(project.categories && project.categories.length > 0
                      ? project.categories
                      : [project.category]
                    ).map((category) => (
                      <Badge key={`${project.title}-${category}`}>
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
                <p className="min-h-24 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-nowrap items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="shrink-0 whitespace-nowrap rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="gap-2">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "flex-1 justify-center",
                  )}
                >
                  <GitBranch className="size-4" /> GitHub
                </a>
                {project.liveUrl.trim() ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      buttonVariants({ variant: "default" }),
                      "flex-1 justify-center",
                    )}
                  >
                    <ExternalLink className="size-4" /> Live Demo
                  </a>
                ) : (
                  <span
                    aria-disabled="true"
                    className={cn(
                      buttonVariants({ variant: "default" }),
                      "pointer-events-none flex-1 justify-center opacity-55",
                    )}
                  >
                    <ExternalLink className="size-4" /> Coming Soon
                  </span>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        {canToggleView && (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className={cn(buttonVariants({ variant: "outline" }), "min-w-32")}
            >
              {showAll ? "View Less" : "View More"}
            </button>
          </div>
        )}
      </SectionReveal>
    </section>
  );
}
