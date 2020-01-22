import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import infoPageReducer from './infoPage-Reducer';
import UsersPageReducer from "./UsersPage-Reducer";
import profilePageReducer from "./ProfilePage-Reducer";
import authReducer from "./Auth-Reducer";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form'
import {appReducer} from "./App-Reducer";
import DialogsReducer from "./Dialogs-Reducer";


let reducers = combineReducers({
    infoPage: infoPageReducer,
    userPage: UsersPageReducer,
    profilePage: profilePageReducer,
    Auth: authReducer,
    form: formReducer,
    app: appReducer,
    dialogs: DialogsReducer
})

//extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers,composeEnhancers(
    applyMiddleware(thunkMiddleware)
));

// let store = createStore(reducers,applyMiddleware(thunkMiddleware));

window.store = store;

export default store;