import React from 'react';
import Info from "../Info";
import {addMessageActionCreator, messageTextChangeActionCreator} from "../../infoPage-Reducer";
import UserMessage from "./UserMessage";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    let stateMap = state.infoPage.Users;
    let getUsers = stateMap.map(u => <UserMessage message={u.message} key={u.id} id={u.id} name={u.name} img={u.img}/>);
    return {
        getUsers: getUsers,
        userMessage: state
    }
}
//old method mdtp
// let MapDispatchToProps = (dispatch) => {
//     return {
//         UpdateChangeMessage: (text) => {
//             dispatch(messageTextChangeActionCreator(text))
//         },
//         NewAddMessage: () => {
//             dispatch(addMessageActionCreator())
//         }
//     }
// }

const InfoContainer = connect(mapStateToProps, {
    UpdateChangeMessage: messageTextChangeActionCreator,
    NewAddMessage: addMessageActionCreator
})(Info);
export default InfoContainer;