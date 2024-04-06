import React from "react"
import s from "./FormControls.module.css"
import { Field } from "redux-form"

export const FormControl = ({input, meta:{touched, error}, children}) => { // lesson 90 - 40 min

    const hasError = touched && error;

    return  (
    <div className={hasError && s.error}>
        <div>{children}</div>
        {hasError && <span>{error}</span>}
    </div>)
}

export const Textarea = (props) => {
const {input, meta, child, ...restProps} = props;
return <FormControl {...props}><textarea {...input}{...restProps}/></FormControl>
}
export const Input = (props) => {
const {input, meta, child, ...restProps} = props;
return <FormControl {...props}><input {...input}{...restProps}/></FormControl>
}

export const сreateField = (placeholder, name, validate, component, props = {}, text = "") => (
<Field placeholder={placeholder} name={name} validate={validate} component={component} {...props}/>)
