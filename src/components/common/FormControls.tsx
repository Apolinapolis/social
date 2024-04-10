import React, { FC } from "react"
import s from "./FormControls.module.css"
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from "redux-form"
import { FieldValidatorType } from "../../utilits/validators/validators";


type FormControlPropsType = {
    meta: WrappedFieldMetaProps
    children: React.ReactNode
}

export type loginFormValuesType = {
    email:string
    password: string
    rememberMe:boolean
    captcha:string 
}

type loginFormValuesTypeKeys = keyof loginFormValuesType

export const FormControl:FC<FormControlPropsType> = ({meta:{touched, error}, children}) => {

    const hasError = touched && error;
    return  (
    <div className={hasError && s.error}>
        <div>{children}</div>
        {hasError && <span>{error}</span>}
    </div>)
}

export const Textarea:FC<WrappedFieldProps> = (props) => {
//const {input, meta, child, ...restProps} = props;
const {input, meta, ...restProps} = props;
return <FormControl {...props}><textarea {...input}{...restProps}/></FormControl>
}
export const Input:FC<WrappedFieldProps> = (props) => {
//const {input, meta, child, ...restProps} = props;
const {input, meta, ...restProps} = props;
return <FormControl {...props}><input {...input}{...restProps}/></FormControl>
}

export const сreateField = (
    placeholder:string | undefined, 
    name:loginFormValuesTypeKeys, 
    validate:Array<FieldValidatorType>, 
    component:string | React.FC | React.Component,
    props = {},
    text = "") => (
<Field placeholder={placeholder} name={name} validate={validate} component={component} {...props}/>)
