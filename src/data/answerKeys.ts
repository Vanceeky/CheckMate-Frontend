
import { AnswerKey }  from "@/types/AnswerKey";

export const mockAnswerKeys: AnswerKey[] = [
      {
      id: "ak1",
      subject: "Computer Science Fundamentals",
      examType: "Midterm",
      schoolYear: "2023-2024",
      semester: "1st Semester",
      status: "Published",
      createdDate: "2024-01-15",
      lastModified: "2024-01-16",
      parts: [
        {
          id: "p1",
          type: "Identification",
          questions: [
            { id: "q1", number: "Q1", points: 2, answer: "Algorithm" },
            { id: "q2", number: "Q2", points: 2, answer: "Data Structure" },
            { id: "q3", number: "Q3", points: 1, answer: "Binary Tree" },
          ]
        },

      ]
    },
    {
      id: "ak2",
      subject: "Database Systems",
      examType: "Finals",
      schoolYear: "2023-2024",
      semester: "1st Semester",
      status: "Draft",
      createdDate: "2024-01-10",
      lastModified: "2024-01-12",
      parts: [
         {
          id: "p1",
          type: "Identification",
          questions: [
            { id: "q1", number: "Q1", points: 2, answer: "Algorithm" },
            { id: "q2", number: "Q2", points: 2, answer: "Data Structure" },
            { id: "q3", number: "Q3", points: 1, answer: "Binary Tree" },
          ]
        },
        {
          id: "p3",
          type: "True/False",
          questions: [
            { id: "q6", number: "Q1", points: 1, answer: "True" },
            { id: "q7", number: "Q2", points: 1, answer: "False" },
          ]
        },

      ]
    },
    {
      id: "ak3",
      subject: "Web Development",
      examType: "Prelim",
      schoolYear: "2023-2024",
      semester: "2nd Semester",
      status: "Published",
      createdDate: "2024-01-08",
      lastModified: "2024-01-09",
      parts: [
        {
          id: "p5",
          type: "Enumeration",
          questions: [
            { id: "q9", number: "Q1", points: 5, answer: "HTML, CSS, JavaScript, React, Node.js" },
            { id: "q10", number: "Q2", points: 3, answer: "GET, POST, PUT" },
          ]
        }
      ]
    },
]
