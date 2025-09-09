"use client";

import React from 'react'
import { GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/button'

import { Accordion} from '@/components/ui/accordion' 

import { mockGradeLevels } from "@/data/GradeLevel"
import { GradeLevelAccordion } from "@/components/GradeLevelAccordion"

const HighSchoolElementaryTab = () => {
  return (

    <main className='mt-3'>

        <div className='flex items-center justify-between'>
            <div>
                <h2 className="text-lg font-semibold">High School & Elementary</h2>
                <p className="text-sm text-muted-foreground">
                    Manage grade levels, assign advisers, and track student enrollment
                </p>

            </div>
            <Button>
            <GraduationCap className="w-4 h-4 mr-2" />
            Add Grade Level
            </Button>
        </div>


        <div className='mt-4'>
          <Accordion type="single" collapsible className="w-full" >
              {mockGradeLevels.map((grade) => (
                <GradeLevelAccordion key={grade.id} grade={grade} />
              ))}
          </Accordion>

        </div>



    </main>


  )
}

export default HighSchoolElementaryTab