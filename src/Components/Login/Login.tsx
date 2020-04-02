import React from 'react';
import { Redirect } from "react-router-dom";
import Preloader from '../../assets/preloader/Preloader';
import { ReduxLoginForm } from './LoginForm';

type PropsType = {
    isAuth: boolean,
    loading: boolean,
    captcha: string,
    loginThunk: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

const Login:React.FC<PropsType> = (props) => {
    let onSubmit = (formData:any) => {
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
