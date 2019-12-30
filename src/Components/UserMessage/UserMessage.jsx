import React from 'react';
import s from './UserMessage.module.css';

const UserMessage = (props) => {
    return (
        <div>
            <div className={s.contain_message}>
                <div className={s.left__contain}>
                    <img src={props.img} alt="" className={s.userImg}/>
                </div>
                <div className={s.right__contain}>
                    <div> {props.name}</div>
                    <div>{props.message}</div>
                </div>
            </div>
            <br/>

        </div>
    )
}

export default UserMessage;