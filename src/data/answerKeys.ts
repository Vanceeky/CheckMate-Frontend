const dummyAnswerKeys = [
  {
    id: 1,
    title: "Computer Science Fundamentals",
    course: "BSIT-3A • 2023-2024",
    status: "Published",
    semester: "1st Semester",
    term: "Midterm",
    parts: [
      { id: "p1", type: "MultipleChoice", questions: Array(10).fill({}) },
      { id: "p2", type: "TrueFalse", questions: Array(5).fill({}) },
      { id: "p3", type: "Essay", questions: Array(2).fill({}) },
    ],
    questionsCount: 17,
    totalPoints: 50,
    createdDate: "2023-10-01",
    lastModified: "2023-11-15",
  },
  {
    id: 2,
    title: "Data Structures and Algorithms",
    course: "BSIT-3B • 2023-2024",
    status: "Draft",
    semester: "2nd Semester",
    term: "Finals",
    parts: [
      { id: "p1", type: "MultipleChoice", questions: Array(20).fill({}) },
      { id: "p2", type: "Essay", questions: Array(5).fill({}) },
    ],
    questionsCount: 25,
    totalPoints: 100,
    createdDate: "2023-12-10",
    lastModified: "2023-12-20",
  },
]

export default dummyAnswerKeys