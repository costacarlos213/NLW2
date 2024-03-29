import React, { SelectHTMLAttributes } from 'react'
import './styles.css'

interface SelectProps extends  SelectHTMLAttributes<HTMLSelectElement> {
    title: string;
    name: string;
    options: Array<{
        value: string;
        label: string;
    }>
}

const Select: React.FunctionComponent<SelectProps> = ({title, options, name,...rest}) => {
    return (
        <div className="select-block">
            <label htmlFor={name}>{title}</label>
            <select value="" id={name} {...rest}>
                <option value="" disabled hidden></option>
                {options.map(option => {
                    return <option key={option.value} value={option.value}>{option.label}</option>
                })}
            </select>
        </div>

    )
}

export default Select