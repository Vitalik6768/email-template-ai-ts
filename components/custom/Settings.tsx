'use client'

import { useSelectedElement } from '@/app/provider'
import React, { useEffect, useState } from 'react'
import InputField from './Settings/InputField'
import ColorPickerField from './Settings/ColorPickerField'
import { Layout } from 'lucide-react'
import InputStylefield from './Settings/InputStylefield'
import InputUrlField from './Settings/InputUrlField'

function Settings() {

    const { selectedElement, setSelectedElement } = useSelectedElement()
    const [element, setElement] = useState<any>(null)


    useEffect(() => {
        setElement(selectedElement?.layout?.[selectedElement?.index])
    }, [selectedElement])

    const onHandleInputChange = (fieldName: any, value: any) => {

        console.log('fieldName', fieldName)
        console.log('value', value)

        const updateSelectedElement = { ...selectedElement }

        console.log('updateSelectedElement', updateSelectedElement)

        updateSelectedElement.layout[selectedElement?.index][fieldName] = value

        console.log('updateSelectedElement to set', updateSelectedElement)


        setSelectedElement(updateSelectedElement)
    }




    const onHandleStyleChange = (fieldName: any, value: any) => {
        const updateSelectedElement = { ...selectedElement }

        console.log('value fron', value)


        // console.log('fieldName', fieldName)
        // console.log('value', value)

        // console.log('updateSelectedElement', updateSelectedElement)

        // Create a deep copy of the style object
        updateSelectedElement.layout[selectedElement?.index].style = {
            ...updateSelectedElement.layout[selectedElement?.index].style,
            [fieldName]: value
        }

        console.log('updateSelectedElement', updateSelectedElement)
        
        setSelectedElement(updateSelectedElement)
    }

    return (
        <div className='p-5'>

            <h2 className='font-bold text-2xl'>Settings</h2>
            {(element?.content !== undefined || element?.textarea !== undefined) && (
                <InputField 
                    label={'Content'} 
                    value={element?.content || element?.textarea || ''} 
                    onHandleInputChange={(value: any) => 
                        onHandleInputChange(element?.content !== undefined ? 'content' : 'textarea', value)
                    } 
                />
            )}

            {element?.content &&
                <InputUrlField label={'Url'} value={element?.url} onHandleInputChange={(value: any) => onHandleInputChange('url', value)} />

            }

            {element?.style?.backgroundColor &&
                <ColorPickerField label='Background Color' value={element?.style?.backgroundColor} onHandleStyleChange={(value: any) => onHandleStyleChange('backgroundColor', value)} />
            }

            {element?.style?.fontSize &&
                <InputStylefield label={'Font Size'} value={element?.style?.fontSize} onHandleStyleChange={(value: any) => onHandleStyleChange('fontSize', value)} />
            }




        </div>
    )
}

export default Settings
