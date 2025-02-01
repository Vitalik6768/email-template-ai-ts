import React from 'react'
import { Layout } from '@/Data/Layout'

function ElementLayoutCard({layout, index}) {
    return (
        <div key={index} className='flex flex-col items-center justify-center'>
            <div className='flex items-center justify-center gap-2
                        border border-dashed border-gray-300 rounded-xl p-3 group hover:bg-gray-100 cursor-pointer
                        '>
                {<layout.icon className=' h-8 w-8 p-1 group hover:bg-purple-100 rounded-full' />}

                <h2 className='text-sm font-medium'>{layout.label}</h2>



            </div>

        </div>
    )
}

export default ElementLayoutCard