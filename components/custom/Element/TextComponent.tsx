import React from 'react'

function TextComponent({style, textarea}:any) {
  return (
    <div>
      {/* <p style={style}>{content}</p> */}
      {textarea}
    </div>
  )
}

export default TextComponent
