export const getUsersList = (state) => {
    return state.userPage.UsersList;
}
export const getPageSize = (state) => {
    return state.userPage.pageSize;
}
export const getTotalUsers = (state) => {
    return state.userPage.totalUsers;
}
export const getCurrentPage = (state) => {
    return state.userPage.currentPage;
}
export const getSearchTerm = (state) => {
    return state.userPage.searchTerm;
}
export const getIsFetching = (state) => {
    return state.userPage.isFetching;
}
export const getFollowingInProgress = (state) => {
    return state.userPage.followingInProgress;
}

