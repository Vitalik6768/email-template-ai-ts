import React from 'react'

function TextComponent({style, textarea, outerStyle}:any) {
  return (
    <div style={outerStyle}>
      <span style={style}>{textarea}</span>
      {/* {textarea} */}
    </div>
  )
}

export default TextComponent
