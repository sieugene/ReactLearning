import React from 'react';
import s from './Users.module.css';
import {NavLink} from "react-router-dom";
import userPhoto from './../../assets/images/userPhoto.png'

const User = ({user, unFollowUserThunk, followUserThunk, followingInProgress}) => {
    return (
        <div key={user.id} className={s.userMain}>
            <NavLink to={'profile/' + user.id}><img className={s.userImg} src={
                user.photos.small != null ? user.photos.small : userPhoto} alt=''/></NavLink>
            <br/>
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
            <div>Name : {user.name}</div>
            <div>Status : {user.status}</div>
        </div>
    )
}

export default User;