import { Input } from '@/components/ui/input'
import React from 'react'

function InputUrlField({label, value, onHandleInputChange }:any) {
    return (
        <div>
            <label className='text-sm font-medium text-muted-foreground'>{label}</label>
            <Input value={value} onChange={(event) => onHandleInputChange(event.target.value)}></Input>

        </div>
    )
}

export default InputUrlField
