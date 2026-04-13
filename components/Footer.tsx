import Image from "next/image";
import { SiNextdotjs } from "react-icons/si";

import { portfolioData } from "@/data/portfolio";

const BASE = "https://thesvg.org/icons";

const iconClass = "transition-opacity hover:opacity-80";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:px-6">
        <p>
          &copy; {new Date().getFullYear()} {portfolioData.hero.fullName}. All rights reserved.
        </p>
        <div className="flex items-center gap-3">
          <a href="https://nextjs.org" target="_blank" rel="noreferrer" title="Next.js" className={iconClass}>
            <SiNextdotjs className="size-4 text-foreground" />
          </a>
          <a href="https://ui.shadcn.com" target="_blank" rel="noreferrer" title="shadcn/ui" className={iconClass}>
            <Image src={`${BASE}/shadcn-ui/default.svg`} alt="shadcn/ui" width={16} height={16} style={{ width: 16, height: 16 }} className="brightness-0 dark:invert" unoptimized />
          </a>
          <div className="h-4 w-px bg-border" />
          <a href="https://aws.amazon.com" target="_blank" rel="noreferrer" title="AWS" className={iconClass}>
            <Image src={`${BASE}/aws/default.svg`} alt="AWS" width={20} height={20} style={{ width: 20, height: 20 }} unoptimized />
          </a>
          <a href="https://aws.amazon.com/amplify" target="_blank" rel="noreferrer" title="AWS Amplify" className={iconClass}>
            <Image src={`${BASE}/aws-aws-amplify/default.svg`} alt="AWS Amplify" width={20} height={20} style={{ width: 20, height: 20 }} unoptimized />
          </a>
          <a href="https://vercel.com" target="_blank" rel="noreferrer" title="Vercel" className={iconClass}>
            <Image src={`${BASE}/vercel/default.svg`} alt="Vercel" width={16} height={16} style={{ width: 16, height: 16 }} className="brightness-0 dark:invert" unoptimized />
          </a>
        </div>
      </div>
    </footer>
  );
}
