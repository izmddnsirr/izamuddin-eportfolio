import { Trophy } from "lucide-react";

import SectionReveal from "@/components/SectionReveal";
import { Card, CardContent } from "@/components/ui/card";
import { portfolioData } from "@/data/portfolio";

export default function Achievements() {
  return (
    <section id="achievements" className="scroll-mt-24 py-16 sm:py-20">
      <SectionReveal className="space-y-8">
        <div className="space-y-2 text-center">
          <p className="text-sm font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Recognition
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Achievements
          </h2>
        </div>

        <div className="relative space-y-4 pl-10 sm:pl-14 before:absolute before:top-2 before:bottom-2 before:left-5 before:w-px before:bg-border">
          <div className="absolute top-1/2 left-5 -translate-x-1/2 -translate-y-1/2 z-10 flex size-10 items-center justify-center rounded-full bg-linear-to-br from-yellow-400 to-orange-500 shadow-lg shadow-orange-500/30">
            <Trophy className="size-4 text-white" />
          </div>
          {portfolioData.achievements.map((item) => (
            <Card key={item.title} className="relative">
              <span className="absolute top-6 -left-[1.07rem] size-3 rounded-full border bg-background" />
              <CardContent className="flex flex-wrap items-start justify-between gap-2 sm:gap-4 px-5 py-3">
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <span className="shrink-0 text-sm text-muted-foreground">{item.year}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
