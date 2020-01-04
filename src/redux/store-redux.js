import {combineReducers, createStore} from "redux";
import infoPageReducer from '../infoPage-Reducer';
import UsersPageReducer from "./UsersPage-Reducer";
import profilePageReducer from "./ProfilePage-Reducer";


let reducers = combineReducers({
    infoPage: infoPageReducer,
    userPage: UsersPageReducer,
    profilePage: profilePageReducer
})


let store = createStore(reducers);

window.store = store;

export default store;