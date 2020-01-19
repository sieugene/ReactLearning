import React, {useState} from 'react';
import s from './Users.module.css';
import Paginator from "../../assets/Paginator/Paginator";
import User from "./User";
import {SearchFormRedux} from "./SearchForm";

const Users = React.memo(props => {
    //for react form
    
    let onChangedTextForSearch = (formData) => {
        props.onSearchChange(formData.searchForm)
    }
    //searching subs
    let arrayUsersFollowed = props.UsersList;
    const isFollowed = (obj) => {
        return obj === true;
    }
    const filterByFollowing = (item) => {
        if (isFollowed(item.followed)) {
            return true;
        }
        return false;
    }
    let arrayWithSubs = arrayUsersFollowed.filter(filterByFollowing);
    //end
    let [showFollowing, setShow] = useState(false);
    let showUsersFollowing = () => {
        setShow(!showFollowing)
    };

    return (
        <div className={s.mainBlock}>
            <div>
                <SearchFormRedux onChange={onChangedTextForSearch}/>
                <h3 onClick={showUsersFollowing}>Parameters: <button>
                    {!showFollowing ? 'Show Follow' : 'Hide Follow'}
                </button></h3>
            </div>
            <Paginator totalUsers={props.totalUsers} pageSize={props.pageSize} currentPage={props.currentPage}
                       onPageCurrentChange={props.onPageCurrentChange}
                       portionSize={10}
            />
            {showFollowing ?
                //вывод подписчиков
                arrayWithSubs.map(u => <User
                    user={u}
                    unFollowUserThunk={props.unFollowUserThunk}
                    followUserThunk={props.followUserThunk}
                    followingInProgress={props.followingInProgress} key={u.id}/>)
                //вывод обычных пользователей
                : props.UsersList.map(u => <User
                    user={u}
                    unFollowUserThunk={props.unFollowUserThunk}
                    followUserThunk={props.followUserThunk}
                    followingInProgress={props.followingInProgress} key={u.id}/>)
            }
        </div>
    )
})

export default Users;