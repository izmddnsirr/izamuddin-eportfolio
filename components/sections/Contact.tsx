"use client";

import Image from "next/image";

import SectionReveal from "@/components/SectionReveal";
import { portfolioData } from "@/data/portfolio";

const BASE = "https://thesvg.org/icons";

const socialConfig: Record<string, { icon: React.ReactNode; color: string; isImage?: boolean }> = {
  GitHub: {
    icon: <Image src={`${BASE}/github/default.svg`} alt="GitHub" width={16} height={16} style={{ width: 16, height: 16 }} className="brightness-0 dark:invert" unoptimized />,
    color: "#24292e",
    isImage: true,
  },
  LinkedIn: {
    icon: <Image src={`${BASE}/linkedin/default.svg`} alt="LinkedIn" width={16} height={16} style={{ width: 16, height: 16 }} unoptimized />,
    color: "#0A66C2",
    isImage: true,
  },
  Email: {
    icon: <Image src={`${BASE}/gmail/default.svg`} alt="Gmail" width={16} height={16} style={{ width: 16, height: 16 }} unoptimized />,
    color: "#EA4335",
    isImage: true,
  },
  Threads: {
    icon: <Image src={`${BASE}/threads/default.svg`} alt="Threads" width={16} height={16} style={{ width: 16, height: 16 }} className="brightness-0 dark:invert" unoptimized />,
    color: "#000000",
    isImage: true,
  },
};

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 py-16 sm:py-20">
      <SectionReveal className="flex justify-center">
        <div className="space-y-4 text-center">
          <p className="text-sm font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Contact
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Let us build something together
          </h2>
          <p className="mx-auto max-w-lg text-muted-foreground">
            Have an idea, collaboration, or internship opportunity? Reach out
            through the form or connect via social links below.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {portfolioData.contact.socials.map((social) => {
              const config = socialConfig[social.label];
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                  className="group flex size-10 items-center justify-center rounded-full border text-muted-foreground transition-all duration-200"
                  onMouseEnter={(e) => {
                    if (config?.color) {
                      e.currentTarget.style.color = "#ffffff";
                      e.currentTarget.style.borderColor = config.color;
                      e.currentTarget.style.backgroundColor = config.color;
                      if (config.isImage) {
                        const img = e.currentTarget.querySelector("img");
                        if (img) img.style.filter = "brightness(0) invert(1)";
                      }
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "";
                    e.currentTarget.style.borderColor = "";
                    e.currentTarget.style.backgroundColor = "";
                    if (config?.isImage) {
                      const img = e.currentTarget.querySelector("img");
                      if (img) img.style.filter = "";
                    }
                  }}
                >
                  {config?.icon}
                </a>
              );
            })}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
