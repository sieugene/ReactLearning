import React from "react";
import s from './FormsControls.module.css';

export const InputMessage = ({input, meta, ...props}) => {
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
export const InputAuth = ({input, meta, ...props}) => {
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
export const InputSearch = ({input, meta, ...props}) => {
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

