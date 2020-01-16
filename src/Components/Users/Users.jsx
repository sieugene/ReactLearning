import React, {useState} from 'react';
import s from './Users.module.css';
import {NavLink} from "react-router-dom";

const Users = React.memo(props => {
    //считаем сколько страниц
    let totalPages = props.totalUsers / props.pageSize;
    let pages = [];
    for (let i = 1; i <= Math.ceil(totalPages); i++) {
        pages.push(i);
    }
    //поиск по пользователям, реф
    let newTextTerm = React.createRef();
    //searching subs
    let arrayUsersFollowed = props.UsersList;
    const isFollowed = (obj) => {
        return obj === true;
    }
    const filterByFollowing = (item) => {
        if(isFollowed(item.followed)){
            return true;
        }
        return false;
    }
    let arrayWithSubs = arrayUsersFollowed.filter(filterByFollowing);
    //end
    let[showFollowing,setShow] = useState(false);
    let showUsersFollowing = () => {
        setShow(!showFollowing)
    };
    return (
        <div className={s.mainBlock}>
            <div>
                Search on page
                <input value={props.searchTerm} ref={newTextTerm}
                       onChange={() => { props.onSearchChange(newTextTerm.current.value)}}/>
                       <h3 onClick={showUsersFollowing}>Parameters: <button>
                           {!showFollowing ? 'Show Follow' : 'Hide Follow'}
                       </button></h3>
            </div>
            <div className={s.pagination}>
                {pages.map(p => {
                    return <span className={props.currentPage === p ? s.currentPage : ''}
                        onClick={(e) =>
                        { props.onPageCurrentChange(p) }} key={p}> {p} </span>
                })}
            </div>

            {showFollowing ?
                //вывод подписчиков
                arrayWithSubs.map(u =>
                    <div key={u.id} className={s.userMain}>
                        <NavLink to={'profile/' + u.id}><img className={s.userImg} src={
                            u.photos.small != null ? u.photos.small :
                                'https://www.kanali6.com.cy/sites/default/files/producer_0.png'
                        }
                                                             alt=''/></NavLink>
                        <br/>
                        {
                            u.followed
                                ?
                                <button disabled={props.followingInProgress.some(id => id === u.id)}
                                        onClick={() => {
                                            props.unFollowUserThunk(u.id)
                                        }}>UnFollow</button>
                                :
                                <button disabled={props.followingInProgress.some(id => id === u.id)}
                                        onClick={() => {
                                            props.followUserThunk(u.id)
                                        }}>Follow</button>
                        }
                        <div> Name : {u.name}</div>
                        <div>Status :{u.status}</div>
                        <div>City: {'u.location.city'}</div>
                        <div>Country: {'u.location.country'}</div>
                    </div>)
                //вывод обычных пользователей
                : props.UsersList.map(u =>
                        <div key={u.id} className={s.userMain}>
                            <NavLink to={'profile/' + u.id}><img className={s.userImg} src={
                                u.photos.small != null ? u.photos.small :
                                    'https://www.kanali6.com.cy/sites/default/files/producer_0.png'
                            }
                                                                 alt=''/></NavLink>
                            <br/>
                            {
                                u.followed
                                    ?
                                    <button disabled={props.followingInProgress.some(id => id === u.id)}
                                            onClick={() => {
                                                props.unFollowUserThunk(u.id)
                                            }}>UnFollow</button>
                                    :
                                    <button disabled={props.followingInProgress.some(id => id === u.id)}
                                            onClick={() => {
                                                props.followUserThunk(u.id)
                                            }}>Follow</button>
                            }
                            <div> Name : {u.name}</div>
                            <div>Status :{u.status}</div>
                            <div>City: {'u.location.city'}</div>
                            <div>Country: {'u.location.country'}</div>
                        </div>)
            }
        </div>
    )
})

export default Users;