import React from 'react'

function ButtonComponent({ style, content, url }: any) {
  return (
      <a href={url}>
        <button style={style}>{content}</button>


      </a>

  )
}

export default ButtonComponent
