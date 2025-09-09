import { GraduationCap, UserCheck, BookOpen } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { AvatarFall } from "@/helpers/AvatarFallback"
import  AssignSecretaryDialog  from "@/components/AssignSecretaryDialog"

import { GradeLevel } from "@/types/gradeLevel"

interface GradeLevelAccordionProps {
  grade: GradeLevel
}

export const GradeLevelAccordion = ({ grade }: GradeLevelAccordionProps) => {
  return (
    <AccordionItem key={grade.id} value={grade.id}>
      <Card className="mt-3">
        {/* Grade Header */}
        <div className="flex items-center justify-between pl-6 pb-6 border-b">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <CardTitle className="text-xl">{grade.name}</CardTitle>
              <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                <span>{grade.sections.length} sections</span>
                <span> • </span>
                <span>
                  {grade.sections.reduce((acc, sec) => acc + sec.studentsCount, 0)} students
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 mr-5">
            <Badge variant="outline" className="text-sm">
              {grade.name}
            </Badge>
            <AccordionTrigger className="w-8 h-8 flex items-center justify-center rounded-md cursor-pointer bg-white border transition">
              <span className="sr-only">Toggle</span>
            </AccordionTrigger>
          </div>
        </div>

        {/* Sections */}
        <AccordionContent className="pt-0 ml-6 p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {grade.sections.map((section) => (
            <Card key={section.id} className="border-l-4 border-l-green-500">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{section.name}</CardTitle>
                  <Badge className="text-md">{section.studentsCount} students</Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <Label className="text-sm font-medium mb-2 block">Section Adviser</Label>

                {section.adviser ? (
                  <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-md">
                    <AvatarFall />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{section.adviser.name}</p>
                      <p className="text-xs text-muted-foreground">{section.adviser.email}</p>
                    </div>
                  </div>
                ) : (
                  <AssignSecretaryDialog
                    trigger={
                      <div className="flex items-center gap-2 p-3 rounded-lg border border-dashed text-muted-foreground cursor-pointer hover:bg-gray-200 transition">
                        <UserCheck className="w-5 h-5" />
                        <div>
                          <p className="text-xs text-red-500 italic">
                            No adviser assigned to this section yet.
                          </p>
                          <span className="text-xs cursor-pointer underline">Assign Adviser</span>
                        </div>
                      </div>
                    }
                    title={`Assign Adviser for ${section.name}`}
                    description={`Select an adviser to manage ${section.name}`}
                  />
                )}

                <Button className='cursor-pointer w-full flex-1' variant="default" size="sm">

                    <BookOpen/>
                    Manage {section.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </AccordionContent>
      </Card>
    </AccordionItem>
  )
}
