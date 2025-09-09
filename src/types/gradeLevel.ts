import { User } from "./user";

export interface Section {
  id: string
  name: string
  studentsCount: number
  adviser?: User | null
}

export interface GradeLevel {
  id: string
  name: string
  sections: Section[]
}