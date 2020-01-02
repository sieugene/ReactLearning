import {connect} from "react-redux";
import Users from "./Users";
import {followAC, setCurrentPageAC, setUsersAC, setUsersTotalCount, unFollowAC} from "../../redux/UsersPage-Reducer";


let mapStateToProps = (state) => {
    return {
        UsersList: state.userPage.UsersList,
        pageSize: state.userPage.pageSize,
        totalUsers: state.userPage.totalUsers,
        currentPage: state.userPage.currentPage
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
        }
    }
}


const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;