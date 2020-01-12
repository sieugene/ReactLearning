const ADD_MESSAGE = 'ADD_MESSAGE';

let initialState = {
    Users: [
        {
            id: 1,
            message: 'Hi',
            name: 'Chikibamboni',
            img: 'https://galaxy.esn.org/sites/default/files/cards/font-awesome_4-7-0_user_1024_0_00aeef_none.png'
        }
    ]
}

const infoPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            let pushedObj = {
                id: 4, message: action.userTextMessage, name: 'Me'
                , img: 'https://www.clipartmax.com/png/middle/97-978328_avatar-icon-free-fa-user-circle-o.png'
            }
            return {
                ...state,
                Users: [...state.Users, pushedObj]
            }
        default:
            return state

    }
}

export const addMessageActionCreator = (userTextMessage) => {
    return {
        type: ADD_MESSAGE,
        userTextMessage
    }
}
export default infoPageReducer;