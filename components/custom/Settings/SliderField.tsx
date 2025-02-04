
import React from 'react'
import { Slider } from "@/components/ui/slider"


interface SliderFieldProps {
    label: string;
    value: string;
    onHandleStyleChange: (value: string) => void;
    type?: string;
}


function SliderField({label, value, onHandleStyleChange, type }:SliderFieldProps) {

    const formatedValue = (value: string) => {
        return Number(value.toString().replace('px', ''))
    }

  return (
    <div>
        <label>{label} ({value})</label>
        <Slider defaultValue={[formatedValue(value)]} max={100} step={1}
        
        onValueChange={(value) => onHandleStyleChange(`${value}${type}`)}
         />
      
    </div>
  )
}

export default SliderField
