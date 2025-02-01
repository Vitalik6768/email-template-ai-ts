import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

function Header() {
  return (
    <div className='flex justify-between items-center p-4 shadow-sm'>
        <Image src={'/logo.svg'} alt='logo' width={140} height={140}></Image>
        <div>
            <Link href="/dashboard">
                <Button>
                    Dashboard
                </Button>
            </Link>
        </div>
      

    </div>
  )
}

export default Header