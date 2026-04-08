"use client";

import { SiExpo, SiFirebase, SiFlutter, SiNextdotjs, SiReact, SiSupabase, SiTailwindcss, SiTypescript } from "react-icons/si";

import LogoLoop from "@/components/LogoLoop";
import SectionReveal from "@/components/SectionReveal";
import { portfolioData } from "@/data/portfolio";

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiSupabase />, title: "Supabase", href: "https://supabase.com" },
  { node: <SiFlutter />, title: "Flutter", href: "https://flutter.dev" },
  { node: <SiExpo />, title: "Expo", href: "https://expo.dev" },
  { node: <SiFirebase />, title: "Firebase", href: "https://firebase.google.com" },
];

const stackColorMap: Record<string, string> = {
  JavaScript: "#F7DF1E",
  Python: "#3776AB",
  "Next.js": "#111111",
  "React Native": "#61DAFB",
  Expo: "#111827",
  Flutter: "#02569B",
  MySQL: "#4479A1",
  PostgreSQL: "#336791",
  Supabase: "#3ECF8E",
  Firebase: "#FFCA28",
  Git: "#F05032",
  GitHub: "#181717",
  XAMPP: "#FB7A24",
  "Agile Development": "#0EA5E9",
  UML: "#8B5CF6",
  "System Design": "#14B8A6",
  React: "#61DAFB",
  TypeScript: "#3178C6",
  "Tailwind CSS": "#06B6D4",
};

const excludedBadgeStacks = new Set(["Agile Development", "UML", "XAMPP", "System Design"]);
const allStacks = [...new Set(portfolioData.skills.flatMap((group) => group.skills))].filter(
  (stack) => !excludedBadgeStacks.has(stack),
);

function getContrastText(hexColor: string) {
  const hex = hexColor.replace("#", "");
  if (hex.length !== 6) return "#FFFFFF";
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return luminance > 0.62 ? "#111111" : "#FFFFFF";
}

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
            logoHeight={68}
            gap={64}
            hoverSpeed={0}
            scaleOnHover
            ariaLabel="Technology stack"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-background to-transparent sm:w-32" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-background to-transparent sm:w-32" />
        </div>

        <div className="flex flex-wrap justify-center gap-2 px-4 sm:px-6">
          {allStacks.map((stack) => {
            const color = stackColorMap[stack] ?? "#6B7280";
            const textColor = getContrastText(color);
            return (
              <span
                key={stack}
                className="rounded-full border px-3.5 py-1.5 text-xs font-semibold leading-none"
                style={{
                  color: textColor,
                  borderColor: `${color}CC`,
                  backgroundColor: color,
                }}
              >
                {stack}
              </span>
            );
          })}
        </div>
      </SectionReveal>
    </section>
  );
}
