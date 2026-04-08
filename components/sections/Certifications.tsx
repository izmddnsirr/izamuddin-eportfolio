import { BadgeCheck } from "lucide-react";
import Image from "next/image";

import SectionReveal from "@/components/SectionReveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { portfolioData } from "@/data/portfolio";

export default function Certifications() {
  return (
    <section id="certifications" className="scroll-mt-24 py-16 sm:py-20">
      <SectionReveal className="space-y-8">
        <div className="space-y-2 text-center">
          <p className="text-sm font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Credentials
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Certifications
          </h2>
        </div>

        <div className="relative space-y-4 pl-10 sm:pl-14 before:absolute before:top-2 before:bottom-2 before:left-5 before:w-px before:bg-border">
          <div className="absolute top-1/2 left-5 -translate-x-1/2 -translate-y-1/2 z-10 flex size-10 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30">
            <BadgeCheck className="size-4 text-white" />
          </div>
          {portfolioData.certifications.map((cert) => (
            <Card key={cert.name} className="relative">
              <span className="absolute top-6 -left-[1.07rem] size-3 rounded-full border bg-background" />
              <CardContent className="flex flex-wrap items-center justify-between gap-2 sm:gap-4 px-5 py-3">
                <div className="flex items-center gap-4">
                  {cert.issuerLogo && (
                    <div className="flex h-12 w-12 sm:h-15 sm:w-15 shrink-0 items-center justify-center">
                      <Image
                        src={`https://thesvg.org/icons/${cert.issuerLogo}/default.svg`}
                        alt={cert.issuer}
                        width={cert.logoSize ?? 60}
                        height={cert.logoSize ?? 60}
                        style={{ width: cert.logoSize ?? 60, height: cert.logoSize ?? 60 }}
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                  )}
                  <div className="w-px self-stretch bg-border" />
                  <div>
                    <h3 className="text-lg font-semibold">{cert.name}</h3>
                    <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  </div>
                </div>
                <div className="shrink-0 flex flex-col items-end gap-1.5">
                  <p className="text-sm text-muted-foreground">{cert.date}</p>
                  {cert.status && (
                    <Badge variant="secondary">{cert.status}</Badge>
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
