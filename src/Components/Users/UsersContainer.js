import {connect} from "react-redux";
import Users from "./Users";
import {
    followAC,
    setCurrentPageAC,
    setSearchTermAC,
    setUsersAC,
    setUsersTotalCount,
    unFollowAC
} from "../../redux/UsersPage-Reducer";
import React from "react";
import * as axios from "axios";
import s from "./Users.module.css";

//эту классовую компоненту мы создали для того чтобы
// , наша компонента Users стала чистой, а здесь мы выполняем запросы и передаем через callback
class UsersContainerClass extends React.Component {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${this.props.currentPage}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setUsersTotal(response.data.totalCount)
            })
    }
    //новый запрос, на изменение выбранной страницы
    onPageCurrentChange = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${pageNumber}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setUsersTotal(response.data.totalCount)
            })
    }
    //поиск по пользователям метод
    onSearchChange = (text) => {
        this.props.setSearchTermText(text);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${this.props.currentPage}&term=${text}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setUsersTotal(response.data.totalCount)
            })
    }

    render() {
        return (
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
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(followAC(userId))
        },
        unFollow: (userId) => {
            dispatch(unFollowAC(userId))
        },
        setUsers: (UsersList) => {
            dispatch(setUsersAC(UsersList))
        },
        setCurrentPage: (currentPage) => {
            dispatch(setCurrentPageAC(currentPage))
        },
        setUsersTotal: (totalUsers) => {
            dispatch(setUsersTotalCount(totalUsers))
        },
        setSearchTermText: (text) => {
            dispatch(setSearchTermAC(text))
        }
    }
}


const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersContainerClass);

export default UsersContainer;