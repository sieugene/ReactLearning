import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { InputAuth } from "../../assets/FormControl/FormsControls";
import { required } from "../utils/validators/validators";
import { Redirect } from "react-router-dom";
import s from './../../assets/FormControl/FormsControls.module.css';
import Preloader from './../../assets/preloader/Preloader';

//testing validate maxLength
//let maxLength5 = maxLengthCreator(5);
//create local form
const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder='Email' validate={[required]} name='email' component={InputAuth} />
            </div>
            <div>
                <Field placeholder='Password' validate={[required]}
                    name='password' type='Password' component={InputAuth} />
            </div>
            <div>
                <p>
                    <label>
                        <Field name='rememberMe' component="input" type="Checkbox" />
                        <span>Remember Me</span>
                    </label>
                </p>
            </div>
            {props.error && <div className={s.someError}>{props.error}</div>}
            {props.captcha && <div><img src={props.captcha} alt={''} /></div>}
            {props.captcha && <div><Field placeholder='enter symbols' name='captcha' component='input'
                validate={[required]} /></div>}
            <button className='waves-effect waves-light btn-small mr10'>Login</button>
            <a href='https://social-network.samuraijs.com/'
                target='_blank' className='waves-effect waves-light btn-small  deep-purple lighten-1' rel="noopener noreferrer">
                Go to API
                </a>
        </form>
    )
}
//create redux-form
const ReduxLoginForm = reduxForm({ form: 'login' })(LoginForm)
const Login = (props) => {
    let onSubmit = (formData) => {
        //авторизация
        props.loginThunk(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if (props.isAuth) {
        return <Redirect to={'/profile'} />
    }
    return (
        <div>
            {props.loading && <Preloader />}
            <div className="authBlock">
                <h3>Login</h3>
                <ReduxLoginForm onSubmit={onSubmit} captcha={props.captcha} />
                <h3>Use to log in:</h3>
                <ul>
                    <li>
                        <h5>
                            Email: free@samuraijs.com
                    </h5>
                    </li>
                    <li>
                        <h5>
                            Password: free
                    </h5>
                    </li>
                </ul>
                <h5>If authorization does not work, do it
                <a href="https://social-network.samuraijs.com/login" target="_blank" rel="noopener noreferrer"> here</a>
                </h5>
            </div>
        </div>
    )
}

export default Login
