
export interface InstituteProps {
    id: string,
    institutionName: string,
    email: string,
    type: 'university' | 'school' | 'academy' | 'college',
    contactNumber: string,
    students: number,
    teachers: number,
    status: 'active' | 'inactive'
    address?: string,
    description?: string
}
