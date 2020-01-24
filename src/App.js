import React, {Suspense} from 'react';
import './App.css';
import {Route} from "react-router";
import ProfileContainer from "./Components/Profile/ProfileContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";
import {LoginContainer} from "./Components/Login/LoginContainer";
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {initiliazedThunkCreator} from "./redux/App-Reducer";
import Preloader from "./assets/preloader/Preloader";
import SecondSidebar from "./Components/SecondSidebar/SecondSidebar";
import Sidebar from "./Components/Sidebar/SIdebar";
import MessagesContainer from "./Components/Dialogs/MessagesContainer";
import DialogsContainer from "./Components/Dialogs/DialogsContainer";


//import UsersContainer from "./Components/Users/UsersContainer";
const UsersContainer = React.lazy(() => import('./Components/Users/UsersContainer'));

class App extends React.Component {
    componentDidMount() {
        this.props.initiliazedThunk();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className="App">
                <HeaderContainer/>
                <div className="mainApp">
                    <Sidebar/>
                    <Route
                        path='/Users'
                        render={() => {
                            return <Suspense fallback={<Preloader/>}>
                                <UsersContainer/>
                            </Suspense>
                        }
                        }/>
                    <Route exact path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                    <Route path='/Login' render={() => <LoginContainer/>}/>
                    <Route path='/Dialogs' render={() => <DialogsContainer/>}/>
                    {/*<Route path='/messages/:userId?' render={() => <MessagesContainer/>}/>*/}
                    <SecondSidebar/>
                </div>
            </div>
        );
    }
}

let mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

export default compose(
    connect(mapStateToProps, {
        initiliazedThunk: initiliazedThunkCreator
    }),
    withRouter
)(App)
