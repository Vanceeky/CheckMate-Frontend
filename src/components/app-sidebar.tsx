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





// nav-config.ts
const BASE_PATHS = {
  superadmin: "/checkmate-super",
  institutionAdmin: "/checkmate-institution",
  teacher: "/checkmate-teacher",
  student: "/checkmate-student",
} as const

// Define navs per role
export const NAV_CONFIG: Record<string, any> = {
  superadmin: {
    navMain: [
      { title: "Dashboard", url: `${BASE_PATHS.superadmin}/`, icon: IconDashboard },
      { title: "Institutions", url: `${BASE_PATHS.superadmin}/institutions`, icon: IconBuildings },
      { title: "Analytics", url: `${BASE_PATHS.superadmin}/analytics`, icon: IconChartBar },
      { title: "Projects", url: `${BASE_PATHS.superadmin}/projects`, icon: IconFolder },
    ],
    navSecondary: [
      { title: "Settings", url: `${BASE_PATHS.superadmin}/settings`, icon: IconSettings },
      { title: "Get Help", url: "#", icon: IconHelp },
    ],
    documents: [
      { name: "Documents", url: `${BASE_PATHS.superadmin}/documents`, icon: IconFileDescription },
    ],
  },

  institutionAdmin: {
    navMain: [
      { title: "Dashboard", url: `${BASE_PATHS.institutionAdmin}/`, icon: IconDashboard },
      { title: "Manage Institution", url: `${BASE_PATHS.institutionAdmin}/manage`, icon: IconBuildings },
      { title: "Faculty", url: `${BASE_PATHS.institutionAdmin}/faculty`, icon: IconUser },
      { title: "Students", url: `${BASE_PATHS.institutionAdmin}/students`, icon: IconUsers },
    ],
    navSecondary: [
      { title: "Settings", url: `${BASE_PATHS.institutionAdmin}/settings`, icon: IconSettings },
    ],
  },

  teacher: {
    navMain: [
      { title: "Dashboard", url: `${BASE_PATHS.teacher}/`, icon: IconDashboard },
      { title: "Classes", url: `${BASE_PATHS.teacher}/classes`, icon: IconChalkboard },
      { title: "Exams", url: `${BASE_PATHS.teacher}/exams`, icon: IconFileDescription },
      { title: "Grades", url: `${BASE_PATHS.teacher}/grades`, icon: IconChartBar },
    ],
    navSecondary: [
      { title: "Settings", url: `${BASE_PATHS.teacher}/settings`, icon: IconSettings },
    ],
  },

  student: {
    navMain: [
      { title: "Dashboard", url: `${BASE_PATHS.student}/`, icon: IconDashboard },
      { title: "My Exams", url: `${BASE_PATHS.student}/exams`, icon: IconFileDescription },
      { title: "Results", url: `${BASE_PATHS.student}/results`, icon: IconChartBar },
    ],
    navSecondary: [
      { title: "Profile", url: `${BASE_PATHS.student}/profile`, icon: IconUser },
      { title: "Settings", url: `${BASE_PATHS.student}/settings`, icon: IconSettings },
    ],
  },
}


type Role = "superadmin" | "institutionAdmin" | "teacher" | "student"

export function AppSidebar({
  role = "institutionAdmin", // temporary default, later from auth/cookie
  ...props
}: { role?: Role } & React.ComponentProps<typeof Sidebar>) {
  const nav = NAV_CONFIG[role] // pick correct navs

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
        <NavUser user={{ name: "shadcn", email: "m@example.com", avatar: "/avatars/shadcn.jpg" }} />
      </SidebarFooter>
    </Sidebar>
  )
}
