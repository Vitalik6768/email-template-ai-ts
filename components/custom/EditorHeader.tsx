'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Code, Monitor, Smartphone } from 'lucide-react'
import { useEmailTemplate, useScreenSize } from '@/app/provider'
import { UserButton } from '@clerk/nextjs'
import { updateEmailTemplate } from '@/convex/emailTemplate'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useParams } from 'next/navigation'

interface EditorHeaderProps {
    viewHtmlCode: (arg0: boolean) => void
}

function EditorHeader({ viewHtmlCode }: any) {
    const { screenSize, setScreenSize } = useScreenSize();
    const updateEmailTemplate = useMutation(api.emailTemplate.updateEmailTemplate);
    const {templateId} = useParams();
    const {emailTemplate, setEmailTemplate} = useEmailTemplate();

    const onSaveTemplate = async()=>{
        await updateEmailTemplate({
            tid:templateId as string,
            design:emailTemplate

        })

    }

 


    return (
        <div className='p-4 shadow- flex justify-between items-center'>
            <Image src={'/logo.svg'} alt='logo' width={160} height={150} />
            <div className='flex gap-3'>
                <Button variant={'ghost'}
                    onClick={() => setScreenSize('desktop')}
                    className={`${screenSize === 'desktop' && 'bg-purple-100 text-white'}`}>
                    <Monitor />
                    Desktop
                </Button>

                <Button
                    variant={'ghost'}
                    onClick={() => setScreenSize('smartphone')}
                    className={`${screenSize === 'smartphone' && 'bg-purple-100 text-white'}`}>
                    <Smartphone />
                    Smart Phone
                </Button>



            </div>



            <div className='flex gap-3 items-center'>

                <Button variant={'ghost'} onClick={() => viewHtmlCode(true)}>
                    <Code className='hover:text-primary' />

                </Button>

                <Button variant={'outline'}>Send Test Email</Button>
                <Button onClick={onSaveTemplate}>Save Template</Button>
                <UserButton afterSignOutUrl='/' />


            </div>

        </div>
    )
}

export default EditorHeader