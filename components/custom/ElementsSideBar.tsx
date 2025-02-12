"use client"

import React from 'react'
import { Layout } from '@/Data/Layout'
import ElementLayoutCard from '@/components/custom/ElementLayoutCard'
import { ElementList } from '@/Data/ElementList'
import { useDragElementLayout } from '@/app/provider'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"




function ElementsSideBar() {
    const { dragElementLayout, setDragElementLayout } = useDragElementLayout()




    const onDragStart = (layout: any) => {
        console.log(layout)
        setDragElementLayout({
            dragLayout: {
                ...layout,
                id: Date.now(),


            }
        })
    }

    const onDragElementsStart = (element: any) => {
        setDragElementLayout({
            dragElement: {
                ...element,
            }
        })


    }
    return (
        <div className='p-5 min-h-screen'>
            <Tabs defaultValue="layout" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="layout">Layout</TabsTrigger>
                    <TabsTrigger value="elements">Elements</TabsTrigger>
                </TabsList>
                <TabsContent value="layout">
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                        {Layout.map((layout, index) => (
                            <div key={index} draggable onDragStart={() => onDragStart(layout)}>
                                <ElementLayoutCard key={index} layout={layout} index={index} />
                            </div>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="elements">
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                        {ElementList.map((element, index) => (
                            <div key={index} draggable onDragStart={() => onDragElementsStart(element)}>
                                <ElementLayoutCard
                                    key={index}
                                    layout={element}
                                    index={index}
                                />
                            </div>
                        ))}
                    </div>
                    </TabsContent>
            </Tabs>
        </div>
    )
}

export default ElementsSideBar