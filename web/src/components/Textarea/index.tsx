import React, { TextareaHTMLAttributes } from 'react'
import './styles.css'

interface TextareaProps extends  TextareaHTMLAttributes<HTMLTextAreaElement> {
    title: string;
    name: string;
}

const Textarea: React.FunctionComponent<TextareaProps> = ({title, name,...rest}) => {
    return (
        <div className="textarea-block">
            <label htmlFor={name}>{title}</label>
            <textarea id={name} {...rest}/>
        </div>

    )
}

export default Textarea