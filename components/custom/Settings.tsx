'use client'

import { useSelectedElement } from '@/app/provider'
import React, { useEffect, useState } from 'react'
import InputField from './Settings/InputField'
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import ColorPickerField from './Settings/ColorPickerField'
import { AlignCenter, AlignLeft, AlignRight, Bold, CaseLower, Layout } from 'lucide-react'
import InputStylefield from './Settings/InputStylefield'
import InputUrlField from './Settings/InputUrlField'
import SliderField from './Settings/SliderField'
import TextAreaField from './Settings/TextAreaField'
import ToggleGroupField from './Settings/ToggleGroupField'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import ImagePikerField from './Settings/imagePikerField'

function Settings() {

    const { selectedElement, setSelectedElement } = useSelectedElement()
    const [element, setElement] = useState<any>(null)
    const messages = useQuery(api.messages.list)
    const [pendingImageUpdate, setPendingImageUpdate] = useState(false)

    const textAlignOptions = [{
        value: 'Left',
        icon: <AlignLeft />
    }, {
        value: 'Center',
        icon: <AlignCenter />
    }, {
        value: 'Right',
        icon: <AlignRight />
    }]

    const fontWeightOptions = [{
        value: 'normal',
        icon: <CaseLower />
    }, {
        value: 'bold',
        icon: <Bold />
    }]

    useEffect(() => {
        setElement(selectedElement?.layout?.[selectedElement?.index])
    }, [selectedElement])

    useEffect(() => {
        // Check if we're waiting for a new image and messages are available
        if (pendingImageUpdate && messages && messages.length > 0) {
            const latestMessage = messages[messages.length - 1]
            
            const updateSelectedElement = { ...selectedElement }
            updateSelectedElement.layout[selectedElement?.index].imageUrl = latestMessage.url
            setSelectedElement(updateSelectedElement)
            // Reset the pending flag
            setPendingImageUpdate(false)
        }
    }, [messages, pendingImageUpdate, selectedElement])

    const onHandleImageChange = (fieldName: any, value: any) => {
        // Just set the flag to true - the useEffect will handle the update
        setPendingImageUpdate(true)
    }

    const onHandleInputChange = (fieldName: any, value: any) => {
        console.log('fieldName', fieldName)
        console.log('value', value)

        const updateSelectedElement = { ...selectedElement }

        // console.log('updateSelectedElement', updateSelectedElement)

        updateSelectedElement.layout[selectedElement?.index][fieldName] = value

        // console.log('updateSelectedElement to set', updateSelectedElement)

        console.log('selectedElement style', selectedElement?.outerStyle?.backgroundColor)

        setSelectedElement(updateSelectedElement)
    }

    const onHandleStyleChange = (fieldName: any, value: any, style: string) => {
        const updateSelectedElement = { ...selectedElement }

        // console.log('value fron', value)

        if (style === 'outerStyle') {
            updateSelectedElement.layout[selectedElement?.index].outerStyle = {
                ...updateSelectedElement.layout[selectedElement?.index].outerStyle,
                [fieldName]: value
            }
        } else {
            updateSelectedElement.layout[selectedElement?.index].style = {
                ...updateSelectedElement.layout[selectedElement?.index].style,
                [fieldName]: value
            }
        }

        console.log('updateSelectedElement', updateSelectedElement,)

        setSelectedElement(updateSelectedElement)
    }

    return (
        <div className='p-5 min-h-screen'>
            <Tabs defaultValue="layout" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="style">Style</TabsTrigger>
                </TabsList>

                <TabsContent value="content">
                    {element?.type === 'Image' &&
                        <ImagePikerField label={'Image'} value={element?.imageUrl} onHandleInputChange={(value: any) => onHandleImageChange('imageUrl', value)} />
                    }

                    {element?.style?.textAlign &&
                        <ToggleGroupField label={'Text Align'} value={element?.style?.textAlign} onHandleStyleChange={(value: any) => onHandleStyleChange('textAlign', value, 'style')} options={textAlignOptions} />
                    }

                    {element?.outerStyle?.justifyContent &&
                        <ToggleGroupField label={'Justify Content'} value={element?.outerStyle?.justifyContent} onHandleStyleChange={(value: any) => onHandleStyleChange('justifyContent', value, 'outerStyle')} options={textAlignOptions} />
                    }

                    {(element?.content !== undefined) && (
                        <InputField
                            label={'Content'}
                            value={element?.content || ''}
                            onHandleInputChange={(value: any) =>
                                onHandleInputChange('content', value)
                            }
                        />
                    )}

                    {element?.textarea &&
                        <TextAreaField label={'Textarea'} value={element?.textarea} onHandleInputChange={(value: any) => onHandleInputChange('textarea', value)} />
                    }

                    {element?.content &&
                        <InputUrlField label={'Url'} value={element?.url} onHandleInputChange={(value: any) => onHandleInputChange('url', value)} />
                    }
                </TabsContent>

                <TabsContent value="style">
                    {element?.style?.backgroundColor &&
                        <ColorPickerField label='Background Color' value={element?.style?.backgroundColor} onHandleStyleChange={(value: any) => onHandleStyleChange('backgroundColor', value, 'style')} />
                    }

                    {element?.outerStyle?.backgroundColor &&
                        < ColorPickerField
                            label={'Background'}
                            value={element?.outerStyle?.backgroundColor} // Changed from element to selectedElement
                            onHandleStyleChange={(value: any) => onHandleStyleChange('backgroundColor', value, 'outerStyle')}
                        />
                    }

                    {element?.style?.color &&
                        < ColorPickerField
                            label={'Color'}
                            value={element?.style?.color} // Changed from element to selectedElement
                            onHandleStyleChange={(value: any) => onHandleStyleChange('color', value, 'Style')}
                        />
                    }

                    {element?.outerStyle?.textAlign &&
                        <ToggleGroupField label={'Text Align'} value={element?.outerStyle?.textAlign} onHandleStyleChange={(value: any) => onHandleStyleChange('textAlign', value, 'outerStyle')} options={textAlignOptions} />
                    }

                    {element?.style?.fontWeight &&
                        <ToggleGroupField label={'Font Weight'} value={element?.style?.fontWeight} onHandleStyleChange={(value: any) => onHandleStyleChange('fontWeight', value, 'style')} options={fontWeightOptions} />
                    }

                    {element?.style?.fontSize &&
                        <InputStylefield label={'Font Size'} value={element?.style?.fontSize} onHandleStyleChange={(value: any) => onHandleStyleChange('fontSize', value, 'style')} />
                    }

                    {element?.style?.padding &&
                        <InputStylefield label={'Padding'} value={element?.style?.padding} onHandleStyleChange={(value: any) => onHandleStyleChange('padding', value, 'style')} />
                    }

                    {element?.style?.borderRadius &&
                        <SliderField label={'Border Radius'} type='px' value={element?.style?.borderRadius} onHandleStyleChange={(value: any) => onHandleStyleChange('borderRadius', value, 'style')} />
                    }

                    {element?.style?.width &&
                        <SliderField label={'Width'} type='%' value={element?.style?.width} onHandleStyleChange={(value: any) => onHandleStyleChange('width', value, 'style')} />
                    }
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Settings
