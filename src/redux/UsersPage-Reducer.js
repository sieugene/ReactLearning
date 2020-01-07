import {FollowAPI, UsersAPI} from "../Api/Api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_USERS_TOTAL_COUNT = 'SET_USERS_TOTAL_COUNT';
const SET_SEARCH_TERM = 'SET_SEARCH_TERM';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOWING_PROGRESS = 'TOGGLE_FOLLOWING_PROGRESS'


let initialState = {
    UsersList: [],
    pageSize: 35,
    totalUsers: 0,
    currentPage: 1,
    searchTerm: '',
    isFetching: false,
    followingInProgress: []
}

const UsersPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                UsersList: state.UsersList.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                UsersList: state.UsersList.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
        case SET_USERS:
            return {
                ...state,
                UsersList: action.UsersList
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_USERS_TOTAL_COUNT:
            return {
                ...state,
                totalUsers: action.totalUsers
            }
        case SET_SEARCH_TERM:
            return {
                ...state,
                searchTerm: action.text
            }
        case TOGGLE_IS_FETCHING:
            return{
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_FOLLOWING_PROGRESS:
            return{
                ...state,
                followingInProgress: action.isFetching ?
                    [...state.followingInProgress, action.userId]
                    :
                    state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state

    }
}

export const followAC = (userId) => {
    return {
        type: FOLLOW, userId
    }
}
export const unFollowAC = (userId) => {
    return {
        type: UNFOLLOW, userId
    }
}
export const setUsersAC = (UsersList) => {
    return {
        type: SET_USERS, UsersList
    }
}
export const setCurrentPageAC = (currentPage) => {
    return {
        type: SET_CURRENT_PAGE, currentPage
    }
}
export const setUsersTotalCount = (totalUsers) => {
    return {
        type: SET_USERS_TOTAL_COUNT, totalUsers
    }
}
export const setSearchTermAC = (text) => {
    return {
        type: SET_SEARCH_TERM, text
    }
}
export const toggleIsFetchingAC = (isFetching) => {
    return{
        type: TOGGLE_IS_FETCHING, isFetching
    }
}
export const toggleFollowingInProgressAC = (isFetching, userId) => {
    return{
        type: TOGGLE_FOLLOWING_PROGRESS,
        isFetching, userId
    }
}

export const getUsersThunkCreator = (pageSize,currentPage) => {
    return (dispatch) => {
        dispatch(toggleIsFetchingAC(true));
        UsersAPI.getUsers(pageSize, currentPage)
            .then(response => {
                dispatch(toggleIsFetchingAC(false));
                dispatch(setUsersAC(response.items));
                dispatch(setUsersTotalCount(response.totalCount));
            })
    }
}

export const setCurrentPageThunkCreator = (pageSize,pageNumber) => {
    return (dispatch) => {
        dispatch(toggleIsFetchingAC(true));
        dispatch(setCurrentPageAC(pageNumber));
        UsersAPI.getUsers(pageSize, pageNumber)
            .then(response => {
                dispatch(toggleIsFetchingAC(false));
                dispatch(setUsersAC(response.items));
                dispatch(setUsersTotalCount(response.totalCount));
            })
    }
}

export const setSearchTermTextThunkCreator = (pageSize,text) => {
    return (dispatch) => {
        dispatch(toggleIsFetchingAC(true));
        dispatch(setSearchTermAC(text));
        UsersAPI.getUsersTerm(pageSize, text)
            .then(response => {
                dispatch(toggleIsFetchingAC(false));
                dispatch(setUsersAC(response.items));
                dispatch(setUsersTotalCount(response.totalCount));
            })
    }
}

export const unFollowUserThunkCreator = (userId) => {
    return (dispatch) => {
        dispatch(toggleFollowingInProgressAC(true, userId))
        FollowAPI.unfollowUser(userId)
            .then(response => {
                dispatch(unFollowAC(userId));
                dispatch(toggleFollowingInProgressAC(false, userId));
            })
    }
}

export const followUserThunkCreator = (userId) => {
    return (dispatch) => {
        dispatch(toggleFollowingInProgressAC(true, userId))
        FollowAPI.followUser(userId)
            .then(response => {
                dispatch(followAC(userId));
                dispatch(toggleFollowingInProgressAC(false, userId));
            })
    }
}


export default UsersPageReducer;