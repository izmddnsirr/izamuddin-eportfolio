import SectionReveal from "@/components/SectionReveal";
import { Card, CardContent } from "@/components/ui/card";
import { portfolioData } from "@/data/portfolio";

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

        <div className="relative space-y-4 pl-6 before:absolute before:top-2 before:bottom-2 before:left-2 before:w-px before:bg-border">
          {portfolioData.experience.map((job) => (
            <Card key={`${job.company}-${job.role}`} className="relative">
              <span className="absolute top-6 -left-[1.07rem] size-3 rounded-full border bg-background" />
              <CardContent className="space-y-3 p-5">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-semibold">{job.role}</h3>
                    <p className="text-sm text-muted-foreground">
                      {job.company}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {job.duration}
                  </p>
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
