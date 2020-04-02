import React from "react";
import s from './FormsControls.module.css';

type PropsType = {
    input: {
        name: string
        onBlur:(event:any) => void
        onChange:(event:any) => void
        onDragStart:(event:any) => void
        onDrop: (event:any) => void
        onFocus: (event:any) => void
        value: string
    }
    meta: {
        active: boolean
        asyncValidating: boolean
        autofilled: boolean
        dirty: boolean
        error: undefined
        form: string
        initial: string
        warning: undefined
        invalid: boolean
        pristine: boolean
        submitting: boolean
        submitFailed: boolean
        touched: boolean
        valid: boolean
        visited: boolean
    }
    placeholder: string
}

export const InputMessage:React.FC<PropsType> = ({input, meta, ...props}) => {
    let activeError = meta.touched && meta.error ? s.error : ' ';
    return (
        <div className={s.FormControl}>
            <div className={activeError}>
                <input {...input} {...props} /><br/>
                {meta.touched && meta.error && <span>{meta.error}</span>}
            </div>
        </div>
    )
}
export const InputAuth:React.FC<PropsType> = ({input, meta, ...props}) => {
    let activeError = meta.touched && meta.error ? s.error : ' ';
    return (
        <div className={s.FormControl}>
            <div className={activeError}>
                <input {...input} {...props} /><br/>
                {meta.touched && meta.error && <span>{meta.error}</span>}
            </div>
        </div>
    )
}
export const InputSearch:React.FC<PropsType> = ({input, meta, ...props}) => {
    let activeError = meta.touched && meta.error ? s.error : ' ';
    return (
        <div className={s.FormControl}>
            <div className={activeError}>
                <input {...input} {...props} /><br/>
                {meta.touched && meta.error && <span>{meta.error}</span>}
            </div>
        </div>
    )
}

