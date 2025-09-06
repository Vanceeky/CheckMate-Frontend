import { InstituteProps } from "@/types/institute";

export const institutes: InstituteProps[] = [
  {
    id: "1",
    institutionName: "National University",
    email: "nu@example.com",
    type: "university",
    contactNumber: "0987654321",
    students: 12000,
    teachers: 500,
    status: "active",
  },
  {
      id: "2",
      institutionName: "Greenfield College",
      email: 'greenfield@example.com',
      type: "college",
      contactNumber: "0987654321",
      students: 3500,
      teachers: 120,
      status: "active",
  },
  {
    id: "3",
    institutionName: "Riverdale High School",
    email: "riverdale@example.com",
    type: "school",
    contactNumber: "0987654321",
    students: 850,
    teachers: 45,
    status: "inactive",
  },
  {
    id: "4",
    institutionName: "Bright Minds Academy",
    email: "brightminds@example.com",
    type: "academy",
    contactNumber: "0987654321",
    students: 600,
    teachers: 30,
    status: "active",
  },
];