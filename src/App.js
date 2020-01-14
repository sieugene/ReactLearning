import React from 'react';
import './App.css';
import InfoContainer from "./Components/UserMessage/InfoContainer";
import {Route} from "react-router";
import UsersContainer from "./Components/Users/UsersContainer";
import ProfileContainer from "./Components/Profile/ProfileContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";
import {LoginContainer} from "./Components/Login/LoginContainer";
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {initiliazedThunkCreator} from "./redux/App-Reducer";
import Preloader from "./assets/preloader/Preloader";


class App extends React.Component {
    componentDidMount() {
        this.props.initiliazedThunk();
    }

    render() {
        if(!this.props.initialized){
            return <Preloader/>
        }
        return (
            <div className="App">
                <HeaderContainer/>
                <Route
                    path='/MyChat'
                    render={() => <InfoContainer/>}/>
                <Route
                    path='/Users'
                    render={() => <UsersContainer/>}/>
                <Route exact path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                <Route path='/Login' render={() => <LoginContainer/>}/>

            </div>
        );
    }
}
let mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

export default compose(
    connect(mapStateToProps,{
        initiliazedThunk:initiliazedThunkCreator
    }),
    withRouter
)(App)
