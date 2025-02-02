
import React from 'react'

function ImageComponent({style, imageUrl, }:any) {
  return (
    <div>
      <img src={imageUrl} alt="image" style={style} />
    </div>
  )
}

export default ImageComponent
