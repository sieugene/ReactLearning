import {createSelector} from "reselect";
import { AppStateType } from "./store-redux";

export const getUsersList = (state:AppStateType) => {
    return state.userPage.UsersList;
}
//reselect library, simple
export const getUsersListSubSuperSelector = createSelector(getUsersList,(UsersList) => {
    return UsersList.filter(u => true)
})
export const getPageSize = (state:AppStateType) => {
    return state.userPage.pageSize;
}
export const getTotalUsers = (state:AppStateType) => {
    return state.userPage.totalUsers;
}
export const getCurrentPage = (state:AppStateType) => {
    return state.userPage.currentPage;
}
export const getSearchTerm = (state:AppStateType) => {
    return state.userPage.searchTerm;
}
export const getIsFetching = (state:AppStateType) => {
    return state.userPage.isFetching;
}
export const getFollowingInProgress = (state:AppStateType) => {
    return state.userPage.followingInProgress;
}

