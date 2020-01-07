import {ProfileAPI} from "../Api/Api";

const SET_USER_PROFILE = 'SET_USER_PROFILE';

let initialState = {
    profile: null
}

const profilePageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        default:
            return state
    }
}

export const setUserProfileAC = (profile) => {
    return {
        type: SET_USER_PROFILE, profile
    }
}

export const getProfileThunkCreator = (userId) => {
    return (dispatch) => {
        ProfileAPI.getProfile(userId)
            .then(response => {
                dispatch(setUserProfileAC(response.data));
            })
    }
}
export default profilePageReducer;