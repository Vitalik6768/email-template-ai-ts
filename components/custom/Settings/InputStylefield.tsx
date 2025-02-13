import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import React from 'react'

function InputStylefield({ label, value, onHandleStyleChange }: any) {

    const formatedValue = (value: string) => {
        return Number(value.toString().replace('px', ''))
    }
    return (
        <>
            <Separator className="my-4" />
            <div className="flex items-center space-x-2 justify-between">
                <label className="text-sm font-medium text-muted-foreground">{label}</label>
                <div className="flex items-center">
                    <Input className="w-14 h-7 rounded-r-none text-sm px-2" type='text' value={formatedValue(value)} onChange={(event) => onHandleStyleChange(event.target.value + 'px')} />
                    <span className="inline-flex items-center px-2 h-7 text-xs font-medium text-muted-foreground bg-muted border border-l-0 border-input rounded-r-md mx-1">
                        px
                    </span>
                </div>
            </div>
        </>
    )
}

export default InputStylefield
