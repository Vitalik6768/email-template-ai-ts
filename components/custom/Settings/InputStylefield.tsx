import { Input } from '@/components/ui/input'
import React from 'react'

function InputStylefield({ label, value, onHandleStyleChange }: any) {

    const formatedValue = (value: string) => {
        return Number(value.toString().replace('px', ''))
    }
    return (
        <div>
            <label>{label}</label>
            <div className='flex'>

                <br />
                <Input type='text' value={formatedValue(value)} onChange={(event) => onHandleStyleChange(event.target.value + 'px')} />
                <h2 className=' p-1 bg-gray-100 rounded-r-lg -ml-2'>px</h2>
            </div>

        </div>
    )
}

export default InputStylefield
