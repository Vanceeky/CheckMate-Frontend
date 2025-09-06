"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean) // remove empty

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />

        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1 text-sm text-muted-foreground">
          {segments.map((segment, index) => {
            const href = "/" + segments.slice(0, index + 1).join("/")
            const isLast = index === segments.length - 1
            const label =
              segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ")

            return (
              <div key={href} className="flex items-center gap-1">
                {!isLast ? (
                  <Link href={href} className="hover:underline">
                    {label}
                  </Link>
                ) : (
                  <span className="text-foreground font-medium">{label}</span>
                )}
                {!isLast && <span>/</span>}
              </div>
            )
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <a
              href="https://github.com/shadcn-ui/ui/tree/main/apps/v4/app/(examples)/dashboard"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground"
            >
              How to use
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}
