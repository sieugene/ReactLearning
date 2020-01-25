import React from 'react';
import s from './Users.module.css';
import {NavLink} from "react-router-dom";
import userPhoto from './../../assets/images/userPhoto.png'

const User = ({user, unFollowUserThunk, followUserThunk, followingInProgress}) => {
    return (
        <div key={user.id} className={s.userMain}>
            <div className={s.userImgBlock}>
                <NavLink to={'profile/' + user.id}><img className={s.userImg} src={
                    user.photos.small != null ? user.photos.small : userPhoto} alt=''/></NavLink>
            </div>
            <div className={s.userInfoBlock}>
                <h4>Name : {user.name}</h4>
                <h5>Status : {user.status}</h5>
                {
                    user.followed
                        ?
                        <button disabled={followingInProgress.some(id => id === user.id)}
                                onClick={() => {
                                    unFollowUserThunk(user.id)
                                }}>UnFollow</button>
                        :
                        <button disabled={followingInProgress.some(id => id === user.id)}
                                onClick={() => {
                                    followUserThunk(user.id)
                                }}>Follow</button>
                }
                <div>
                    <button className={s.sendMessage}>
                        <NavLink to={'/Dialogs/messages/' + user.id}>Send message</NavLink>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default User;