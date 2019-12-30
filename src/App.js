import React from 'react';
import './App.css';
import InfoContainer from "./Components/UserMessage/InfoContainer";
import {NavLink} from "react-router-dom";
import {Route} from "react-router";
import UsersContainer from "./Components/Users/UsersContainer";


function App(props) {
    return (
        <div className="App">
            < div
                className='header'>
                <NavLink
                    to='/MyChat'> MyChat </NavLink><br/>
                <NavLink to='/Users'> Users </NavLink>
            </div>
            < Route
                path='/MyChat'
                render={() => <
                    InfoContainer/>}
            />
            < Route
                path='/Users'
                render={() => <UsersContainer />}/>

        </div>
    );
}
export default App;
