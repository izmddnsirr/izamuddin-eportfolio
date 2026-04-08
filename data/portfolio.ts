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
};

export type ExperienceItem = {
  company: string;
  role: string;
  duration: string;
  responsibilities: string[];
};

export type EducationItem = {
  institution: string;
  degree: string;
  year: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type ContactData = {
  email: string;
  socials: SocialLink[];
};

export const portfolioData = {
  site: {
    title: "Izamuddin Nasir - Personal ePortfolio",
    description:
      "Software Engineering student at UTHM with hands-on experience in full-stack web and mobile development using Next.js, React Native, and Supabase.",
    url: "https://example.com",
    ogImage: "/projects/wellside.svg",
  },
  nav: [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Contact" },
  ] satisfies NavItem[],
  hero: {
    fullName: "Muhamad Izamuddin",
    role: "Software Engineering Student",
    tagline: "Building scalable, user-centric web and mobile applications.",
    summary:
      "Hands-on experience in full-stack development using Next.js, React Native, and Supabase. Bronze Medalist at MIIX 2024. Seeking internship from August 2026.",
    ctaPrimary: {
      label: "View Projects",
      targetId: "projects",
    },
    ctaSecondary: {
      label: "Download CV",
      href: "/cv.pdf",
    },
  } satisfies HeroData,
  about: {
    profileImage: "/profile-placeholder.svg",
    bio: "I am a Software Engineering student at Universiti Tun Hussein Onn Malaysia, passionate about crafting web and mobile applications that solve real-world problems. Skilled in building scalable, user-centric applications and awarded Bronze Medal at MIIX 2024 for IoT innovation.",
    stats: [
      { label: "CGPA", value: "3.71" },
      { label: "Projects", value: "2+" },
      { label: "Certifications", value: "3" },
      { label: "Award", value: "MIIX 2024" },
    ],
  } satisfies AboutData,
  skills: [
    {
      category: "Programming",
      skills: ["JavaScript", "Python"],
    },
    {
      category: "Frameworks",
      skills: ["Next.js", "React Native", "Expo", "Flutter"],
    },
    {
      category: "Database",
      skills: ["MySQL", "PostgreSQL", "Supabase", "Firebase"],
    },
    {
      category: "Tools & Concepts",
      skills: [
        "Git",
        "GitHub",
        "XAMPP",
        "Agile Development",
        "UML",
        "System Design",
      ],
    },
  ] satisfies SkillCategory[],
  projects: [
    {
      title: "Wellside+",
      year: 2025,
      category: "Web",
      categories: ["Web", "Mobile"],
      image: "/projects/wellside.svg",
      description:
        "A mobile booking and web-based management system for Wellside Barbershop, covering appointments, services, inventory, and transactions.",
      techStack: ["Next.js", "Expo", "React Native", "Supabase"],
      githubUrl: "https://github.com/izamuddinnasir/wellside",
      liveUrl: "https://wellside.xyz",
    },
    {
      title: "Personal ePortfolio",
      year: 2026,
      category: "Web",
      image: "/projects/eportfolio.svg",
      description:
        "A personal ePortfolio website showcasing projects, skills, and experience. Built with Next.js App Router, Tailwind CSS, and shadcn/ui with dark mode support.",
      techStack: ["Next.js", "Tailwind CSS", "shadcn/ui", "TypeScript"],
      githubUrl: "https://github.com/izamuddinnasir/izamuddin-eportfolio",
      liveUrl: "",
    },
    {
      title: "WindowSense",
      year: 2023,
      category: "IoT",
      categories: ["IoT", "Mobile"],
      image: "/projects/windowsense.svg",
      description:
        "An IoT smart window system with Arduino hardware, Flutter mobile app, and Firebase real-time database.",
      techStack: ["Flutter", "Firebase", "Arduino", "IoT"],
      githubUrl: "https://github.com/izamuddinnasir/windowsense",
      liveUrl: "https://publisher.uthm.edu.my/periodicals/index.php/mari/article/view/12429",
    },
    {
      title: "TaskFlow Lite (Dummy)",
      category: "Mobile",
      image: "/projects/project-nova.svg",
      description:
        "A lightweight productivity app concept for tracking daily tasks, reminders, and focus sessions with a clean mobile-first experience.",
      techStack: ["React Native", "Expo", "TypeScript"],
      githubUrl: "https://github.com/izamuddinnasir/taskflow-lite",
      liveUrl: "",
    },
  ] satisfies ProjectItem[],
  experience: [
    {
      company: "Zafran Resources Sdn. Bhd.",
      role: "Frontend Developer Intern",
      duration: "Jul 2023 – Jan 2024",
      responsibilities: [
        "Led a team of 3 IT interns as Team Leader, coordinating task delegation and ensuring on-time delivery of project milestones.",
        "Contributed as Frontend Developer for the Death Benefit (Khairat Kematian) Management System (Web).",
        "Developed responsive web interfaces using Bootstrap 5, improving cross-device usability for end users.",
        "Managed and optimized MySQL database using XAMPP, supporting reliable data operations for the system.",
        "Collaborated with cross-functional teams to meet project goals and deliver impact.",
      ],
    },
  ] satisfies ExperienceItem[],
  education: [
    {
      institution: "Universiti Tun Hussein Onn Malaysia",
      degree:
        "Bachelor of Computer Science (Software Engineering) with Honours",
      year: "Mar 2024 – Present | CGPA: 3.71",
    },
    {
      institution: "Universiti Tun Hussein Onn Malaysia",
      degree: "Diploma in Information Technology",
      year: "Aug 2021 – Jan 2024 | CGPA: 3.29",
    },
  ] satisfies EducationItem[],
  contact: {
    email: "izamuddinasir@gmail.com",
    socials: [
      { label: "GitHub", href: "https://github.com/izamuddinnasir" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/izamuddinnasir" },
      { label: "Email", href: "mailto:izamuddinasir@gmail.com" },
      { label: "Threads", href: "https://www.threads.net/@izamuddinnasir" },
    ],
  } satisfies ContactData,
} as const;
