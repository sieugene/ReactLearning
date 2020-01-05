import React from 'react';
import './App.css';
import InfoContainer from "./Components/UserMessage/InfoContainer";
import {Route} from "react-router";
import UsersContainer from "./Components/Users/UsersContainer";
import ProfileContainer from "./Components/Profile/ProfileContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";



function App(props) {
    return (
        <div className="App">
            <HeaderContainer/>
            <Route
                path='/MyChat'
                render={() => <InfoContainer/>}/>
            <Route
                path='/Users'
                render={() => <UsersContainer />}/>
                <Route
                    path='/profile/:userId?'
                    render={() => <ProfileContainer/>}/>

        </div>
    );
}
export default App;
