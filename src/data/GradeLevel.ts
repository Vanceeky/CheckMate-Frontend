// mock/highSchoolElementary.ts
import { GradeLevel } from "@/types/gradeLevel"

export const mockGradeLevels: GradeLevel[] = [
  {
    id: "grade-1",
    name: "Grade 1",
    sections: [
      {
        id: "section-a",
        name: "Section A",
        studentsCount: 50,
        adviser: {
          id: "adviser-1",
          name: "James Ivan Mingarine",
          email: "james@springfield",
          role: "Adviser",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b5b1b2ff?w=150&h=150&fit=crop&crop=face",
 
        },
      },
      {
        id: "section-b",
        name: "Section B",
        studentsCount: 30,
        adviser: null,
      },
    ],
  },
  {
    id: "grade-2",
    name: "Grade 2",
    sections: [
      {
        id: "section-a",
        name: "Section A",
        studentsCount: 40,
        adviser: {
          id: "adviser-2",
          name: "Maria Santos",
          email: "maria@springfield",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b5b1b2ff?w=150&h=150&fit=crop&crop=face",
        
          role: "Adviser",
        },

      },
    ],
  },
]
