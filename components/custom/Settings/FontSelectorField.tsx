import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from '@/components/ui/separator'

function FontSelectorField({ label, value, onHandleStyleChange }: any) {
    const fontFamilies = [
        "Arial, sans-serif",
        "Helvetica, sans-serif",
        "Georgia, serif",
        "Times New Roman, serif",
        "Courier New, monospace",
        "Verdana, sans-serif",
        "Trebuchet MS, sans-serif",
        "Arial Black, sans-serif",
        "Impact, sans-serif",
    ]

    return (
        <>
            <Separator className="my-4" />
            <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">{label}</label>
                <Select onValueChange={onHandleStyleChange} value={value}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a font family" />
                    </SelectTrigger>
                    <SelectContent>
                        {fontFamilies.map((font) => (
                            <SelectItem key={font} value={font}>
                                {font.split(",")[0]}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </>
    )
}

export default FontSelectorField