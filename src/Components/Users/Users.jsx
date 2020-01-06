import React from 'react';
import s from './Users.module.css';
import {NavLink} from "react-router-dom";
import * as axios from "axios";
import {FollowAPI} from "../../Api/Api";


const Users = (props) => {
    //считаем сколько страниц
    let totalPages = props.totalUsers / props.pageSize;
    let pages = [];
    //пробегаем и пушим
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }
    //поиск по пользователям, реф
    let newTextTerm = React.createRef();
    return (
        <div className={s.mainBlock}>
            <button disabled={true}>test</button>
            <div>
                Search on page
                <input value={props.searchTerm} ref={newTextTerm}
                       onChange={() => {
                           props.onSearchChange(newTextTerm.current.value)
                       }}
                />
            </div>
            <div className={s.pagination}>
                {pages.map(p => {
                    //map страниц, присвоение класса выбранной странице
                    //и функция на изменение страницы
                    return <span
                        className={props.currentPage === p && s.currentPage}
                        onClick={(e) => {
                            props.onPageCurrentChange(p)
                        }}>
                            {p} </span>
                })}
            </div>
            {
                props.UsersList.map(u =>
                    <div key={u.id} className={s.userMain}>
                        <NavLink to={'profile/' + u.id}><img className={s.userImg} src={
                            u.photos.small != null ? u.photos.small :
                                ' https://www.kanali6.com.cy/sites/default/files/producer_0.png'
                        }
                        /></NavLink>
                        <br/>
                        {
                            u.followed
                                ?
                                <button disabled={props.followingInProgress.some(id => id === u.id)}
                                         onClick={
                                    () => {
                                        //делаем отписку
                                        //old method, without axios instance
                                        // axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                                        //     withCredentials: true,
                                        //     headers: {
                                        //         "API-KEY": "854c2128-c8b3-4384-8ac5-b69b15ea1eff"
                                        //     }
                                        // })
                                        props.toggleFollowingInProgress(true,u.id)
                                        FollowAPI.unfollowUser(u.id)
                                            .then(response => {
                                                props.unFollow(u.id)
                                                props.toggleFollowingInProgress(false,u.id)
                                            })

                                    }
                                }>UnFollow</button>
                                :
                                <button disabled={props.followingInProgress.some(id => id === u.id)}
                                    onClick={
                                    () => {
                                        //делаем подписку
                                        //old method, without axios instance
                                        // axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
                                        //     {}, {
                                        //         withCredentials: true,
                                        //         headers: {
                                        //             "API-KEY": "854c2128-c8b3-4384-8ac5-b69b15ea1eff"
                                        //         }
                                        //     })

                                        props.toggleFollowingInProgress(true,u.id)
                                        FollowAPI.followUser(u.id)
                                            .then(response => {
                                                props.follow(u.id)
                                                props.toggleFollowingInProgress(false,u.id)
                                            })

                                    }
                                }>Follow</button>
                        }
                        < div> Name : {u.name}</div>
                        <div>Status :{u.status}</div>
                        <div>City: {'u.location.city'}</div>
                        <div>Country: {'u.location.country'}</div>
                    </div>)
            }
        </div>
    )
}

export default Users;