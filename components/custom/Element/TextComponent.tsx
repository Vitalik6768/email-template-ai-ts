import React from 'react'

function TextComponent({style, textarea}:any) {
  return (
    <div className='w-full'>
      <span style={style}>{textarea}</span>
      {/* {textarea} */}
    </div>
  )
}

export default TextComponent
