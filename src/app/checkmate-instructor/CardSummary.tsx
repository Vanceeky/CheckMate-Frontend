import React from "react"
import { Card, CardContent } from "@/components/ui/card"

interface CardSummaryProps {
  title: string
  value: string | number
  icon: React.ElementType // Better than 'any'
  color?: string
}

const CardSummary = ({ title, value, icon: Icon, color = "text-blue-500" }: CardSummaryProps) => {
  return (
    <Card className="h-auto p-2 bg-transparent">
      <CardContent className="">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-semibold">{value}</p>
          </div>
          <Icon className={`w-8 h-8 ${color}`} />
        </div>
      </CardContent>
    </Card>
  )
}

export default CardSummary
