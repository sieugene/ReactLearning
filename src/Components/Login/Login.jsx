import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {InputAuth} from "../../assets/FormControl/FormsControls";
import {required} from "../utils/validators/validators";
import {Redirect} from "react-router-dom";
import s from './../../assets/FormControl/FormsControls.module.css';

//testing validate maxLength
//let maxLength5 = maxLengthCreator(5);
//create local form
const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder='Email' validate={[required]} name='email' component={InputAuth}/>
            </div>
            <div>
                <Field placeholder='Password' validate={[required]}
                       name='password' type='Password' component={InputAuth}/>
            </div>
            <div>
                <Field name='rememberMe' component="input" type="Checkbox"/>Remember Me
            </div>
            {props.error && <div className={s.someError}>{props.error}</div>}
            {props.captcha && <div><img src={props.captcha} alt={''}/></div>}
            {props.captcha && <div><Field placeholder='enter symbols' name='captcha' component='input'
                                          validate={[required]}/></div>}
            <button>Login</button>
        </form>
    )
}
//create redux-form
const ReduxLoginForm = reduxForm({form: 'login'})(LoginForm)
const Login = (props) => {
    let onSubmit = (formData) => {
        //авторизация
        props.loginThunk(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }
    return (
        <div>
            <h1>Login page</h1>
            <ReduxLoginForm onSubmit={onSubmit} captcha={props.captcha}/>
            <h3>To interact with a social network:</h3>
            <ul>
                <li>
                    <h3>register
                        <a href="https://social-network.samuraijs.com/signUp" target="_blank"
                           rel="noopener noreferrer"> here</a>
                    </h3>
                </li>
                <li>
                    <h3>
                        Go to settings, take the API KEY and replace it in the
                        <b style={{color: 'red'}}> src/api/Api.js</b>
                    </h3>
                </li>
                <li>
                    <h3>Log in with your account</h3>
                </li>
                <li>
                    <h4>Also check out the request
                        <a href="https://social-network.samuraijs.com/Default/Default/Limits"
                           target="_blank" rel="noopener noreferrer" style={{color:'orange'}}>{' '}
                            restriction
                        </a>
                    </h4>
                </li>

            </ul>
            <h3>If authorization does not work, do it
                <a href="https://social-network.samuraijs.com/login" target="_blank" rel="noopener noreferrer"> here</a>
            </h3>


        </div>
    )
}

export default Login
