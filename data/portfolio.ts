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
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ] satisfies NavItem[],
  hero: {
    fullName: "Muhamad Izamuddin",
    role: "Software Engineer",
    tagline: "Building scalable, user-centric web and mobile applications.",
    summary:
      "Hands-on experience in full-stack web and mobile development using Next.js, React Native with Expo, SwiftUI, and Supabase, with practical exposure to generative AI via AWS Bedrock. Winner of the VIBE Hackathon 2026 and Bronze Medalist at MIIX 2024. Seeking industrial training from 3 August 2026 to 15 January 2027.",
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
    bio: "I’m a Software Engineering student at Universiti Tun Hussein Onn Malaysia with a strong passion for developing web and mobile applications that address real-world challenges. I enjoy working across the full stack — from Next.js and React Native with Expo to SwiftUI — and am increasingly interested in cloud technologies. I have practical exposure to generative AI integration via AWS Bedrock, and I also utilize AI tools like Claude Code to enhance my productivity and build solutions more efficiently.",
    stats: [
      { label: "CGPA", value: "3.71" },
      { label: "Projects", value: "2+" },
      { label: "Certifications", value: "4" },
      { label: "Awards", value: "VIBE 2026 + MIIX 2024" },
    ],
  } satisfies AboutData,
  skills: [
    {
      category: "Programming",
      skills: ["JavaScript", "TypeScript", "Python"],
    },
    {
      category: "Frameworks",
      skills: ["Next.js", "React Native", "Expo", "Flutter", "SwiftUI"],
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
        "AWS Bedrock",
        "AWS S3",
        "XAMPP",
        "Agile Development",
        "UML",
        "System Design",
        "API Integration",
      ],
    },
  ] satisfies SkillCategory[],
  projects: [
    {
      title: "MyPass",
      year: 2026,
      featured: true,
      category: "Mobile",
      image: "/projects/mypass.svg",
      description:
        "A GovTech concept prototype in SwiftUI exploring a unified digital identity and public services ecosystem for Malaysia, inspired by Singapore's Singpass. Features QR-based verification, digital signing, healthcare records, transport services, subsidy management, and privacy controls.",
      techStack: ["SwiftUI", "iOS"],
      githubUrl: "https://github.com/izmddnsirr/mypass",
      liveUrl: "",
      images: [
        "/projects/mypass/1.PNG",
        "/projects/mypass/2.PNG",
        "/projects/mypass/3.PNG",
        "/projects/mypass/4.PNG",
        "/projects/mypass/5.PNG",
        "/projects/mypass/6.PNG",
        "/projects/mypass/7.PNG",
        "/projects/mypass/8.PNG",
        "/projects/mypass/9.PNG",
        "/projects/mypass/10.PNG",
        "/projects/mypass/11.PNG",
      ],
      details: `MyPass is a concept prototype that envisions what a unified digital identity platform for Malaysia could look like — similar to Singapore's Singpass ecosystem.

**The Idea**
Malaysia currently lacks a single, cohesive digital identity infrastructure. MyPass explores how citizens could access government services, verify their identity, sign documents digitally, and manage personal data all from one app.

**Features Designed**
- **Digital Identity** — IC-equivalent digital ID with QR-based verification for physical check-ins
- **Digital Signing** — Sign legal documents and forms electronically
- **Healthcare Records** — Access medical history, prescriptions, and appointments
- **Transport Services** — View summons, renew road tax, access public transit passes
- **Subsidy Management** — Track and claim government subsidies and aid programmes
- **Emergency Tools** — SOS features and emergency contact integration
- **Privacy Controls** — Granular permission settings for data sharing with third parties

**Tech & Design**
Built entirely in SwiftUI for iOS, with emphasis on scalability, accessibility, security, and ecosystem integration. The prototype simulates real user flows with mock data to demonstrate feasibility.`,
    },
    {
      title: "Wellside+",
      year: 2026,
      featured: true,
      category: "Web",
      categories: ["Web", "Mobile"],
      image: "/projects/wellside.svg",
      description:
        "A full-stack mobile booking and web-based management system for Wellside Barbershop, covering appointments, services, inventory, and transactions. Includes an AI Hairstyle Suggestion module powered by AWS Bedrock (Claude Sonnet) and AWS S3.",
      techStack: ["Next.js", "Expo", "React Native", "Supabase", "AWS Bedrock", "AWS S3"],
      githubUrl: "https://github.com/izmddnsirr/wellside-app",
      liveUrl: "https://wellside.xyz",
      images: [
        "/projects/wellside/1.PNG",
        "/projects/wellside/3.PNG",
        "/projects/wellside/4.PNG",
        "/projects/wellside/5.PNG",
        "/projects/wellside/6.PNG",
        "/projects/wellside/9.PNG",
        "/projects/wellside/10.PNG",
        "/projects/wellside/11.PNG",
        "/projects/wellside/12.PNG",
        "/projects/wellside/13.PNG",
        "/projects/wellside/14.PNG",
        "/projects/wellside/15.PNG",
      ],
      details: `Wellside+ is a full-stack system built to digitise and streamline daily operations for Wellside Barbershop. The project was developed as part of a software engineering coursework and covers two platforms — a web-based admin dashboard and a customer-facing mobile app.

**Web (Next.js + Supabase)**
The admin panel allows barbershop staff to manage bookings, track service records, monitor inventory levels, and record in-venue payments. Role-based access control ensures that only authorised users can access sensitive data.

**Mobile (Expo + React Native)**
Customers can browse services, book appointments, and view their booking history. The app is designed for a smooth, native-feeling experience on both iOS and Android.

**AI Hairstyle Suggestion**
A standout feature of the mobile app is the AI-powered hairstyle recommendation module. Customers upload a photo, and the system uses AWS Bedrock (Claude Sonnet) and AWS S3 to analyse facial features and suggest suitable hairstyles — personalising the barbershop experience.

**Architecture**
The system uses Supabase as the backend for authentication, real-time database, and storage. Agile development methodology and UML modelling were applied throughout the project lifecycle.`,
    },
    {
      title: "WindowSense",
      year: 2026,
      category: "IoT",
      categories: ["IoT", "Mobile"],
      image: "/projects/windowsense.svg",
      description:
        "An IoT smart window system with Arduino hardware, Flutter mobile app, and Firebase real-time database.",
      techStack: ["Flutter", "Firebase", "Arduino", "IoT"],
      githubUrl: "https://github.com/izmddnsirr/windowsense",
      liveUrl:
        "https://publisher.uthm.edu.my/periodicals/index.php/mari/article/view/12429",
      images: [],
      details: `WindowSense is an IoT-based smart window system that automatically adjusts based on real-time environmental conditions such as temperature, humidity, and rain detection.

**How It Works**
Arduino sensors continuously monitor the environment. When conditions cross a threshold (e.g. rain detected, temperature too high), the system triggers the window motor to open or close automatically. Users can also override the system manually through the mobile app.

**Mobile App (Flutter)**
The Flutter app provides a real-time dashboard showing live sensor readings and window status. Users can toggle manual/automatic mode and set custom thresholds for each environmental parameter.

**Firebase Integration**
Firebase Realtime Database serves as the communication bridge between the Arduino hardware and the mobile app — enabling instant, bidirectional data sync without polling.

**Recognition**
WindowSense was showcased at the **Malaysia Invention & Innovation Expo (MIIX) 2024**, where it was awarded the **Bronze Medal** in the Intermediate Innovator category, representing UTHM at a national-level innovation competition. It was also published in a UTHM periodical.`,
    },
    {
      title: "Personal ePortfolio",
      year: 2026,
      category: "Web",
      image: "/projects/eportfolio.svg",
      description:
        "A personal ePortfolio website showcasing projects, skills, and experience. Built with Next.js App Router, Tailwind CSS, and shadcn/ui with dark mode support.",
      techStack: ["Next.js", "Tailwind CSS", "shadcn/ui", "TypeScript"],
      githubUrl: "https://github.com/izmddnsirr/izamuddin-eportfolio",
      liveUrl: "https://main.d24q22mpnmov8d.amplifyapp.com/",
      images: [],
      details: `This site — the one you're viewing right now — is itself one of my projects. Built as a personal brand and showcase platform, it reflects my current skills in modern frontend development.

**Stack**
- **Next.js App Router** for server-side rendering and routing
- **TypeScript** for type safety across all components and data
- **Tailwind CSS** for utility-first styling with dark mode support
- **shadcn/ui** for accessible, composable UI components
- **Framer Motion** for scroll-triggered animations and transitions
- **AWS Amplify** for CI/CD deployment — every push to main auto-deploys

**Design Decisions**
The portfolio is intentionally minimal — dark-first, single-page, with smooth scroll navigation. Interactive elements like the animated line waves, scrolling logo row, and tilt-effect profile card add personality without sacrificing performance.

**Data-driven**
All content (projects, skills, experience, certifications) is managed from a single \`data/portfolio.ts\` file, making it easy to keep the site in sync with my resume.`,
    },
  ] satisfies ProjectItem[],
  experience: [
    {
      company: "Zafran Resources Sdn. Bhd.",
      role: "Frontend Developer Intern",
      duration: "Jul 2023 – Jan 2024",
      durationLength: "6 months",
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
  certifications: [
    {
      name: "AWS Academy Cloud Foundations",
      issuer: "Amazon Web Services",
      issuerLogo: "aws",
      date: "May 2026",
      status: "In Progress",
    },
    {
      name: "AWS AI Practitioner Challenge",
      issuer: "Amazon Web Services",
      issuerLogo: "aws",
      date: "Apr 2026",
      status: "In Progress",
    },
    {
      name: "Google IT Automation Professional Certificate",
      issuer: "Coursera",
      issuerLogo: "google",
      logoSize: 36,
      date: "Mar 2026",
      status: "In Progress",
    },
    {
      name: "CompTIA Data+",
      issuer: "Yayasan Peneraju",
      issuerLogo: "comptia",
      date: "Feb 2026",
      status: "In Progress",
    },
  ] satisfies CertificationItem[],
  achievements: [
    {
      title: "Gold Medalist – International Research and Innovation Symposium Competition (RISE) 2026",
      description: "Awarded Gold Medal for an innovative product showcase at RISE 2026, an IHL innovation exhibition hosted by Universiti Tun Hussein Onn Malaysia.",
      year: 2026,
      hidden: true,
    },
    {
      title: "Winner – Visionary Innovation in Bedrock Exploration (VIBE) Hackathon 2026",
      description: "Won a GenAI and Prompt Engineering hackathon with AWS Bedrock, building AI solutions to enhance productivity and campus life.",
      year: 2026,
    },
    {
      title: "Dean's List Award – Universiti Tun Hussein Onn Malaysia",
      description: "Four consecutive semesters of academic excellence in Software Engineering.",
      year: "2024 - 2026",
    },
    {
      title: "Bronze Medalist – Malaysia Invention & Innovation Expo (MIIX) 2024",
      description: "Awarded Bronze Medal (Intermediate Innovator) for \"WindowSense: A Smart Convenience Window\"",
      year: 2024,
    },
  ] satisfies AchievementItem[],
  involvement: [
    {
      role: "AI Facilitator, Protocol Committee Member & MC",
      event: "SULAM 2026: Level Up Your Skills",
      year: 2026,
      description:
        "Facilitated a hands-on session teaching Form 5 students how to build websites using Canva AI Code with effective prompt engineering techniques. Also served as AJK Protokol and MC for the program held at FSKTM, UTHM, in collaboration with SMK Dato' Haji Hasan Yunos.",
    },
    {
      role: "Media Committee Member & Flutter Facilitator",
      event: "OnnTutelage'25",
      year: 2025,
      description:
        "Managed event media documentation and conducted hands-on Flutter programming sessions for secondary school students as part of the digital upskilling initiative.",
    },
  ] satisfies InvolvementItem[],
  contact: {
    email: "izamuddinasir@gmail.com",
    socials: [
      { label: "GitHub", href: "https://github.com/izmddnsirr" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/izamuddinnasir" },
      { label: "Email", href: "mailto:izamuddinasir@gmail.com" },
      { label: "Threads", href: "https://www.threads.net/@izmddnsirr" },
    ],
  } satisfies ContactData,
} as const;
