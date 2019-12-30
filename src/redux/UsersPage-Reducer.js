const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS'


let initialState = {
    UsersList: []
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
                UsersList: [...state.UsersList, ...action.UsersList]
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

export default UsersPageReducer;