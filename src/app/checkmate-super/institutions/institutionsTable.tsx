import React from 'react'
import { Card, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableHead, TableHeader, TableRow, TableFooter, TableCell } from "@/components/ui/table"
import { Button } from '@/components/ui/button'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Search, Filter, MoreHorizontal } from 'lucide-react'

import { InstituteTypeBadge, StatusBadge } from '@/helpers/BadgeTypes'


// src/data/institutes.ts
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

const institutionsTable = () => {
  return (
    <Card className='mt-4 p-5'>


        <div className=''>
            <CardTitle className='mb-2'>All Institutions ({"12"})</CardTitle>
            <CardDescription>List of all educational institutions registered in the system</CardDescription>
        </div>


        <div className="flex flex-col sm:flex-row gap-3 max-w-5xl">

            <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                placeholder="Search by Institution Name"
                className="bg-transparent pl-10 w-full"
                />
            </div>

        {/* Filters */}
            <div className="flex flex-row sm:flex-row items-center gap-2 w-full sm:w-auto">
                <Filter className="h-5 w-5 text-muted-foreground hidden sm:block" />

                <Select>
            
                <SelectTrigger className="w-full sm:w-[190px]">
                    <SelectValue placeholder="Institution Type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="university">University</SelectItem>
                    <SelectItem value="college">College</SelectItem>
                    <SelectItem value="school">School</SelectItem>
                    <SelectItem value="academy">Academy</SelectItem>
                </SelectContent>
                </Select>

                <Select>
                    <SelectTrigger className="w-full sm:w-[140px]">
                        <SelectValue placeholder="Filter by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                </Select>



            </div>


        </div>


        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="">Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-center">Contact</TableHead>
                    <TableHead className="text-center">Students</TableHead>
                    <TableHead className="text-center">Teachers</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className=""></TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {institutes.map((inst) => (
                <TableRow>
                    <TableCell className="font-medium">{inst.institutionName}</TableCell>
                    <TableCell>  <InstituteTypeBadge type={inst.type} /></TableCell>
                    <TableCell className='text-center'>{inst.contactNumber}</TableCell>
                    <TableCell className='text-center'>{inst.students}</TableCell>
                    <TableCell className='text-center'>{inst.teachers}</TableCell>
                    <TableCell className='text-center'>  <StatusBadge status={inst.status} /></TableCell>
                    <TableCell>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className=" h-8 w-8 p-0 cursor-pointer">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal />
                                </Button>
                            </DropdownMenuTrigger>

                             <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem  className='cursor-pointer'>
                                    Copy Institution ID
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className='cursor-pointer'>View Institution</DropdownMenuItem>
                                <DropdownMenuItem className='cursor-pointer'>View other details</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </TableCell>
                </TableRow>
                ))}

                               
            </TableBody>
        </Table>

  
      

        <CardFooter>

        </CardFooter>
    </Card>
  )
}

export default institutionsTable