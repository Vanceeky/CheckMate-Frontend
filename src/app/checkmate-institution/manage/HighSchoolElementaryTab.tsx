import React from 'react'
import { GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/button'
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


    </main>


  )
}

export default HighSchoolElementaryTab