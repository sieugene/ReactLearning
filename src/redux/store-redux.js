import {combineReducers, createStore} from "redux";
import infoPageReducer from '../infoPage-Reducer';
import UsersPageReducer from "./UsersPage-Reducer";


let reducers = combineReducers({
    infoPage: infoPageReducer,
    userPage: UsersPageReducer
})


let store = createStore(reducers);

window.store = store;

export default store;