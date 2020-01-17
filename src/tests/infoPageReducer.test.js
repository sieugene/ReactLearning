import {render} from "@testing-library/react";
import App from "../App";
import React from "react";
import infoPageReducer, {addMessageActionCreator} from "../redux/infoPage-Reducer";


test('message added', () => {
    //state
    let state = {
        Users: [
            {
                id: 1,
                message: 'Hi',
                name: 'Chikibamboni',
                img: 'https://galaxy.esn.org/sites/default/files/cards/font-awesome_4-7-0_user_1024_0_00aeef_none.png'
            }
        ]
    }
    //action
    let action = addMessageActionCreator('Testing new message');
    let newState = infoPageReducer(state,action);
    //expect
    expect(newState.Users.length).toBe(2)
});
test('message correct', () => {
    //state
    let state = {
        Users: [
            {
                id: 1,
                message: 'Hi',
                name: 'Chikibamboni',
                img: 'https://galaxy.esn.org/sites/default/files/cards/font-awesome_4-7-0_user_1024_0_00aeef_none.png'
            }
        ]
    }
    //action
    let action = addMessageActionCreator('Testing new message');
    let newState = infoPageReducer(state,action);
    //expect
    expect(newState.Users[1].message).toBe('Testing new message')
});