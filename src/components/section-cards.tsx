import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type StatCardProps = {
  title: string
  value: number | string
  trendValue: string
  footerMain: string
  Icon: React.ElementType
}

export function StatCard({
  title,
  value,
  trendValue,
  footerMain,
  Icon,
}: StatCardProps) {
  return (
    <Card className="@container/card" data-slot="card">
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {value}
        </CardTitle>
        <CardAction>
          <Badge variant="outline">
            <Icon />
            {trendValue}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          {footerMain} <Icon className="size-4" />
        </div>
      </CardFooter>
    </Card>
  )
}

export function SectionCards() {
  const stats = [
    {
      title: "Total Institutions",
      value: "12",
      trendValue: "+12.5%",
      footerMain: "Active Educational Institutions",
      Icon: IconTrendingUp,
    },
    {
      title: "Total Teachers",
      value: "156",
      trendValue: "-20%",
      footerMain: "Registered Teachers across all Institutions",
      Icon: IconTrendingDown,
    },
    {
      title: "Total Students",
      value: "2,500",
      trendValue: "+12.5%",
      footerMain: "Enrolled students system-wide",
      Icon: IconTrendingUp,
    },
    {
      title: "Exams Processed",
      value: "48",
      trendValue: "+4.5%",
      footerMain: "Total Exams Processed",

      Icon: IconTrendingUp,
    },
  ]

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {stats.map((stat, idx) => (
        <StatCard key={idx} {...stat} />
      ))}
    </div>
  )
}
