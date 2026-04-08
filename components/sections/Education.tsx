import SectionReveal from "@/components/SectionReveal";
import { Card, CardContent } from "@/components/ui/card";
import { portfolioData } from "@/data/portfolio";

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

        <div className="grid gap-4">
          {portfolioData.education.map((item) => (
            <Card key={`${item.institution}-${item.degree}`}>
              <CardContent className="flex flex-wrap items-start justify-between gap-4 p-5">
                <div>
                  <h3 className="text-lg font-semibold">{item.degree}</h3>
                  <p className="text-muted-foreground">{item.institution}</p>
                </div>
                <p className="text-sm text-muted-foreground">{item.year}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
