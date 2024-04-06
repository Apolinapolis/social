import React from "react"
import s from "../common/FormControls.module.css"
import { reduxForm } from "redux-form"
import { сreateField, Input } from "../common/FormControls"
import { required } from '../../utilits/validators/validators';
import { connect } from "react-redux";
import { login } from "../Redux/authReducer";
import { Navigate } from "react-router-dom";

const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
    return (
        <form onSubmit={handleSubmit}>
            {сreateField("Email", "email", [required], Input)}
            {сreateField("Password", "password", [required], Input, { type: "password" })}
            {сreateField(null, "Remember me", [], Input, { type: "checkbox" }, "Remember me")}

            {captchaUrl && <div className={s.cap}><img src={captchaUrl} /></div>}
            {captchaUrl && сreateField("simbols from captcha ", "captcha", [required], Input, {} )}

            {error && <div className={s.formSummaryError}>{error}</div>}
            <div><button>Submit</button></div></form>)
}

const LoginReduxForm = reduxForm({ form: "login" })(LoginForm)

const Login = (props) => {
    const onSubmit = (formdata) => { props.login(formdata.email, formdata.password, formdata.rememberMe, formdata.captcha) }
    if (props.isAuth) return <Navigate to={"/profile"} />
    return <div>
        <h1>LogiN</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
}
const mapStateToProps = (state) => ({ isAuth: state.auth.isAuth, captchaUrl: state.auth.captchaUrl })
export default connect(mapStateToProps, { login })(Login)