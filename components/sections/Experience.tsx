import SectionReveal from "@/components/SectionReveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { portfolioData } from "@/data/portfolio";
import { Briefcase } from "lucide-react";
import Image from "next/image";

const companyLogos: Record<string, string> = {
  "Zafran Resources Sdn. Bhd.": "/zafran.png",
};

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 py-16 sm:py-20">
      <SectionReveal className="space-y-8">
        <div className="space-y-2 text-center">
          <p className="text-sm font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Experience
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Work timeline
          </h2>
        </div>

        <div className="relative space-y-4 pl-14 before:absolute before:top-2 before:bottom-2 before:left-5 before:w-px before:bg-border">
          <div className="absolute top-1/2 left-5 -translate-x-1/2 -translate-y-1/2 z-10 flex size-10 items-center justify-center rounded-full bg-linear-to-br from-violet-500 to-purple-600 shadow-lg shadow-purple-500/30">
            <Briefcase className="size-4 text-white" />
          </div>
          {portfolioData.experience.map((job) => (
            <Card key={`${job.company}-${job.role}`} className="relative">
              <span className="absolute top-6 -left-[1.07rem] size-3 rounded-full border bg-background" />
              <CardContent className="space-y-3 px-5 py-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-4">
                    {companyLogos[job.company] && (
                      <>
                        <div className="flex w-15 shrink-0 items-center justify-center">
                          <Image src={companyLogos[job.company]} alt={job.company} width={60} height={60} className="object-contain" style={{ width: 60, height: 60 }} />
                        </div>
                        <div className="w-px self-stretch bg-border" />
                      </>
                    )}
                    <div>
                      <h3 className="text-lg font-semibold">{job.role}</h3>
                      <p className="text-sm text-muted-foreground">{job.company}</p>
                    </div>
                  </div>
                  <div className="shrink-0 flex flex-col items-end gap-1.5">
                    <p className="text-sm text-muted-foreground">{job.duration}</p>
                    {job.durationLength && (
                      <Badge variant="secondary">{job.durationLength}</Badge>
                    )}
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {job.responsibilities.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-[0.45rem] size-1.5 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
