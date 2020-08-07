import React, { InputHTMLAttributes } from 'react'
import './styles.css'

interface InputProps extends  InputHTMLAttributes<HTMLInputElement> {
    title: string;
    name: string;
    type?: string;
}

const Input: React.FunctionComponent<InputProps> = ({title, type, name,...rest}) => {
    return (
        <div className="input-block">
            <label htmlFor={name}>{title}</label>
            <input type={type ? type : "text"} id={name} {...rest}/>
        </div>

    )
}

export default Input