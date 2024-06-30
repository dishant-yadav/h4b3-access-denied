import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


const SelectInput = ({ placeholder, width, options }) => {
    return (
        <Select>
            <SelectTrigger className={`w-${width}px`}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {options.map((option, idx) => {
                    return (
                        <SelectItem key={idx} value={option.value}>{option.name}</SelectItem>
                    )
                })}
            </SelectContent>
        </Select>
    )
}

export default SelectInput