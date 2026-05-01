import { Trophy } from "lucide-react";

import SectionReveal from "@/components/SectionReveal";
import { Card, CardContent } from "@/components/ui/card";
import { portfolioData } from "@/data/portfolio";

const visibleAchievements = portfolioData.achievements.filter((item) => !item.hidden);

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
          {visibleAchievements.map((item) => (
            <Card key={item.title} className="relative">
              <span className="absolute top-6 -left-[1.07rem] size-3 rounded-full border bg-background" />
              <CardContent className="grid grid-cols-1 gap-2 px-5 py-2 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-4">
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <span className="text-sm text-muted-foreground sm:pt-0.5">{item.year}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
