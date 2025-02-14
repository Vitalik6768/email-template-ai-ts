"use client"

import React, { useState } from 'react'
import { api } from '@/convex/_generated/api'
import { useMutation } from 'convex/react'
import { Loader2 } from "lucide-react"
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/navigation'
import { useUser } from "@clerk/nextjs"
import { Button } from '@/components/ui/button'


function CreateNewTemplate() {
    const [userInput, setUserInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const saveEmailTemplate = useMutation(api.emailTemplate.saveEmailTemplate)
    const router = useRouter()
    const { user } = useUser()


    const onGenerate = async () => {
        setIsLoading(true)
        const uniqueId = uuidv4()

        try {
            await saveEmailTemplate({
                tid: uniqueId,
                design: ['data'],
                email: user?.primaryEmailAddress?.emailAddress || ''
            })


            setIsLoading(false)
            router.push('/editor/' + uniqueId)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
            // Handle error appropriately here
        }

    }


    return (
        <div>
            <div className='mt-5'>
                <p className='text-sm'> provide a prompt for your email</p>
                <Button disabled={isLoading} className='w-full mt-7' onClick={onGenerate}>
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                        </>
                    ) : (
                        'Generate'
                    )}
                </Button>

            </div>

        </div>
    )
}

export default CreateNewTemplate
