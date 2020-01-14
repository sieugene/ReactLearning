import {connect} from "react-redux";
import Users from "./Users";
import {
    followAC, followUserThunkCreator, getUsersThunkCreator,
    setCurrentPageThunkCreator,
    setSearchTermTextThunkCreator,
    toggleFollowingInProgressAC,
    unFollowAC, unFollowUserThunkCreator
} from "../../redux/UsersPage-Reducer";
import React from "react";
import Preloader from "../../assets/preloader/Preloader";
import {compose} from "redux";
import {
    getCurrentPage, getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getSearchTerm,
    getTotalUsers,
    getUsersListSuperSelector
} from "../../redux/users-selectors";


//эту классовую компоненту мы создали для того чтобы
// , наша компонента Users стала чистой, а здесь мы выполняем запросы и передаем через callback
class UsersContainerClass extends React.Component {
    componentDidMount() {
        this.props.getUsersThunk(this.props.pageSize, this.props.currentPage)
        //none thunks method
        // this.props.toggleIsFetching(true);
        // UsersAPI.getUsers(this.props.pageSize, this.props.currentPage)
        //     .then(response => {
        //         this.props.toggleIsFetching(false);
        //         this.props.setUsers(response.items)
        //         this.props.setUsersTotal(response.totalCount)
        //     })
    }

    //новый запрос, на изменение выбранной страницы
    onPageCurrentChange = (pageNumber) => {
        this.props.setCurrentPageThunk(this.props.pageSize, pageNumber)
        //none thunks method
        // this.props.toggleIsFetching(true);
        // this.props.setCurrentPage(pageNumber);
        // UsersAPI.getUsers(this.props.pageSize, pageNumber)
        //     .then(response => {
        //         this.props.toggleIsFetching(false);
        //         this.props.setUsers(response.items)
        //         this.props.setUsersTotal(response.totalCount)
        //     })
    }
    //поиск по пользователям метод
    onSearchChange = (text) => {
        this.props.setSearchTermTextThunk(this.props.pageSize, text)
        //none thunks method
        // this.props.toggleIsFetching(true);
        // this.props.setSearchTermText(text);
        // UsersAPI.getUsersTerm(this.props.pageSize, text)
        //     .then(response => {
        //         this.props.toggleIsFetching(false);
        //         this.props.setUsers(response.items)
        //         this.props.setUsersTotal(response.totalCount)
        //     })
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
                       followingInProgress={this.props.followingInProgress}
                       unFollowUserThunk={this.props.unFollowUserThunk}
                       followUserThunk={this.props.followUserThunk}
                />
            </>
        )
    }
}


let mapStateToProps = (state) => {
    return {
        UsersList: getUsersListSuperSelector(state),
        pageSize: getPageSize(state),
        totalUsers: getTotalUsers(state),
        currentPage: getCurrentPage(state),
        searchTerm: getSearchTerm(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
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

//none compose
// const UsersContainer = connect(mapStateToProps,
//     {
//         follow: followAC,
//         unFollow: unFollowAC,
//         toggleFollowingInProgress: toggleFollowingInProgressAC,
//         getUsersThunk: getUsersThunkCreator,
//         setCurrentPageThunk: setCurrentPageThunkCreator,
//         setSearchTermTextThunk: setSearchTermTextThunkCreator,
//         unFollowUserThunk: unFollowUserThunkCreator,
//         followUserThunk: followUserThunkCreator
//     }
// )(UsersContainerClass);
// export default UsersContainer;

export default compose(
    connect(mapStateToProps,
        {
            follow: followAC,
            unFollow: unFollowAC,
            toggleFollowingInProgress: toggleFollowingInProgressAC,
            getUsersThunk: getUsersThunkCreator,
            setCurrentPageThunk: setCurrentPageThunkCreator,
            setSearchTermTextThunk: setSearchTermTextThunkCreator,
            unFollowUserThunk: unFollowUserThunkCreator,
            followUserThunk: followUserThunkCreator
        })
)(UsersContainerClass)