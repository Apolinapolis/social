import React from "react"
import s from "../common/FormControls.module.css"
import { InjectedFormProps, reduxForm } from "redux-form"
import { сreateField, Input, loginFormValuesType } from "../common/FormControls"
import { required } from '../../utilits/validators/validators';
import { connect } from "react-redux";
import { login } from "../Redux/authReducer";
import { Navigate } from "react-router-dom";
import { appStateType } from "../Redux/reduxStore";

type LoginFormOwnProps = {
    captchaUrl: string | null
}

const LoginForm:React.FC<InjectedFormProps< loginFormValuesType, LoginFormOwnProps > & LoginFormOwnProps > = ({ handleSubmit, error, captchaUrl }) => {
    return (
        <form onSubmit={handleSubmit}>
            {сreateField("Email", "email", [required], Input)}
            {сreateField("Password", "password", [required], Input, { type: "password" })}
            {сreateField(undefined, "rememberMe", [], Input, { type: "checkbox" }, "Remember me")}

            {captchaUrl && <div className={s.cap}><img src={captchaUrl} /></div>}
            {captchaUrl && сreateField("simbols from captcha ", "captcha", [required], Input, {} )}

            {error && <div className={s.formSummaryError}>{error}</div>}
            <div><button>Submit</button></div></form>)
}

const LoginReduxForm = reduxForm<loginFormValuesType , LoginFormOwnProps>({ form: "login" })(LoginForm)

type mapStateToPropsType = {
    captchaUrl: string | null
    isAuth: boolean
}

type mapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

/* type loginFormValuesType = {
    email:string
    password: string
    rememberMe:boolean
    captcha:string 
} */

const Login:React.FC<mapStateToPropsType & mapDispatchToPropsType> = (props) => {
    const onSubmit = (formdata:loginFormValuesType) => { props.login(formdata.email, formdata.password, formdata.rememberMe, formdata.captcha) }
    if (props.isAuth) return <Navigate to={"/profile"} />
    return <div>
        <h1>LogiN</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
}
const mapStateToProps = (state:appStateType):mapStateToPropsType => ({ isAuth: state.auth.isAuth, captchaUrl: state.auth.captchaUrl })
export default connect(mapStateToProps, { login })(Login)