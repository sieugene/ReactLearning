import React from 'react'
import { reduxForm, InjectedFormProps } from 'redux-form';
import { Field } from 'redux-form';
import { InputAuth } from '../../assets/FormControl/FormsControls';
import { required } from '../utils/validators/validators';
import s from './../../assets/FormControl/FormsControls.module.css';

type PropsType = {
    captcha?: string
}

const LoginForm: React.FC<PropsType & InjectedFormProps<{}, PropsType>> = (props) => {
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

export const ReduxLoginForm = reduxForm<{}, PropsType>({ form: 'login' })(LoginForm)