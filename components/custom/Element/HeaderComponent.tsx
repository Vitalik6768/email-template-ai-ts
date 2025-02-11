import React from 'react'

function HeaderComponent({style, outerStyle, textarea}:any) {
  return (
    <div style={outerStyle}>
        <h1 style={style}>{textarea}</h1>
    </div>
  )
}

export default HeaderComponent