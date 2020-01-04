import React from 'react';
import './App.css';
import InfoContainer from "./Components/UserMessage/InfoContainer";
import {NavLink} from "react-router-dom";
import {Route} from "react-router";
import UsersContainer from "./Components/Users/UsersContainer";
import ProfileContainer from "./Components/Profile/ProfileContainer";


function App(props) {
    return (
        <div className="App">
            <div
                className='header'>
                <NavLink
                    to='/MyChat'> MyChat </NavLink><br/>
                <NavLink to='/Users'> Users </NavLink><br/>
                <NavLink to='/profile'> Profile </NavLink>
            </div>
            <Route
                path='/MyChat'
                render={() => <
                    InfoContainer/>}
            />
            <Route
                path='/Users'
                render={() => <UsersContainer />}/>
                <Route
                    path='/profile'
                    render={() => <ProfileContainer/>}/>

        </div>
    );
}
export default App;
