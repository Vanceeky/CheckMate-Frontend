import { User } from "./user";

export interface Department {
    id: string;
    name: string,
    description?: string,
    secretary?: User,
    coursesCount: number,
    studentsCount: number,
}
