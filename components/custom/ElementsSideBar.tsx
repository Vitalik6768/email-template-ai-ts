"use client"

import React from 'react'
import { Layout } from '@/Data/Layout'
import ElementLayoutCard from '@/components/custom/ElementLayoutCard'
import { ElementList } from '@/Data/ElementList'
import { useDragElementLayout } from '@/app/provider'


function ElementsSideBar() {
    const {dragElementLayout, setDragElementLayout} = useDragElementLayout()
    const onDragStart = (layout:any) => {
        console.log(layout)
        setDragElementLayout({
            dragLayout:{
                ...layout,
                id:Date.now(),


            }
        })
    }
    return (
        <div className='p-5 h-screen'>
            <h2 className='text-xl font-bold pb-5'>Layout</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                {Layout.map((layout, index) => (
                    <div key={index} draggable onDragStart={() => onDragStart(layout)}>

                        <ElementLayoutCard key={index} layout={layout} index={index} />
                    </div>

                ))}
            </div>


            <h2 className='text-xl font-bold pb-5'>Elements</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                {ElementList.map((element, index) => (
                    <ElementLayoutCard
                        key={index}
                        layout={element}
                        index={index}
                    />
                ))}
            </div>

        </div>
    )
}

export default ElementsSideBar