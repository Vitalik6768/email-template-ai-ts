"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
// import SignInButton from './SignInButton'

function Hero() {
    return (
        <div className='px-10 md:px-20 lg:px-44 xl:px-56 flex flex-col justify-center items-center mt-24'>
            <div className='font-extrabold text-bold text-5xl text-center'>
                Ai Powerd <span className='text-primary'>Email Templates</span>
            </div>

            <p className='text-gray-600 text-lg mt-4 text-center'>
                Create professional email templates instantly with the power of AI. Save time and boost your communication.
            </p>

            <div className='flex gap-4 mt-8'>
                <Button variant='outline'>Try Demo</Button>
                {/* <SignInButton/> */}
                <Button>Get Started</Button>

            </div>

            {/* <Image/> */}

        </div>

    )
}

export default Hero