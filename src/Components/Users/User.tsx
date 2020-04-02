import React from 'react';
import { NavLink } from "react-router-dom";
import userPhoto from './../../assets/images/userPhoto.png'
import { UserType } from '../../Types/UsersTypes';

type PropsType = {
    user: UserType
    unFollowUserThunk: (userId: number) => void
    followUserThunk: (userId: number) => void
    followingInProgress: Array<Number>
}

const User:React.FC<PropsType> = ({ user, unFollowUserThunk, followUserThunk, followingInProgress }) => {
    return (
        <div className='col xl6 s12 l6 m12'>
            <div className="card">
                <div className="card-image waves-effect waves-block waves-light p10">
                    <NavLink to={'profile/' + user.id}><img className="activator center-img" src={
                        user.photos.small != null ? user.photos.small : userPhoto} alt='' />
                    </NavLink>
                </div>
                <div className="card-content">
                    <span className="card-title activator grey-text text-darken-4">
                        <p className='truncate'>Name : {user.name}</p>
                        <p className='truncate'>Status : {user.status}</p>
                    </span>
                    {
                        user.followed
                            ?
                            <button disabled={followingInProgress.some(id => id === user.id)}
                                onClick={() => {
                                    unFollowUserThunk(user.id)
                                }} className='btn waves-effect waves-light black'>UnFollow</button>
                            :
                            <button disabled={followingInProgress.some(id => id === user.id)}
                                onClick={() => {
                                    followUserThunk(user.id)
                                }} className='btn waves-effect waves-light indigo lighten-5 black-text'>Follow</button>
                    }
                    <button className='btn waves-effect waves-light indigo lighten-5 black-text'>
                        <NavLink to={'/messages/' + user.id} className='black-text'>Send message</NavLink>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default User;