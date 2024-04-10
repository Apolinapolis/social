

export type FieldValidatorType = (value:string) => undefined | string

export const required:FieldValidatorType = (value: string) => {
    if (value) return undefined
    return  'Field is required'
}

export const maxLengthCreator = (maxLength:number):FieldValidatorType => (value) => {
    if (value.length >= maxLength) return  `Max ${maxLength} simbols...`
    return undefined
}