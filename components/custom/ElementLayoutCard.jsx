import React from 'react'
import { Layout } from '@/Data/Layout'

function ElementLayoutCard({layout, index}) {
    return (
        <div key={index} className='flex flex-col items-center justify-center'>
            <div className='flex flex-col items-center justify-center gap-2
                        border border-dashed border-gray-300 rounded-lg p-4 group hover:bg-gray-100 cursor-pointer
                        w-24 h-24 shadow-md hover:shadow-lg transition-all
                        '>
                {<layout.icon className='h-10 w-10 p-1 group hover:bg-purple-100 rounded-full' />}
                <h2 className='text-xs font-medium'>{layout.label}</h2>
            </div>
        </div>
    )
}

export default ElementLayoutCard