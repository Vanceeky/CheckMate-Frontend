"use client";
import React from 'react'
import { Building2, BookOpen, Users, UserCheck, Divide } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

import { AvatarFall } from '@/helpers/AvatarFallback'

import { departments } from '@/data/mockDepartments'
import AssignSecretaryDialog from '@/components/AssignSecretaryDialog'

const CollegeTab = () => {
  return (


    <main className='mt-3'>
        <div className="flex items-center justify-between">
            <div>
            <h2 className="text-lg font-semibold">College Departments</h2>
            <p className="text-sm text-muted-foreground">
                Manage departments, assign secretaries, and oversee courses
            </p>
            </div>
            <Button>
            <Building2 className="w-4 h-4 mr-2" />
            Add Department
            </Button>
        </div>

        <div className="grid gap-6 mt-4" 
            style={{ 
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' 
            }}>

            {departments.map((department) => (
                <Card key={department.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <CardTitle className="text-lg">{department.name}</CardTitle>
                            </div>
                            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                                <Building2 className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <div className="grid grid-cols-2 gap-4 mt-0">
                            <div className="text-center p-3 bg-muted/50 rounded-md">
                                <div className="text-lg font-semibold">{department.coursesCount}</div>
                                <div className="text-xs text-muted-foreground">Courses</div>
                            </div>
                            <div className="text-center p-3 bg-muted/50 rounded-md">
                                <div className="text-lg font-semibold">{department.studentsCount}</div>
                                <div className="text-xs text-muted-foreground">Students</div>
                            </div>
                        </div>

                        {/* Secretary Assignments */}
                        <div className="mt-2">
                            <Label className="text-sm font-medium mb-2 block">Department Secretary</Label>

                            {department.secretary ? (
                                <div className="flex items-center gap-3 p-3 rounded-lg border border-green-500 bg-green-50 shadow-sm">
                                    <AvatarFall />
                                    <div className="flex-1">
                                        <div className="text-sm font-semibold">{department.secretary.name}</div>
                                        <div className="text-xs text-muted-foreground">{department.secretary.email}</div>
                                    </div>
                                    <AssignSecretaryDialog
                                        trigger={
                                            <Button variant="ghost" size="sm" className="text-xs hover:bg-gray-200">
                                                <UserCheck className="w-4 h-4 mr-1" />
                                                Change
                                            </Button>
                                        }
                                        title={`Reassign Secretary for ${department.name}`}
                                        description={`Choose another secretary to manage the ${department.name} department.`}
                                    />
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <AssignSecretaryDialog
                                        trigger={
                                            <div className="flex items-center gap-2 p-3 rounded-lg border border-dashed text-muted-foreground cursor-pointer hover:bg-gray-200 transition">
                                                <UserCheck className="w-5 h-5" />
                                                <span className="text-sm">
                                                    <p className="text-xs text-red-500 italic">
                                                        No secretary assigned to this department yet.
                                                    </p>
                                                    <span className="text-xs cursor-pointer underline">Assign Secretary</span>
                                                </span>
                                            </div>
                                        }
                                        title={`Assign Secretary for ${department.name}`}
                                        description={`Select a secretary to manage ${department.name} department`}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 pt-2">
                            <Button className="flex-1" variant="default" size="sm">
                                <BookOpen />
                                Manage Courses
                            </Button>
                            <Button variant="ghost" size="sm">
                                <Users className="w-4 h-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>


    </main>

  )
}

export default CollegeTab