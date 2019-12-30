const ADD_MESSAGE = 'ADD_MESSAGE';
const MESSAGE_TEXT_CHANGE = 'MESSAGE_TEXT_CHANGE';

let initialState = {
    Users: [
        {
            id: 1,
            message: 'hi, from state message',
            name: 'Chikibamboni',
            img: 'https://avatars.mds.yandex.net/get-zen_doc/1567507/pub_5cb42180fd70f300b4fd9586_5cb4218bf5fa5400b4015b84/scale_1200'
        },
        {
            id: 2,
            message: 'tested message',
            name: 'Chikibamboni',
            img: 'https://avatars.mds.yandex.net/get-zen_doc/1567507/pub_5cb42180fd70f300b4fd9586_5cb4218bf5fa5400b4015b84/scale_1200'
        },
        {
            id: 3,
            message: '123fdf',
            name: 'Chikibamboni',
            img: 'https://avatars.mds.yandex.net/get-zen_doc/1567507/pub_5cb42180fd70f300b4fd9586_5cb4218bf5fa5400b4015b84/scale_1200'
        },
    ],
    userMessage: ''
}

const infoPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            //объект который пушим
            let pushedObj = {
                id: 4, message: state.userMessage, name: 'Me'
                , img: 'https://i.kym-cdn.com/entries/icons/facebook/000/028/976/cover.jpg'
            }
            return {
                //новый метод
                ...state,
                //конструкция if else
                ...state.userMessage === ''
                    ?
                    alert('Input is empty!')
                    :
                    {
                        Users: [...state.Users, pushedObj]
                    },
                userMessage: ''
            }
        //------------------------------------
        //Старый метод
        // let copyState = {...state};
        // copyState.userMessage = {...state.userMessage};
        // if (state.userMessage === '') {
        //     alert('Input is empty!')
        // } else {
        //     state.Users.push(
        //         {
        //             id: 4, message: state.userMessage, name: 'Me'
        //             , img: 'https://i.kym-cdn.com/entries/icons/facebook/000/028/976/cover.jpg'
        //         },
        //     )
        // }
        // copyState.userMessage = '';
        // return copyState

        case MESSAGE_TEXT_CHANGE:
            //новый метод
            return {
                ...state,
                userMessage: action.text
            }
        //------------------------------------
        //старый метод
        // state.userMessage = action.text;
        // return {...state}
        default:
            return state

    }
}

export const addMessageActionCreator = () => {
    return {
        type: ADD_MESSAGE
    }
}
export const messageTextChangeActionCreator = (text) => {
    return {
        type: MESSAGE_TEXT_CHANGE, text: text
    }
}

export default infoPageReducer;