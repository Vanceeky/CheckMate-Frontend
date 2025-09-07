import { Department } from "@/types/department";

 export const departments: Department[] = [
    {
      id: "1",
      name: "College of Information and Computing Studies",
      description: "Modern computing, programming, and software development curriculum",
      coursesCount: 2,
      studentsCount: 145,
      secretary: undefined,
    },
    {
      id: "2",
      name: "College of Maritime Education",
      description: "Pure and applied mathematics with focus on problem-solving skills",
      coursesCount: 2,
      studentsCount: 250,
      secretary: undefined,
    },
    {
      id: "3",
      name: "College of Nursing",
      description: "Theoretical and experimental physics covering classical and modern topics",
      coursesCount: 10,
      studentsCount: 76,
      secretary: {
        id: "3",
        name: "Maria Rodriguez",
        email: "m.rodriguez@springfield.edu",
        role: "Secretary",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b5b1b2ff?w=150&h=150&fit=crop&crop=face",
      },
    },
    {
      id: "4",
      name: "College of Engineering",
      description: "Comprehensive engineering program with multiple specializations",
      coursesCount: 15,
      studentsCount: 198,
      secretary: undefined,
    },

  ];