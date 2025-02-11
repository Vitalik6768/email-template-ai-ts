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
import { toast } from "sonner";

interface EditorHeaderProps {
    viewHtmlCode: (value: boolean) => void
}

function EditorHeader({ viewHtmlCode }: EditorHeaderProps) {
    const { screenSize, setScreenSize } = useScreenSize();
    const updateEmailTemplate = useMutation(api.emailTemplate.updateEmailTemplate);
    const { templateId } = useParams();
    const { emailTemplate, setEmailTemplate } = useEmailTemplate();
    const [isSaving, setIsSaving] = React.useState(false);

    const onSaveTemplate = async () => {
        try {
            setIsSaving(true);
            const cleanTemplate = JSON.parse(JSON.stringify(emailTemplate));
            await updateEmailTemplate({
                tid: templateId as string,
                design: cleanTemplate
            });

            toast.success("Template saved successfully");
        } catch (error) {
            toast.error("Failed to save template");
        } finally {
            setIsSaving(false);
        }
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

                <Button variant={'ghost'} onClick={() => viewHtmlCode(true)} disabled={isSaving}>
                    <Code className='hover:text-primary' />

                </Button>

                <Button variant={'outline'} disabled={isSaving}>Send Test Email</Button>
                <Button onClick={onSaveTemplate} disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save Template'}
                </Button>
                <UserButton afterSignOutUrl='/' />


            </div>

        </div>
    )
}

export default EditorHeader