import React from 'react'

import { InstituteProps } from '@/types/institute'

import { Button } from '@/components/ui/button'
import { Plus } from "lucide-react"

import InstitutionTable from './institutionsTable'


const page = () => {
  return (

    <div className='p-4 lg:p-6'>
      
      <div className='flex items-center justify-between'>

        <div>
          <h1 className='text-2xl font-bold'>Institutions</h1>
          <p>Manage educational institutions in the system</p>
        </div>

        <div>
          
          <Button><Plus className=''/> Add Institution</Button>
        </div>

      </div>

      <InstitutionTable/>




    </div>

  )
}

export default page