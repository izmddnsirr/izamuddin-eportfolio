"use client";

import Image from "next/image";

import LogoLoop from "@/components/LogoLoop";
import SectionReveal from "@/components/SectionReveal";

const BASE = "https://thesvg.org/icons";

function TechIcon({ slug, name, size = 96, invertInDark = false, invertInLight = false }: { slug: string; name: string; size?: number; invertInDark?: boolean; invertInLight?: boolean }) {
  const className = invertInDark ? "dark:invert" : invertInLight ? "invert dark:invert-0" : undefined;
  return (
    <Image
      src={`${BASE}/${slug}/default.svg`}
      alt={name}
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className={className}
      unoptimized
    />
  );
}

const techLogos = [
  // Languages
  { node: <TechIcon slug="javascript" name="JavaScript" />, title: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { node: <TechIcon slug="typescript" name="TypeScript" />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <TechIcon slug="python" name="Python" />, title: "Python", href: "https://www.python.org" },
  // Frontend
  { node: <TechIcon slug="react" name="React" />, title: "React", href: "https://react.dev" },
  { node: <TechIcon slug="nextdotjs" name="Next.js" invertInDark />, title: "Next.js", href: "https://nextjs.org" },
  { node: <TechIcon slug="tailwind-css" name="Tailwind CSS" />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  // Mobile
  { node: <TechIcon slug="flutter" name="Flutter" />, title: "Flutter", href: "https://flutter.dev" },
  { node: <TechIcon slug="expo" name="Expo" invertInDark />, title: "Expo", href: "https://expo.dev" },
  // Database
  { node: <TechIcon slug="mysql" name="MySQL" invertInLight />, title: "MySQL", href: "https://www.mysql.com" },
  { node: <TechIcon slug="postgresql" name="PostgreSQL" />, title: "PostgreSQL", href: "https://www.postgresql.org" },
  { node: <TechIcon slug="supabase" name="Supabase" />, title: "Supabase", href: "https://supabase.com" },
  { node: <TechIcon slug="firebase" name="Firebase" />, title: "Firebase", href: "https://firebase.google.com" },
  // Design
  { node: <TechIcon slug="figma" name="Figma" />, title: "Figma", href: "https://figma.com" },
  // AI
  { node: <TechIcon slug="openai" name="ChatGPT" invertInLight />, title: "ChatGPT", href: "https://chatgpt.com" },
  { node: <TechIcon slug="claude" name="Claude" />, title: "Claude", href: "https://claude.ai" },
  // Tools
  { node: <TechIcon slug="visual-studio-code" name="VS Code" />, title: "VS Code", href: "https://code.visualstudio.com" },
  { node: <TechIcon slug="git" name="Git" />, title: "Git", href: "https://git-scm.com" },
  { node: <TechIcon slug="github" name="GitHub" invertInLight />, title: "GitHub", href: "https://github.com" },
];

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 py-16 sm:py-20">
      <SectionReveal className="space-y-8">
        <div className="space-y-2 text-center">
          <p className="text-sm font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Skills
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Tech stack and tools
          </h2>
        </div>

        <div className="relative overflow-hidden px-4 py-8 sm:px-6">
          <LogoLoop
            logos={techLogos}
            speed={100}
            direction="left"
            logoHeight={96}
            gap={64}
            hoverSpeed={0}
            scaleOnHover
            ariaLabel="Technology stack"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-background to-transparent sm:w-32" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-background to-transparent sm:w-32" />
        </div>
      </SectionReveal>
    </section>
  );
}
