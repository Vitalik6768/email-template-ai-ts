"use client"

import React from 'react'
import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
// import EmailTemplateList from '@/components/custom/EmailTemplateList'

function Dashboard() {
  return (
    <div>
        <div className='p-10 md:px-28 lg:px-40 xl:px-56 mt-16'>
            <div className='flex justify-between items-center'>
                <h2 className='font-bold text-2xl'>Hello, vitali</h2>
                <Button>
                    <PlusIcon className='w-4 h-4 mr-2'/>
                    Create ne email template
                </Button>
            </div>
            {/* <EmailTemplateList/> */}
            {/* <h2 className='font-bold text-xl text-primary mt-6'>Work Space</h2> */}
        </div>

      
    </div>
  )
}

export default Dashboard