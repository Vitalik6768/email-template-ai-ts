"use client"

import React, { useState } from 'react'
import EditorHeader from '@/components/custom/EditorHeader'
import ElementsSideBar from '@/components/custom/ElementsSideBar'
import Canvas from '@/components/custom/Canvas'
import Settings from '@/components/custom/Settings'
// import ElementsSideBar from '@/components/custom/ElementsSideBar'
// import Canvas from '@/components/custom/Canvas'
// import Settings from '@/components/custom/Settings'

function EditorPage() {
  const [viewHtmlCode, setViewHtmlCode] = useState(false)
  console.log(viewHtmlCode)

  return (
    <div>
        <EditorHeader viewHtmlCode={(v: boolean) => setViewHtmlCode(v)} />

        <div className='grid grid-cols-5'>
            <ElementsSideBar/>
            <div className='col-span-3 bg-gray-100'>
                <Canvas viewHtmlCode={viewHtmlCode} closeDialog={() => setViewHtmlCode(false)} />
            </div>
            <Settings/>
        </div>
      
    </div>
  )
}

export default EditorPage