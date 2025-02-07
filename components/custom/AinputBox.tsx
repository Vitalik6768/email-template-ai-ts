"use client"

import React, { useState } from 'react'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import Prompt from '@/Data/Prompt'
import axios from 'axios'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Loader2 } from "lucide-react"
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/navigation'

function AinputBox() {

    const [userInput, setUserInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const saveEmailTemplate = useMutation(api.emailTemplate.saveEmailTemplate)
    const router = useRouter()


    const onGenerate = async () => {
        setIsLoading(true)
        const prompt = Prompt.EMAIL_PROMPT + "\n" + userInput
        const uniqueId = uuidv4()
        

        try {
            const { data } = await axios.post('/api/ai-email-generate', {
                prompt: prompt,
                tid: uniqueId
            })
            console.log(data)
            await saveEmailTemplate({
                tid: uniqueId,
                design: data,
                email: 'test mail'
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
        <div className='mt-5'>
            <p className='text-sm'> provide a prompt for your email</p>
            <Textarea placeholder='Start writing your prompt here...' className='mt-2' />
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
    )
}

export default AinputBox
