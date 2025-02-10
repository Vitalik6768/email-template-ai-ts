import React from 'react'
import { Bold, Italic, Underline } from "lucide-react"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"


interface ToggleGroupFieldProps {
  label: string;
  value: string;
  onHandleStyleChange: (value: string) => void;
  options: {
    value: string;
    icon: any;
  }[];
}




function ToggleGroupField({ label, value, onHandleStyleChange, options }: ToggleGroupFieldProps) {
  return (
    <div>
      <label>{label}</label>
      <ToggleGroup type="single"
      defaultValue={value}
      onValueChange={(value) => onHandleStyleChange(value)}

      
      >
        {options.map((option, index) => (
          <ToggleGroupItem 
            key={index} 
            value={option.value} 
            aria-label={option.value}
          >
            {option.icon}
          </ToggleGroupItem>
        ))}

      </ToggleGroup>






    </div>
  )
}

export default ToggleGroupField

