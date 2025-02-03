
import { Input } from '@/components/ui/input'
import React from 'react'


function InputField({label, value, onHandleInputChange }:any) {
  return (
    <div>
        <label>{label}</label>
        <Input value={value} onChange={(event)=>onHandleInputChange(event.target.value)}></Input>

    </div>

    //2:55
  )
}

export default InputField
