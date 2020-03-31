import React, { useState } from 'react';
import Paginator from "../../assets/Paginator/Paginator";
import User from "./User";
import { SearchFormRedux } from "./SearchForm";
import {UserType} from "./../../Types/UsersTypes";

type PropsType = {
    totalUsers: number,
    pageSize: number,
    currentPage: number,
    onPageCurrentChange: (pageNumber: number) => void,
    followUserThunk: (userId: number) => void,
    unFollowUserThunk: (userId: number) => void,
    followingInProgress: Array<Number>,
    onSearchChange: (textForSearch: string) => void
    UsersList: UserType[],
    searchTerm?: string | null
}

const Users:React.FC<PropsType> = React.memo(props => {
    //for react form

    let onChangedTextForSearch = (formData:{searchForm:string}) => {
        props.onSearchChange(formData.searchForm)
    }
    //searching subs
    let arrayUsersFollowed = props.UsersList;
    const isFollowed = (obj:boolean) => {
        return obj === true;
    }
    const filterByFollowing = (item:{followed:boolean}) => {
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
            <p className="waves-effect waves-light btn-small black"
                onClick={showUsersFollowing}>
                {!showFollowing ? 'Show Follow' : 'Hide Follow'}
            </p>
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