import React from 'react'

function TextComponent({style, textarea}:any) {
  return (
    <div className='w-full'>
      {/* <p style={style}>{content}</p> */}
      {textarea}
    </div>
  )
}

export default TextComponent
