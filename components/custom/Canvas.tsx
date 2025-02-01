"use client"

import { useScreenSize, useDragElementLayout, useEmailTemplate } from '@/app/provider'
import { Layout } from '@/types/ui-types/ui'
import { useState } from 'react'
// import ColumnLayout from '@/components/layoutElements/ColumnLayout'

import React from 'react'
import ColumnLayout from '../LayoutElements/ColumnLayout'


function Canvas() {

  const { screenSize, setScreenSize } = useScreenSize()
  const { dragElementLayout, setDragElementLayout } = useDragElementLayout()
  const { emailTemplate, setEmailTemplate } = useEmailTemplate()
  const [dragOver, setDragOver] = useState(false)

  const onDragOver = (e:any) => {
    e.preventDefault();
    setDragOver(true)

  }

  const onDrop = (e:any) => {
    setDragOver(false)

    if (dragElementLayout?.dragLayout) {
      setEmailTemplate((prev: any) => Array.isArray(prev) ? [...prev, dragElementLayout.dragLayout] : [dragElementLayout.dragLayout])
    }
  }

  const getLayoutComponent = (layout:Layout) => {
    if (layout.type === 'column') {
       return <ColumnLayout layout={layout} />

    }
  }


  return (
    <div className='mt-20 flex justify-center'>
      <div className={`bg-white p-6 w-full max-w-2xl
        ${screenSize === 'desktop' ? 'max-w-2xl' : 'max-w-md'}
        ${dragOver ? 'border-2 border-blue-500 bg-purple-100' : ''}
        
        `}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        {emailTemplate?.length > 0 ? emailTemplate?.map((layout:any, index:any) => (
          <div key={index}>
            <span className='text-black'>{getLayoutComponent(layout)}</span>
          </div>
        )) : (
          <div className="text-gray-400 text-center py-8">
            Add layout
          </div>
        )}

      </div>
    </div>
  )
}

export default Canvas