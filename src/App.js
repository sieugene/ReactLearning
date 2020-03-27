import React, { Suspense } from 'react';
import './App.css';
import { Route } from "react-router";
import ProfileContainer from "./Components/Profile/ProfileContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";
import { LoginContainer } from "./Components/Login/LoginContainer";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { initiliazedThunkCreator } from "./redux/App-Reducer";
import Preloader from "./assets/preloader/Preloader";
import SecondSidebar from "./Components/SecondSidebar/SecondSidebar";
import Sidebar from "./Components/Sidebar/SIdebar";
import DialogsContainer from "./Components/Dialogs/DialogsContainer";
import MessagesContainer from './Components/Dialogs/MessagesContainer';
import { syncMessagesWithFrinedThunkCreator } from './redux/Dialogs-Reducer';


//import UsersContainer from "./Components/Users/UsersContainer";
const UsersContainer = React.lazy(() => import('./Components/Users/UsersContainer'));

class App extends React.Component {
    catchAllUnhandelErrors = (promiseRejectionEvent) => {
        alert(promiseRejectionEvent.reason.message);
        console.log(promiseRejectionEvent)
    }

    componentDidMount() {
        this.props.initiliazedThunk();
        window.addEventListener("unhandledrejection", this.catchAllUnhandelErrors)
    }
    componentDidUpdate(prevProps) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.ClearIntreval();
        }
    }
    //sync message
    SyncInterval(userIdi) {
        this.timerID = setInterval(() =>
            this.props.syncMessagesWithFrinedThunk(userIdi), 5000);
    }
    ClearIntreval() {return clearInterval(this.timerID)};
    //end

    render() {
        if (!this.props.initialized) {
            return <Preloader />
        }
        return (
            <div className="App">
                <HeaderContainer />
                <div className='container'>
                    <div className='row'>
                        <div className='col xl12'>
                            <Sidebar />
                        </div>
                        <div className='col s12'>
                            <Route
                                path='/Users'
                                render={() => {
                                    return <Suspense fallback={<Preloader />}>
                                        <UsersContainer />
                                    </Suspense>
                                }
                                } />
                            <Route exact path='/profile/:userId?' render={() => <ProfileContainer />} />
                            <Route path='/Login' render={() => <LoginContainer />} />
                            <Route path='/Dialogs' render={() => <DialogsContainer />} />
                            <SecondSidebar />
                        </div>
                    </div>
                </div>
                <div className="container-fluid fluidToMobile">
                    <Route path='/messages/:userId?' render={() =>
                         <MessagesContainer SyncInterval={this.SyncInterval.bind(this)}
                         ClearIntreval={this.ClearIntreval.bind(this)}
                         />} />
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
        initiliazedThunk: initiliazedThunkCreator,
        syncMessagesWithFrinedThunk: syncMessagesWithFrinedThunkCreator

    }),
    withRouter
)(App)
