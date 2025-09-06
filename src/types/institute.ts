
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

export interface CreateInstituteProps {
    institutionName: string,
    email: string,
    type: 'university' | 'school' | 'academy' | 'college',
    contactNumber: string,
    address?: string,
    description?: string
}