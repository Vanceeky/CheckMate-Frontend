"use client"

import React from "react"
import { Input } from "./ui/input"
import { Search, ArrowLeft, ArrowRight, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table"

// Define shape of student data
import { Student } from "@/types/student"

import { AvatarFall } from "@/helpers/AvatarFallback"
import Link from "next/link"
import { StatusBadge } from "@/helpers/BadgeTypes"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


type StudentsTableProps = {
  data: Student[]
}

const StudentsTable = ({ data }: StudentsTableProps) => {
  return (
    <div className="mt-3">
      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-3 mb-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by Student ID"
            className="bg-transparent pl-10 w-full"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Student ID</TableHead>
              <TableHead>Department / Course</TableHead>
              <TableHead className="text-center">Year Level / Section</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                  No students found
                </TableCell>
              </TableRow>
            ) : (
              data.map((student) => (
                <TableRow key={student.id}>

                  <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                            <AvatarFall
                            src=""
                            alt={student.name}
                            institutionName={student.name}
                            />
                            <div className="flex flex-col">

           
                                <Link href={`/checkmate-super/institution/student/${student.id}`} target='_blank'>
                                    <span className='hover:text-primary'>{student.name}</span>
                                </Link>
                 

                            {student.email && (
                                <span className="text-xs text-muted-foreground">{student.email}</span>
                            )}
                            </div>
                        </div>

                    
                    </TableCell>

                  <TableCell>{student.studentId}</TableCell>
                  <TableCell>{student.course}</TableCell>
                  <TableCell className="text-center">{student.yearSection}</TableCell>
                  <TableCell className="text-center">
                    <StatusBadge status={student.status} />
    
                
                    </TableCell>
                  <TableCell className="text-right">
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
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-gray-50 border-t px-4 py-3 rounded-b-md mt-2">
        <div className="text-sm text-muted-foreground mb-2 sm:mb-0">
          Showing <span className="font-medium">1 to {data.length}</span> of{" "}
          <span className="font-medium">{data.length}</span> results
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" /> Prev
          </Button>
          <Button size="sm" className="flex items-center gap-1">
            Next <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default StudentsTable
