import portfolioJson from "./portfolio.json";

export type NavItem = {
  id: string;
  label: string;
};

export type HeroData = {
  fullName: string;
  role: string;
  tagline: string;
  summary: string;
  ctaPrimary: {
    label: string;
    targetId: string;
  };
  ctaSecondary: {
    label: string;
    href: string;
  };
};

export type StatItem = {
  label: string;
  value: string;
};

export type AboutData = {
  profileImage: string;
  bio: string;
  stats: StatItem[];
};

export type SkillCategory = {
  category: string;
  skills: string[];
};

export type ProjectItem = {
  title: string;
  year?: number;
  category: "Web" | "Mobile" | "IoT";
  categories?: Array<"Web" | "Mobile" | "IoT">;
  image: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  images?: string[];
  details?: string;
  featured?: boolean;
};

export type ExperienceItem = {
  company: string;
  role: string;
  duration: string;
  durationLength?: string;
  responsibilities: string[];
};

export type EducationItem = {
  institution: string;
  degree: string;
  year: string;
};

export type CertificationItem = {
  name: string;
  issuer: string;
  issuerLogo?: string;
  logoSize?: number;
  date: string;
  status?: "In Progress" | "Completed";
};

export type AchievementItem = {
  title: string;
  description: string;
  year: number | string;
  hidden?: boolean;
};

export type InvolvementItem = {
  role: string;
  event: string;
  year: string | number;
  description: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type ContactData = {
  email: string;
  socials: SocialLink[];
};

export type PortfolioData = {
  site: {
    title: string;
    description: string;
    url: string;
    ogImage: string;
  };
  nav: NavItem[];
  hero: HeroData;
  about: AboutData;
  skills: SkillCategory[];
  projects: ProjectItem[];
  experience: ExperienceItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  achievements: AchievementItem[];
  involvement: InvolvementItem[];
  contact: ContactData;
};

export const portfolioData = portfolioJson as unknown as PortfolioData;
