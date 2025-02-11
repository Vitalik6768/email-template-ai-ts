
import { Separator } from '@/components/ui/separator'
import React from 'react'

function ColorPickerField({ label, value, onHandleStyleChange }: any) {

  console.log('value', value)


  return (
    <>
    <Separator className="my-4" />

      <div className='flex items-center space-x-2'>
        <label className='text-sm font-medium text-muted-foreground'>{label}</label>
        <div className='flex items-center'>
          <input type='color' value={value} onChange={(event) => onHandleStyleChange(event.target.value)} />
          <input
            type='text'
            value={value}
            onChange={(event) => onHandleStyleChange(event.target.value)}
            className='w-20 px-2  border rounded'
          />
        </div>
      </div>
    </>
  )

}

// Handle value if it's an array

export default ColorPickerField


























// import React from 'react'

// function ColorPickerField({label, value = '#000000', onHandleStyleChange}:any) {

//   console.log('value', value)

//   return (
//     <div className='flex flex-col gap-2 mt-4'>
//       <label>{label}</label>
//       <div className='flex items-center gap-2'>
//         <input
//           type='color'
//           value={value || '#000000'}
//           onChange={(event) => onHandleStyleChange(event.target.value)}
//         />
//         <input
//           type='text'
//           value={value || '#000000'}
//           onChange={(event) => onHandleStyleChange(event.target.value)}
//           className='w-24 px-2 py-1 border rounded'
//         />
//       </div>
//     </div>
//   )

// }

//   // Handle value if it's an array

// export default ColorPickerField
