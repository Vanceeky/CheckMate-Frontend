"use client"

import * as React from "react"
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconBuildings,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
  IconUser,
  IconChalkboard
} from "@tabler/icons-react"

import { Building } from "lucide-react";

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { useUser } from "@/context/UserContext";



const BASE_PATHS = {
  SUPERADMIN: "/checkmate-super",
  INSTITUTION_HEAD: "/checkmate-institution",
  ADVISER: "/checkmate-teacher",
  STUDENT: "/checkmate-student",
  INSTRUCTOR: "/checkmate-instructor",
  SECRETARY: "/department-secretary",
} as const;

export const NAV_CONFIG: Record<Role, any> = {
  SUPERADMIN: {
    navMain: [
      { title: "Dashboard", url: `${BASE_PATHS.SUPERADMIN}/`, icon: IconDashboard },
      { title: "Institutions", url: `${BASE_PATHS.SUPERADMIN}/institutions`, icon: IconBuildings },
      { title: "Analytics", url: `${BASE_PATHS.SUPERADMIN}/analytics`, icon: IconChartBar },
      { title: "Projects", url: `${BASE_PATHS.SUPERADMIN}/projects`, icon: IconFolder },
    ],
    navSecondary: [
      { title: "Settings", url: `${BASE_PATHS.SUPERADMIN}/settings`, icon: IconSettings },
      { title: "Get Help", url: "#", icon: IconHelp },
    ],
    documents: [
      { name: "Documents", url: `${BASE_PATHS.SUPERADMIN}/documents`, icon: IconFileDescription },
    ],
  },

  INSTITUTION_HEAD: {
    navMain: [
      { title: "Dashboard", url: `${BASE_PATHS.INSTITUTION_HEAD}/`, icon: IconDashboard },
      { title: "Manage Institution", url: `${BASE_PATHS.INSTITUTION_HEAD}/manage`, icon: IconBuildings },
      { title: "Faculty", url: `${BASE_PATHS.INSTITUTION_HEAD}/faculty`, icon: IconUser },
      { title: "Students", url: `${BASE_PATHS.INSTITUTION_HEAD}/students`, icon: IconUsers },
    ],
    navSecondary: [
      { title: "Settings", url: `${BASE_PATHS.INSTITUTION_HEAD}/settings`, icon: IconSettings },
    ],
  },

  INSTRUCTOR: {
    navMain: [
      { title: "Dashboard", url: `${BASE_PATHS.INSTRUCTOR}/`, icon: IconDashboard },
      { title: "Classes", url: `${BASE_PATHS.INSTRUCTOR}/classes`, icon: IconChalkboard },
      { title: "Exams", url: `${BASE_PATHS.INSTRUCTOR}/exams`, icon: IconFileDescription },
      { title: "Grades", url: `${BASE_PATHS.INSTRUCTOR}/grades`, icon: IconChartBar },
    ],
    navSecondary: [
      { title: "Settings", url: `${BASE_PATHS.INSTRUCTOR}/settings`, icon: IconSettings },
    ],
  },

  ADVISER: {
    navMain: [
      { title: "Dashboard", url: `${BASE_PATHS.ADVISER}/`, icon: IconDashboard },
      { title: "Classes", url: `${BASE_PATHS.ADVISER}/classes`, icon: IconChalkboard },
      { title: "Exams", url: `${BASE_PATHS.ADVISER}/exams`, icon: IconFileDescription },
      { title: "Grades", url: `${BASE_PATHS.ADVISER}/grades`, icon: IconChartBar },
    ],
    navSecondary: [
      { title: "Settings", url: `${BASE_PATHS.ADVISER}/settings`, icon: IconSettings },
    ],
  },

  STUDENT: {
    navMain: [
      { title: "Dashboard", url: `${BASE_PATHS.STUDENT}/`, icon: IconDashboard },
      { title: "My Exams", url: `${BASE_PATHS.STUDENT}/exams`, icon: IconFileDescription },
      { title: "Results", url: `${BASE_PATHS.STUDENT}/results`, icon: IconChartBar },
    ],
    navSecondary: [
      { title: "Profile", url: `${BASE_PATHS.STUDENT}/profile`, icon: IconUser },
      { title: "Settings", url: `${BASE_PATHS.STUDENT}/settings`, icon: IconSettings },
    ],
  },

  SECRETARY: {
    navMain: [
      { title: "Dashboard", url: `${BASE_PATHS.SECRETARY}/`, icon: IconDashboard },
    ],
    navSecondary: [
      { title: "Settings", url: `${BASE_PATHS.SECRETARY}/settings`, icon: IconSettings },
    ],
  },
};


type Role = "SUPERADMIN" | "INSTITUTION_HEAD" | "ADVISER" | "STUDENT" | "INSTRUCTOR" | "SECRETARY"

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();
  console.log(user)

  if (!user) return null;

  const nav = NAV_CONFIG[user.role as Role];

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Checkmate</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={nav.navMain} />
        {nav.documents && <NavDocuments items={nav.documents} />}
        <NavSecondary items={nav.navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser
          user={{
            name: user.name || user.username,
            email: user.email,
            avatar: user.avatar,
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
