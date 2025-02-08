
import React from 'react'

function LogoComponent({style, image, url, imageUrl, outerStyle}:any) {
  return (
    <div className='bg-red-500'>
        <img src={imageUrl} alt={image} style={style} />
    </div>
  )
}

export default LogoComponent
