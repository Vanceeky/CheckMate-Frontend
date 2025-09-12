// AnswersCard.tsx


"use client";
import React from "react"
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Hash,
  Users,
  Calendar,
  Clock,
  Eye,
  Copy,
  Edit,
  FileText,
  ListChecks,
  CheckSquare,
} from "lucide-react"

const examPartIcons: Record<string, React.ElementType> = {
  MultipleChoice: ListChecks,
  TrueFalse: CheckSquare,
  Essay: FileText,
}

import { AnswerKey } from "@/types/AnswerKey"

import { statusColors, termColors } from "@/helpers/badgeColors";


interface AnswersCardProps {
  answerKey: AnswerKey
  onView?: (data: AnswerKey) => void
  onDuplicate?: (data: AnswerKey) => void
  onEdit?: (data: AnswerKey) => void
}

const AnswersCard = ({ answerKey, onView, onDuplicate, onEdit }: AnswersCardProps) => {
  const router = useRouter();

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
              {answerKey.subject}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {answerKey.schoolYear}
            </p>
          </div>
        <Badge className={statusColors[answerKey.status] || "bg-gray-400 text-white"}>
        {answerKey.status}
        </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
        <Badge
        className={termColors[answerKey.examType] || "bg-gray-300 text-black"}
        variant="secondary"
        >
        {answerKey.examType}
        </Badge>
          <span className="text-sm text-muted-foreground">
            {answerKey.semester}
          </span>
        </div>

        {/* Exam Parts Preview */}
        <div className="space-y-2">
          <div className="text-sm font-medium">Exam Sections:</div>
            <div className="flex flex-wrap gap-1">
                {answerKey.parts.slice(0, 3).map((part) => {
                const Icon = examPartIcons[part.type] || FileText
                return (
                    <div
                    key={part.id}
                    className="flex items-center gap-1 px-2 py-1 bg-muted/50 rounded text-xs"
                    >
                    <Icon className="w-3 h-3" />
                    {part.type}
                    <span className="text-muted-foreground">
                        ({part.questions.length})
                    </span>
                    </div>
                )
                })}
                {answerKey.parts.length > 3 && (
                <div className="px-2 py-1 bg-muted/50 rounded text-xs text-muted-foreground">
                    +{answerKey.parts.length - 3} more
                </div>
                )}
            </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Hash className="w-4 h-4 text-muted-foreground" />
              <span>
                {answerKey.parts.reduce(
                  (total, part) => total + part.questions.length,
                  0
                )}{" "}
                questions
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span>
                {answerKey.parts.reduce(
                  (total, part) =>
                    total + part.questions.reduce((sum, q) => sum + q.points, 0),
                  0
                )}{" "}
                points
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            Created {answerKey.createdDate}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Modified {answerKey.lastModified}
          </div>
        </div>

        <div className="flex gap-2 pt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            console.log(answerKey);
                // Save the answerKey in sessionStorage
            sessionStorage.setItem('answerKey', JSON.stringify(answerKey));
            router.push(`/checkmate-instructor/exams/${answerKey.id}`);
          }}
          className="flex-1 gap-2"
        >
          View Answer Key
        </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onDuplicate?.(answerKey)}
            className="gap-2"
          >
            <Copy className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit?.(answerKey)}
            className="gap-2"
          >
            <Edit className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default AnswersCard
