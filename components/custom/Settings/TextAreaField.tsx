import React from 'react'
import { Textarea } from "@/components/ui/textarea"

interface TextAreaFieldProps {
    label: string;  
    value: string;
    onHandleInputChange: (value: string) => void;
    type?: string;
}



function TextAreaField({label, value, onHandleInputChange, type }:TextAreaFieldProps) {
  return (
    <div>
      <Textarea 
        value={value}
        onChange={(e) => onHandleInputChange(e.target.value)}
        placeholder={label}
      />
    </div>
  )
}

export default TextAreaField
