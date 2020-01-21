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
            {props.error &&
            <div className={s.someError}>
                {props.error}
            </div>
            }
            <button>Login</button>
        </form>
    )
}
//create redux-form
const ReduxLoginForm = reduxForm({form: 'login'})(LoginForm)
const Login = (props) => {
    let onSubmit = (formData) => {
        //авторизация
        props.loginThunk(formData.email,formData.password,formData.rememberMe)
    }
    if(props.isAuth){
       return <Redirect to={'/profile'}/>
    }
    return (
        <div>
            <h1>Login page</h1>
            <ReduxLoginForm onSubmit={onSubmit}/>
            <h3>If authorization does not work, do it
                <a href="https://social-network.samuraijs.com/login" target="_blank" rel="noopener noreferrer"> here</a>
            </h3>
            <h3>If you do not have an account, you can register
                <a href="https://social-network.samuraijs.com/signUp" target="_blank"
                   rel="noopener noreferrer"> here</a>
            </h3>

        </div>
    )
}

export default Login
