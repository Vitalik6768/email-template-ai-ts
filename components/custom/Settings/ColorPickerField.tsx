import React from 'react'

function ColorPickerField({label, value, onHandleStyleChange}:any) {

  return (
    <div className='flex flex-col gap-2 mt-4'>
      <label>{label}</label>
      <div className='flex items-center gap-2'>
        <input type='color' value={value} onChange={(event) => onHandleStyleChange(event.target.value)} />
        <input 
          type='text' 
          value={value} 
          onChange={(event) => onHandleStyleChange(event.target.value)}
          className='w-24 px-2 py-1 border rounded'
        />
      </div>
    </div>
  )

}

  // Handle value if it's an array

export default ColorPickerField
