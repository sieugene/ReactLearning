import React, { useState } from 'react';
import s from './Users.module.css';
import Paginator from "../../assets/Paginator/Paginator";
import User from "./User";
import { SearchFormRedux } from "./SearchForm";

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
        <div >
            <SearchFormRedux onChange={onChangedTextForSearch} />
            <h5 onClick={showUsersFollowing}>Parameters:
                <a className="waves-effect waves-light btn-small black">
                    {!showFollowing ? 'Show Follow' : 'Hide Follow'}
                </a>
            </h5>
            <div className='row'>
                    {showFollowing ?
                        arrayWithSubs.length === 0 ? 'No subs' :
                            //вывод подписчиков
                            arrayWithSubs.map(u => <User
                                user={u}
                                unFollowUserThunk={props.unFollowUserThunk}
                                followUserThunk={props.followUserThunk}
                                followingInProgress={props.followingInProgress} key={u.id} />)
                        //вывод обычных пользователей
                        : props.UsersList.map(u => <User
                            user={u}
                            unFollowUserThunk={props.unFollowUserThunk}
                            followUserThunk={props.followUserThunk}
                            followingInProgress={props.followingInProgress} key={u.id} />)
                    }
            </div>
            <Paginator totalUsers={props.totalUsers} pageSize={props.pageSize}
                currentPage={props.currentPage}
                onPageCurrentChange={props.onPageCurrentChange}
                portionSize={5}
            />
        </div>
    )
})

export default Users;