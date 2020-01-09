import React from 'react';
import './App.css';
import InfoContainer from "./Components/UserMessage/InfoContainer";
import {Route} from "react-router";
import UsersContainer from "./Components/Users/UsersContainer";
import ProfileContainer from "./Components/Profile/ProfileContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";
import Login from "./Components/Login/Login";



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
                <Route exact path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                    <Route path='/Login' render={ () => <Login/>}/>

        </div>
    );
}
export default App;
