import {connect} from "react-redux";
import Users from "./Users";
import {
    followAC,
    setCurrentPageAC,
    setSearchTermAC,
    setUsersAC,
    setUsersTotalCount, toggleIsFetchingAC,
    unFollowAC
} from "../../redux/UsersPage-Reducer";
import React from "react";
import * as axios from "axios";
import s from "./Users.module.css";
import Preloader from "../../assets/preloader/Preloader";

//эту классовую компоненту мы создали для того чтобы
// , наша компонента Users стала чистой, а здесь мы выполняем запросы и передаем через callback
class UsersContainerClass extends React.Component {
    componentDidMount() {
        this.props.toggleIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${this.props.currentPage}`,{
            withCredentials: true
        })
            .then(response => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(response.data.items)
                this.props.setUsersTotal(response.data.totalCount)
            })
    }
    //новый запрос, на изменение выбранной страницы
    onPageCurrentChange = (pageNumber) => {
        this.props.toggleIsFetching(true);
        this.props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${pageNumber}`,{
            withCredentials: true
        })
            .then(response => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(response.data.items)
                this.props.setUsersTotal(response.data.totalCount)
            })
    }
    //поиск по пользователям метод
    onSearchChange = (text) => {
        this.props.toggleIsFetching(true);
        this.props.setSearchTermText(text);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=1&term=${text}`,{
            withCredentials: true
        })
            .then(response => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(response.data.items)
                this.props.setUsersTotal(response.data.totalCount)
            })
    }

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsers={this.props.totalUsers}
                   pageSize={this.props.pageSize}
                   searchTerm={this.props.searchTerm}
                   onSearchChange={this.onSearchChange}
                   currentPage={this.props.currentPage}
                   onPageCurrentChange={this.onPageCurrentChange}
                   UsersList={this.props.UsersList}
                   follow={this.props.follow}
                   unFollow={this.props.unFollow}
            />
            </>
        )
    }
}


let mapStateToProps = (state) => {
    return {
        UsersList: state.userPage.UsersList,
        pageSize: state.userPage.pageSize,
        totalUsers: state.userPage.totalUsers,
        currentPage: state.userPage.currentPage,
        searchTerm: state.userPage.searchTerm,
        isFetching: state.userPage.isFetching
    }
}
//old method mdtp
// let mapDispatchToProps = (dispatch) => {
//     return {
//         follow: (userId) => {
//             dispatch(followAC(userId))
//         },
//         unFollow: (userId) => {
//             dispatch(unFollowAC(userId))
//         },
//         setUsers: (UsersList) => {
//             dispatch(setUsersAC(UsersList))
//         },
//         setCurrentPage: (currentPage) => {
//             dispatch(setCurrentPageAC(currentPage))
//         },
//         setUsersTotal: (totalUsers) => {
//             dispatch(setUsersTotalCount(totalUsers))
//         },
//         setSearchTermText: (text) => {
//             dispatch(setSearchTermAC(text))
//         },
//         toggleIsFetching: (isFetching) => {
//             dispatch(toggleIsFetchingAC(isFetching))
//         }
//     }
// }


const UsersContainer = connect(mapStateToProps,
    {
        follow: followAC,
        unFollow: unFollowAC,
        setUsers: setUsersAC,
        setCurrentPage: setCurrentPageAC,
        setUsersTotal: setUsersTotalCount,
        setSearchTermText: setSearchTermAC,
        toggleIsFetching: toggleIsFetchingAC
    }
    )(UsersContainerClass);

export default UsersContainer;