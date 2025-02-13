"use client"

import { useScreenSize, useDragElementLayout, useEmailTemplate } from '@/app/provider'
import { Layout } from '@/types/ui-types/ui'
import { useEffect, useRef, useState } from 'react'
// import ColumnLayout from '@/components/layoutElements/ColumnLayout'

import React from 'react'
import ColumnLayout from '../LayoutElements/ColumnLayout'
import ViewHtmlDialog from './ViewHtmlDialog'
import { ScrollArea } from '../ui/scroll-area'


function Canvas({ viewHtmlCode, closeDialog }: { viewHtmlCode: boolean, closeDialog: () => void }) {

  const { screenSize, setScreenSize } = useScreenSize()
  const { dragElementLayout, setDragElementLayout } = useDragElementLayout()
  const { emailTemplate, setEmailTemplate } = useEmailTemplate()
  const [dragOver, setDragOver] = useState(false)
  const htmlRef = useRef(null)
  const [htmlCode, setHtmlCode] = useState('')

  const onDragOver = (e: any) => {
    e.preventDefault();
    setDragOver(true)

  }

  const onDrop = (e: any) => {
    setDragOver(false)

    if (dragElementLayout?.dragLayout) {
      setEmailTemplate((prev: any) => Array.isArray(prev) ? [...prev, dragElementLayout.dragLayout] : [dragElementLayout.dragLayout])
    }
  }

  const getLayoutComponent = (layout: Layout) => {
    if (layout.type === 'column') {
      return <ColumnLayout layout={layout} />

    }
  }
  useEffect(() => {
    if (viewHtmlCode) {
      getHtmlCode()
    }
  }, [viewHtmlCode])



  const getHtmlCode = () => {
    if (htmlRef.current) {
      const htmlContent = (htmlRef.current as HTMLElement).innerHTML;
      setHtmlCode(htmlContent)
    }
  }


  return (

    <>
      <ScrollArea className="h-[calc(100vh-40px)]">

        <div className='mt-11 flex justify-center'>


          <div className={`bg-white p-6 w-full max-w-2xl
        ${screenSize === 'desktop' ? 'max-w-2xl' : 'max-w-md'}
        ${dragOver ? 'border-2 border-blue-500 bg-purple-100' : ''}
        
        `}
            onDragOver={onDragOver}
            onDrop={onDrop}
            ref={htmlRef}
          >
            {emailTemplate?.length > 0 ? emailTemplate?.map((layout: any, index: any) => (
              <div key={index}>
                <span className='text-black'>{getLayoutComponent(layout)}</span>
              </div>
            )) : (
              <div className="text-gray-400 text-center py-8">
                Add layout
              </div>
            )}

          </div>
          <ViewHtmlDialog openDialog={viewHtmlCode} htmlCode={htmlCode} closeDialog={closeDialog} />
        </div>
      </ScrollArea>
    </>
  )
}

export default Canvas