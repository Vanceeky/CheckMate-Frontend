export interface Teacher {
    id: string;
    name: string;
    email: string;
    teacherId: string;
    department: string;
    status: "active" | "inactive";
}