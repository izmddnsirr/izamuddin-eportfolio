"use client";

import Link from "next/link";
import {
  SparklesIcon,
  UserIcon,
  WrenchIcon,
  FolderOpenIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  TrophyIcon,
  UsersIcon,
  MailIcon,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const sections = [
  { title: "Hero", description: "Name, role, tagline, summary", href: "/admin/hero", icon: SparklesIcon },
  { title: "About", description: "Bio, stats, profile image", href: "/admin/about", icon: UserIcon },
  { title: "Skills", description: "Skill categories and items", href: "/admin/skills", icon: WrenchIcon },
  { title: "Projects", description: "Project showcase entries", href: "/admin/projects", icon: FolderOpenIcon },
  { title: "Experience", description: "Work history", href: "/admin/experience", icon: BriefcaseIcon },
  { title: "Education", description: "Degrees and institutions", href: "/admin/education", icon: GraduationCapIcon },
  { title: "Achievements", description: "Awards and recognitions", href: "/admin/achievements", icon: TrophyIcon },
  { title: "Involvement", description: "Extra-curricular activities", href: "/admin/involvement", icon: UsersIcon },
  { title: "Contact", description: "Email and social links", href: "/admin/contact", icon: MailIcon },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Manage your portfolio content</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <Link key={section.title} href={section.href}>
            <Card className="transition-colors hover:bg-muted/50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <section.icon className="size-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{section.title}</CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
