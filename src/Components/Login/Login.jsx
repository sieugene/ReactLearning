import React from 'react';
import { Field, reduxForm } from 'redux-form';


//create local form
const LoginForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder='Email' name='email' component='input'/>
            </div>
            <div>
                <Field placeholder='Password' name='password' type='Password' component='input'/>
            </div>
            <div>
                <Field name='rememberMe' component="input" type="Checkbox"/>Remember Me
            </div>
            <button>Login</button>
        </form>
    )
}
//create redux-form
const ReduxLoginForm = reduxForm({form: 'login'})(LoginForm)
const Login = (props) => {
    let onSubmit = (formData) => {
        console.log(formData)
    }
    return (
        <div>
            <h1>Login page</h1>
            <ReduxLoginForm onSubmit={onSubmit}/>
            <h3>If authorization does not work, do it
                <a href="https://social-network.samuraijs.com/login" target="_blank" rel="noopener noreferrer"> here</a>
            </h3>
            <h3>If you do not have an account, you can register
                <a href="https://social-network.samuraijs.com/signUp" target="_blank" rel="noopener noreferrer"> here</a>
            </h3>

        </div>
    )
}

export default Login
