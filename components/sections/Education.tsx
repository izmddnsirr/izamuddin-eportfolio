import SectionReveal from "@/components/SectionReveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { portfolioData } from "@/data/portfolio";
import Image from "next/image";
import { GraduationCap } from "lucide-react";

export default function Education() {
  return (
    <section id="education" className="scroll-mt-24 py-16 sm:py-20">
      <SectionReveal className="space-y-8">
        <div className="space-y-2 text-center">
          <p className="text-sm font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Education
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Academic background
          </h2>
        </div>

        <div className="relative space-y-4 pl-10 sm:pl-14 before:absolute before:top-2 before:bottom-2 before:left-5 before:w-px before:bg-border">
          <div className="absolute top-1/2 left-5 -translate-x-1/2 -translate-y-1/2 z-10 flex size-10 items-center justify-center rounded-full bg-linear-to-br from-green-400 to-emerald-600 shadow-lg shadow-emerald-500/30">
            <GraduationCap className="size-4 text-white" />
          </div>
          {portfolioData.education.map((item) => (
            <Card key={`${item.institution}-${item.degree}`} className="relative">
              <span className="absolute top-6 -left-[1.07rem] size-3 rounded-full border bg-background" />
              <CardContent className="flex flex-wrap items-center justify-between gap-2 sm:gap-4 px-5 py-3">
                <div className="flex items-center gap-4">
                  <div className="flex w-12 sm:w-15 shrink-0 items-center justify-center">
                    <Image src="/uthm.png" alt="UTHM" width={60} height={60} className="object-contain w-10 h-10 sm:w-15 sm:h-15" />
                  </div>
                  <div className="w-px self-stretch bg-border" />
                  <div>
                    <h3 className="text-lg font-semibold">{item.degree}</h3>
                    <p className="text-sm text-muted-foreground">{item.institution}</p>
                  </div>
                </div>
                <div className="shrink-0 flex flex-col items-end gap-1.5">
                  <p className="text-sm text-muted-foreground">{item.year.split(" | ")[0]}</p>
                  {item.year.split(" | ")[1] && (
                    <Badge variant="secondary">{item.year.split(" | ")[1]}</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
