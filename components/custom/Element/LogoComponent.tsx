
import React from 'react'

function LogoComponent({style, image, url, imageUrl}:any) {
  return (
    <div>
        <img src={imageUrl} alt={image} style={style} />
      
    </div>
  )
}

export default LogoComponent
