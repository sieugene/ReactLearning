import { FollowAPI, UsersAPI } from "../Api/Api";
import { UserType } from "../Types/UsersTypes";
import { AppStateType } from "./store-redux";
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_USERS_TOTAL_COUNT = 'SET_USERS_TOTAL_COUNT';
const SET_SEARCH_TERM = 'SET_SEARCH_TERM';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOWING_PROGRESS = 'TOGGLE_FOLLOWING_PROGRESS'


let initialState = {
    UsersList: [] as UserType[],
    pageSize: 15,
    totalUsers: 0,
    currentPage: 1,
    searchTerm: '',
    isFetching: false,
    followingInProgress: [] as Array<Number>
}
type InitialStateType = typeof initialState;

const UsersPageReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                UsersList: state.UsersList.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true }
                    }
                    return u
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                UsersList: state.UsersList.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false }
                    }
                    return u
                })
            }
        case SET_USERS:
            return {
                ...state,
                UsersList: action.UsersList,
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
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_FOLLOWING_PROGRESS:
            return {
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

type ActionsType = FollowACType | UnFollowACType | SetUsersACType | SetCurrentPageACType |
SetUsersTotalCountType | SetSearchTermACType | ToggleIsFetchingACType | ToggleFollowingInProgressACType

//Action creators
type FollowACType = {
    type: typeof FOLLOW,
    userId: number
}
export const followAC = (userId: number): FollowACType => {
    return {
        type: FOLLOW, userId
    }
}
type UnFollowACType = {
    type: typeof UNFOLLOW,
    userId: number
}
export const unFollowAC = (userId: number): UnFollowACType => {
    return {
        type: UNFOLLOW, userId
    }
}
type SetUsersACType = {
    type: typeof SET_USERS,
    UsersList: UserType[]
}
export const setUsersAC = (UsersList: UserType[]): SetUsersACType => {
    return {
        type: SET_USERS, UsersList
    }
}
type SetCurrentPageACType = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
}
export const setCurrentPageAC = (currentPage: number): SetCurrentPageACType => {
    return {
        type: SET_CURRENT_PAGE, currentPage
    }
}
type SetUsersTotalCountType = {
    type: typeof SET_USERS_TOTAL_COUNT,
    totalUsers: number
}
export const setUsersTotalCount = (totalUsers: number): SetUsersTotalCountType => {
    return {
        type: SET_USERS_TOTAL_COUNT, totalUsers
    }
}
type SetSearchTermACType = {
    type: typeof SET_SEARCH_TERM,
    text: string
}
export const setSearchTermAC = (text: string): SetSearchTermACType => {
    return {
        type: SET_SEARCH_TERM, text
    }
}
type ToggleIsFetchingACType = {
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean
}
export const toggleIsFetchingAC = (isFetching: boolean): ToggleIsFetchingACType => {
    return {
        type: TOGGLE_IS_FETCHING, isFetching
    }
}
type ToggleFollowingInProgressACType = {
    type: typeof TOGGLE_FOLLOWING_PROGRESS,
    isFetching: boolean,
    userId: number
}
export const toggleFollowingInProgressAC = (isFetching: boolean, userId: number): ToggleFollowingInProgressACType => {
    return {
        type: TOGGLE_FOLLOWING_PROGRESS,
        isFetching, userId
    }
}
//thunks
//тип который отдает весь стейт 
//и диспатч в котором наши экшены
//первый способ return async (dispatch: DispatchType, getState:GetStateType)
//второй ThunkAction
type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionsType>
type ThunkType = ThunkAction<Promise<void>, GetStateType, unknown,ActionsType>

export const getUsersThunkCreator = (pageSize: number, currentPage: number):ThunkType => {
    return async (dispatch) => {
        dispatch(toggleIsFetchingAC(true));
        let response = await UsersAPI.getUsers(pageSize, currentPage)
        dispatch(toggleIsFetchingAC(false));
        dispatch(setUsersAC(response.items));
        dispatch(setUsersTotalCount(response.totalCount));
    }
}
export const setCurrentPageThunkCreator = (pageSize: number, pageNumber: number): ThunkType => {
    return async (dispatch) => {
        dispatch(toggleIsFetchingAC(true));
        dispatch(setCurrentPageAC(pageNumber));
        let response = await UsersAPI.getUsers(pageSize, pageNumber)
        dispatch(toggleIsFetchingAC(false));
        dispatch(setUsersAC(response.items));
        dispatch(setUsersTotalCount(response.totalCount));
    }
}

export const setSearchTermTextThunkCreator = (pageSize: number, text: string):ThunkType => {
    return async (dispatch) => {
        dispatch(toggleIsFetchingAC(true));
        dispatch(setSearchTermAC(text));
        if (!text) {
            text = ' ';
        }
        let response = await UsersAPI.getUsersTerm(pageSize, text)
        dispatch(toggleIsFetchingAC(false));
        dispatch(setUsersAC(response.items));
        dispatch(setUsersTotalCount(response.totalCount));
    }
}

//так как это наша кастомная санка, то вбиваем тут же
//dispatch - диспатч типов
//userid - параметр id который принимает
//methodApi - метод апи запроса
//action - какой action creator будет использовать, принимает userid возврашает action creator в нашем случае:
const followUnfollowFlow = async (dispatch: DispatchType, userId: number, methoApi: any, action: (userId: number) => FollowACType | UnFollowACType) => {
    dispatch(toggleFollowingInProgressAC(true, userId))
    await methoApi(userId)
    dispatch(action(userId));
    dispatch(toggleFollowingInProgressAC(false, userId));
}


export const unFollowUserThunkCreator = (userId: number):ThunkType => (dispatch) => {
    return followUnfollowFlow(dispatch, userId, FollowAPI.unfollowUser, unFollowAC)
}


export const followUserThunkCreator = (userId: number):ThunkType => (dispatch) => {
    return followUnfollowFlow(dispatch, userId, FollowAPI.followUser, followAC)
}


export default UsersPageReducer;