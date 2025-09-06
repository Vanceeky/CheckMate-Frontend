import React from 'react'

import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

import { StatusBadge, InstituteTypeBadge } from '@/helpers/BadgeTypes'
import { User, Mail, Phone, Car, Pin, LocateIcon, MapPin } from 'lucide-react'
import QuickActionsPanel from '@/components/QuickActionsPanel'
import { StatCard } from '@/components/section-cards'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button'

import StudentsTable from '@/components/students-table'

import { mockStudents } from '@/data/mockStudents'
import { mockTeachers } from '@/data/mockTeachers'
import TeachersTable from '@/components/teachers-table'

const page = () => {
  return (
    
  <div className="p-4 lg:p-6 grid grid-cols-12 gap-4">

    {/* Left section - 8/12 */}
    <div className="col-span-12 lg:col-span-9">
      <Card>

        <CardHeader className='flex justify-between'>
          <CardTitle>
            <div className="p-4">
              {/* Institution name */}
              <h2 className="text-lg font-semibold text-foreground">
                Lyceum-Northwestern University
              </h2>

              {/* Address */}
              <div className="mt-1 flex items-start text-sm text-muted-foreground">
                <MapPin className="mr-2 h-4 w-4 mt-0.5" />
                <p>123 Education Street, Springfield, IL 62701</p>
              </div>
            </div>


            
            </CardTitle>
          <CardDescription >
            <div className='flex gap-3'>


            <InstituteTypeBadge type="university" />
            <StatusBadge status="active" />

            </div>

          </CardDescription>

        </CardHeader>

        <CardContent>

        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard
              title="Total Students"
              value={mockStudents.length}
              trendValue="+12.5%"
              footerMain="Enrolled students in this Institution"
              Icon={Car}
            />
            <StatCard
              title="Active Teachers"
              value={mockTeachers.length}
              trendValue="+8.2%"
              footerMain="Currently active across campuses"
              Icon={Car}
            />
            <StatCard
              title="Exams Processed"
              value="24"
              trendValue="+3.1%"
              footerMain="Active learning communities"
              Icon={Car}
            />

                        
          </div>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Students & Teachers Management</CardTitle>
            </CardHeader>

            <CardContent>
              <Tabs defaultValue="students" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="students" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 cursor-pointer">
                    Students ( { mockStudents.length } )
                  </TabsTrigger>
                  <TabsTrigger value="teachers" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700 cursor-pointer">
                    Teachers ( { mockTeachers.length } )
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="students">

                 <StudentsTable data={mockStudents} />

                </TabsContent>

                <TabsContent value="teachers">

                  <TeachersTable data={mockTeachers}/>


                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>


        </div>


 

        </CardContent>


      </Card>

    </div>

    {/* Right section - 4/12 */}
    <div className="col-span-12 lg:col-span-3">
      <Card className='mb-3'>
        <CardHeader>
          <CardTitle>Key Contact Information</CardTitle>
        </CardHeader>
        <CardContent>

          <div>

            <div className='flex gap-2 items-center mb-2 border-b'>
                <div className={`p-2 rounded-lg bg-green-50 flex-shrink-0`}>
                    <User className={`w-4 h-4 text-green-500`} />
                </div>

                <div className='flex-1'>

                  <span className='font-semibold text-sm'>Head of Institution</span>
                  <p className='text-sm text-muted-foreground'>John Doe</p>

                </div>

            </div>

            <div className='flex gap-2 items-center mb-2 border-b'>
                <div className={`p-2 rounded-lg bg-blue-50 flex-shrink-0`}>
                    <Mail className={`w-4 h-4 text-blue-500`} />
                </div>

                <div className='flex-1'>


                  <span className='font-semibold text-sm'>Email</span>
                  <p className='text-sm text-muted-foreground'>admin@lyceum.edu.ph</p>

                </div>

            </div>
            
            <div className='flex gap-2 items-center mb-4 border-b'>
                <div className={`p-2 rounded-lg bg-green-50 flex-shrink-0`}>
                    <Phone className={`w-4 h-4 text-green-500`} />
                </div>

                <div className='flex-1'>

                  <span className='font-semibold text-sm'>Phone</span>
                  <p className='text-sm text-muted-foreground'>0945-6656-707</p>

                </div>

            </div>


          </div>

          <div className="space-y-3">
                <p className="text-sm font-medium">About this Institution:</p>
                <p className="text-xs text-muted-foreground">
                A leading educational institution focused on academic excellence and innovation.
                </p>

            </div>


        </CardContent>


      </Card>


      <QuickActionsPanel/>




    </div>

  </div>


  )
}

export default page