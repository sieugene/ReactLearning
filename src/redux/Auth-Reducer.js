const SET_AUTH_USER = 'SET_AUTH_USER';

let initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER:
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
         default :
             return state
    }
}

export const setAuthUserAC = (id,login,email) => {
    return {
        type: SET_AUTH_USER,
        data: {id,login,email}
    }
}

export default authReducer;