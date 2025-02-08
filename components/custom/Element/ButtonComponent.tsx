import React from 'react'

function ButtonComponent({ style, content, url, outerStyle }: any) {
  console.log(outerStyle[0], 'outerStyle')
  return (
      <a href={url} style={outerStyle}>
        <button style={style}>{content}</button>

      </a>

  )
}

export default ButtonComponent
