import {applyMiddleware, combineReducers, createStore} from "redux";
import infoPageReducer from '../infoPage-Reducer';
import UsersPageReducer from "./UsersPage-Reducer";
import profilePageReducer from "./ProfilePage-Reducer";
import authReducer from "./Auth-Reducer";
import thunkMiddleware from "redux-thunk";

let reducers = combineReducers({
    infoPage: infoPageReducer,
    userPage: UsersPageReducer,
    profilePage: profilePageReducer,
    Auth: authReducer
})


let store = createStore(reducers,applyMiddleware(thunkMiddleware));

window.store = store;

export default store;