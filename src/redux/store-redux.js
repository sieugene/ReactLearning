import {applyMiddleware, combineReducers, createStore} from "redux";
import infoPageReducer from '../infoPage-Reducer';
import UsersPageReducer from "./UsersPage-Reducer";
import profilePageReducer from "./ProfilePage-Reducer";
import authReducer from "./Auth-Reducer";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form'

let reducers = combineReducers({
    infoPage: infoPageReducer,
    userPage: UsersPageReducer,
    profilePage: profilePageReducer,
    Auth: authReducer,
    form: formReducer
})


let store = createStore(reducers,applyMiddleware(thunkMiddleware));

window.store = store;

export default store;