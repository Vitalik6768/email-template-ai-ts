import React from 'react'

function ColorPickerField({label, value, onHandleStyleChange}:any) {

  return (
    <div className='flex flex-col gap-2 mt-4'>
      <label>{label}</label>
      <input type='color' value={value} onChange={(event) => onHandleStyleChange(event.target.value)} />
    </div>
  )

}

  // Handle value if it's an array

export default ColorPickerField
