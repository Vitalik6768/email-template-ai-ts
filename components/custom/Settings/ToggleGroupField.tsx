
import React, { useState } from 'react'
import { Bold, Italic, Underline } from "lucide-react"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { Separator } from '@/components/ui/separator';


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


  console.log('taggle group value', value)
  return (
    <>
      <Separator className="my-4" />


      <div className="flex items-center space-x-2 justify-between" >
        <label className="text-sm font-medium text-muted-foreground">{label}</label>
        <ToggleGroup type="single"
          defaultValue={value}
          onValueChange={(value) => {
            if (value === '') {
            } else {
              onHandleStyleChange(value)
            }

          }}

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
    </>
  )
}

export default ToggleGroupField

