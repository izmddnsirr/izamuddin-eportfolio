"use client";

import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboardIcon,
  SparklesIcon,
  UserIcon,
  WrenchIcon,
  FolderOpenIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  TrophyIcon,
  UsersIcon,
  MailIcon,
  ExternalLinkIcon,
  LogOutIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const navItems = [
  { title: "Dashboard", href: "/admin", icon: LayoutDashboardIcon },
  { title: "Hero", href: "/admin/hero", icon: SparklesIcon },
  { title: "About", href: "/admin/about", icon: UserIcon },
  { title: "Skills", href: "/admin/skills", icon: WrenchIcon },
  { title: "Projects", href: "/admin/projects", icon: FolderOpenIcon },
  { title: "Experience", href: "/admin/experience", icon: BriefcaseIcon },
  { title: "Education", href: "/admin/education", icon: GraduationCapIcon },
  { title: "Achievements", href: "/admin/achievements", icon: TrophyIcon },
  { title: "Involvement", href: "/admin/involvement", icon: UsersIcon },
  { title: "Contact", href: "/admin/contact", icon: MailIcon },
];

export function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link href="/admin" />}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <LayoutDashboardIcon className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-medium">Portfolio Admin</span>
                <span className="text-xs text-muted-foreground">
                  Manage content
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-1">
            {navItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  render={<Link href={item.href} />}
                >
                  <item.icon className="size-4" />
                  {item.title}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton render={<Link href="/" target="_blank" />}>
                <ExternalLinkIcon className="size-4" />
                View Portfolio
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleLogout}>
                <LogOutIcon className="size-4" />
                Logout
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
