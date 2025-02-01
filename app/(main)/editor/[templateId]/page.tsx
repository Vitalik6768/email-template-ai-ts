import React from 'react'
import EditorHeader from '@/components/custom/EditorHeader'
import ElementsSideBar from '@/components/custom/ElementsSideBar'
import Canvas from '@/components/custom/Canvas'
// import ElementsSideBar from '@/components/custom/ElementsSideBar'
// import Canvas from '@/components/custom/Canvas'
// import Settings from '@/components/custom/Settings'

function EditorPage() {
  return (
    <div>
        <EditorHeader />

        <div className='grid grid-cols-5'>
            <ElementsSideBar/>
            <div className='col-span-3 bg-gray-100'>
                <Canvas/>
            </div>
            {/* <Settings/> */}
        </div>
      
    </div>
  )
}

export default EditorPage