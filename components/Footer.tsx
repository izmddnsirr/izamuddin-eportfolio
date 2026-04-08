import { portfolioData } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:px-6">
        <p>{new Date().getFullYear()} {portfolioData.hero.fullName}. All rights reserved.</p>
        <p>Built with Next.js and shadcn/ui.</p>
      </div>
    </footer>
  );
}
