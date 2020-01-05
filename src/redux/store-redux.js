import {combineReducers, createStore} from "redux";
import infoPageReducer from '../infoPage-Reducer';
import UsersPageReducer from "./UsersPage-Reducer";
import profilePageReducer from "./ProfilePage-Reducer";
import authReducer from "./Auth-Reducer";


let reducers = combineReducers({
    infoPage: infoPageReducer,
    userPage: UsersPageReducer,
    profilePage: profilePageReducer,
    Auth: authReducer
})


let store = createStore(reducers);

window.store = store;

export default store;