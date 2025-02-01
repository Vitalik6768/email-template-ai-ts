"use client"

import React, { useState } from 'react'
import { Layout } from '@/types/ui-types/ui'
import { useDragElementLayout, useEmailTemplate } from '@/app/provider'


function ColumnLayout({ layout }: { layout: any }) {

    const [dragOver, setDragOver] = useState<any>()
    const { emailTemplate, setEmailTemplate } = useEmailTemplate()
    const { dragElementLayout, setDragElementLayout } = useDragElementLayout()


    const getElementComponent = (element:any) => {
        if (!element) return null;
        return element.type || null;
    }



    const onDragOverHandle = (event: React.DragEvent<HTMLDivElement>, index:number) => { 
        event.preventDefault()
        // console.log(layout?.id)
        setDragOver({
            index:index,
            columnId:layout?.id
        })

    }

    const onDropHandle = () => {
        const index = dragOver?.index
        setEmailTemplate((prev: any[]) => 
            prev?.map((col:any)=>col.id === layout.id?{...col,[index]:dragElementLayout?.dragElement}:col)

        )
        setDragOver(null)



    }

    return (
        <div>
            <div
            style={{
                display:'grid',
                gridTemplateColumns:`repeat(${layout?.numberOfColumns},1fr)`,
                gap:0
            }}
            >
                {Array.from({ length: layout?.numberOfColumns }).map((_, index) => (
                    <div 
                        key={index} 
                        className={`p-2 flex items-center border border-dashed justify-center ${
                            index === dragOver?.index && dragOver?.columnId === layout.id ? 'bg-blue-100' : 'bg-gray-100'
                        }`}
                        onDragOver={(event) => onDragOverHandle(event, index)}
                        onDrop={onDropHandle}
                    >
                        {getElementComponent(layout?.[index]) ?? index + 1}

                    </div>
                ))}
            </div>
        </div>
    )
}

export default ColumnLayout
