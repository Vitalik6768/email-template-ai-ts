"use client"

import React from 'react'
import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import EmailTemplateList from '@/components/custom/EmailTemplateList'
import { useRouter } from 'next/navigation'

function Dashboard() {
  const router = useRouter()

  return (
    <div>
        <div className='p-10 md:px-28 lg:px-40 xl:px-56 mt-16'>
            <div className='flex justify-between items-center'>
                <h2 className='font-bold text-2xl'>Hello, vitali</h2>
                <Button onClick={() => router.push('/dashboard/create')}>
                    <PlusIcon className='w-4 h-4 mr-2'/>
                    Create new email template
                </Button>
            </div>
            <EmailTemplateList />
        </div>
    </div>
  )
}

export default Dashboard