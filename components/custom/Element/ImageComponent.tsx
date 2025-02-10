
import React from 'react'

function ImageComponent({style, imageUrl, outerStyle }:any) {
  return (
    <div style={outerStyle}>
      <img src={imageUrl} alt="image" style={style} />
    </div>
  )
}

export default ImageComponent
