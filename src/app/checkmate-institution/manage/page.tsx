import React from 'react'



import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Building, MapPin } from 'lucide-react'

import { StatusBadge, InstituteTypeBadge } from '@/helpers/BadgeTypes'
import { Separator } from '@/components/ui/separator'

import  CollegeTab  from './CollegeTab'
import  HighSchoolElementaryTab  from './HighSchoolElementaryTab'

const ManageInstitution = () => {
  return (
    
    <div className='p-4 lg:p-6 grid grid-cols-12 gap-4'>

      <div className="col-span-12 lg-col-span-9">
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

            <Tabs defaultValue="college" className="w-full">
              <TabsList className='grid grid-cols-2 bg-transparent mb-2'>
                  <TabsTrigger value="college" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 cursor-pointer p-2">
                    College
                  </TabsTrigger>
                  <TabsTrigger value="highschool_elementary" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700 cursor-pointer p-2">
                    HighSchool / Elementary 
                  </TabsTrigger>

              </TabsList>
              <Separator/>
              <TabsContent value="college">

                <CollegeTab/>

              </TabsContent>

              <TabsContent value="highschool_elementary">

                <HighSchoolElementaryTab/>

              </TabsContent>
            </Tabs>

          </CardContent>
        </Card>
      </div>



    
    </div>
  )
}

export default ManageInstitution