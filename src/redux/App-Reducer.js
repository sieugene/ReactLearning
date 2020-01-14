import {authMeThunkCreator} from "./Auth-Reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

let initialState = {
    initialized: false,
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

export const initializedSuccessAC = () => {
    return{
        type: INITIALIZED_SUCCESS
    }
}

export const initiliazedThunkCreator = () => (dispatch) => {
    let promise = dispatch(authMeThunkCreator());
    promise.then(() => {
        dispatch(initializedSuccessAC());
    })

}
