"use client"

import React, { useState, useEffect } from 'react'
import { Layout } from '@/types/ui-types/ui'
import { useDragElementLayout, useEmailTemplate, useSelectedElement } from '@/app/provider'
import ButtonComponent from '../custom/Element/ButtonComponent'
import TextComponent from '../custom/Element/TextComponent'
import ImageComponent from '../custom/Element/ImageComponent'
import LogoComponent from '../custom/Element/LogoComponent'
import DividerComponent from '../custom/Element/DividerComponent'
import { Trash2Icon } from 'lucide-react'


function ColumnLayout({ layout }: { layout: any }) {

    const [dragOver, setDragOver] = useState<any>()
    const { emailTemplate, setEmailTemplate } = useEmailTemplate()
    const { dragElementLayout, setDragElementLayout } = useDragElementLayout()
    const { selectedElement, setSelectedElement } = useSelectedElement()


    const getElementComponent = (element: any) => {
        if (!element) return null;
        if (element?.type === 'Button') {
            return <ButtonComponent {...element} />
        } else if (element?.type === 'Text') {
            return <TextComponent {...element} />
        } else if (element?.type === 'Image') {
            return <ImageComponent {...element} />
        } else if (element?.type === 'Logo') {
            return <LogoComponent {...element} />
        } else if (element?.type === 'Divider') {
            return <DividerComponent {...element} />
        }

        console.log(emailTemplate)
        // return <div>{element?.type}</div>|| null;
    }



    const onDragOverHandle = (event: React.DragEvent<HTMLDivElement>, index: number) => {
        // console.log(emailTemplate)

        event.preventDefault()
        // console.log(layout?.id)
        setDragOver({
            index: index,
            columnId: layout?.id
        })

    }

    const onDropHandle = () => {
        const index = dragOver?.index
        setEmailTemplate((prev: any[]) =>
            prev?.map((col: any) => col.id === layout.id ? { ...col, [index]: dragElementLayout?.dragElement } : col)

        )
        setDragOver(null)
    }

    const DeleteLayout = (id: string) => {
        const updatedEmailTemplate = emailTemplate?.filter((col: any) => col.id !== id)
        setEmailTemplate(updatedEmailTemplate)
        setSelectedElement(null)

    }


        const deleteElement = (element: any, index: number) => {
        setEmailTemplate((prev: any[]) =>
            prev.map((col: any) => {
                if (col.id === layout.id) {
                    const updatedCol = { ...col };
                    // Delete the element at the specific index
                    delete updatedCol[index];
                    return updatedCol;
                }
                return col;
            })
        );
        setSelectedElement(null);
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Check if the active element is an input, textarea, or contenteditable element
            const isInputActive = document.activeElement instanceof HTMLInputElement || 
                                document.activeElement instanceof HTMLTextAreaElement ||
                                document.activeElement?.hasAttribute('contenteditable');
            
            if (event.key === 'Backspace' && !isInputActive && selectedElement?.layout?.id === layout.id) {
                deleteElement(layout?.[selectedElement.index], selectedElement.index);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedElement, layout]);





    return (
        <div className='relative'>
            <table
                style={{
                    width: '100%',
                    borderCollapse: 'collapse'
                }}
                className={`${(selectedElement?.layout?.id == layout?.id && 'border border-dashed-4 border-blue-500')} `}
            >
                <tbody>
                    <tr>
                        {Array.from({ length: layout?.numberOfColumns }).map((_, index) => (
                            <td
                                key={index}
                                className={` border border-dashed cursor-pointer
                                 
                                ${layout?.[index]?.type && 'bg-white'}
                                ${index === dragOver?.index && dragOver?.columnId === layout.id ? 'bg-blue-100' : 'bg-gray-100'}
                                ${(selectedElement?.layout?.id == layout?.id && selectedElement?.index == index) ? 'border-blue-500 border' : ''}
                                `}
                                   
                                onDragOver={(event) => onDragOverHandle(event, index)}
                                onDrop={onDropHandle}
                                onClick={() => setSelectedElement({ layout: layout, index: index })}
                            >
                                {getElementComponent(layout?.[index]) ?? index + 1}
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>

            <div className='absolute -right-14 bg-gray-100'>
                {selectedElement?.layout?.id == layout?.id &&
                    <Trash2Icon onClick={() => DeleteLayout(layout?.id)} className='text-gray-500 cursor-pointer hover:text-red-500' />
                }
            </div>
        </div>
    )
    
}

export default ColumnLayout
