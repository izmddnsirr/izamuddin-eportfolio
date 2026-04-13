"use client";

import ProfileCard from "@/components/ProfileCard";
import SectionReveal from "@/components/SectionReveal";
import { Card, CardContent } from "@/components/ui/card";
import { portfolioData } from "@/data/portfolio";

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 py-16 sm:py-20">
      <SectionReveal className="space-y-8">
        <div className="space-y-2 text-center">
          <p className="text-sm font-medium tracking-[0.18em] text-muted-foreground uppercase">
            About
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Get to know me
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-[auto_1fr]">
          <div className="about-profile-card mx-auto md:mx-0">
            <ProfileCard
              name="Muhamad Izamuddin"
              title="Software Engineer"
              handle="izamuddinnasir"
              status="Open to Internship"
              contactText="Contact Me"
              avatarUrl="/izamuddin.png"
              showUserInfo={false}
              enableTilt
              enableMobileTilt={false}
              iconUrl=""
              grainUrl=""
              innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
              behindGlowEnabled
              behindGlowColor="rgba(125, 190, 255, 0.45)"
              behindGlowSize="45%"
              onContactClick={() => {}}
            />
          </div>

          <Card className="h-full py-0">
            <CardContent className="flex h-full flex-col justify-between p-6">
              <p className="text-lg leading-relaxed text-muted-foreground text-justify">
                {portfolioData.about.bio}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {portfolioData.about.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-lg border bg-muted/40 p-4"
                  >
                    <p className="font-(family-name:--font-jetbrains-mono) text-2xl font-bold tracking-tight">
                      {stat.value}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </SectionReveal>
    </section>
  );
}
