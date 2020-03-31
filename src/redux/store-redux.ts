import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import UsersPageReducer from "./UsersPage-Reducer";
import profilePageReducer from "./ProfilePage-Reducer";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form'
import DialogsReducer from "./Dialogs-Reducer";
import { appReducer } from "./App-Reducer";
import authReducer from "./Auth-Reducer";


let reducers = combineReducers({
    userPage: UsersPageReducer,
    profilePage: profilePageReducer,
    Auth: authReducer,
    form: formReducer,
    app: appReducer,
    dialogs: DialogsReducer
})

//
type RootReducerType = typeof reducers;
export type AppStateType = ReturnType<RootReducerType>
//Более глобальный просмотр стейта


//extension
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers,composeEnhancers(
    applyMiddleware(thunkMiddleware)
));

// let store = createStore(reducers,applyMiddleware(thunkMiddleware));
// @ts-ignore
window.store = store;

export default store;