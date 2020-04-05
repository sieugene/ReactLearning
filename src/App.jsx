import React, { Suspense } from 'react';
import './App.css';
import { Route } from "react-router";
import ProfileContainer from "./Components/Profile/ProfileContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";
import Home from './Components/Home/Home';
import { LoginContainer } from "./Components/Login/LoginContainer";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { initiliazedThunkCreator } from "./redux/App-Reducer";
import Preloader from "./assets/preloader/Preloader";
import DialogsContainer from "./Components/Dialogs/DialogsContainer";
import MessagesContainer from './Components/Dialogs/MessagesContainer';
import GlobalErrors from './Components/GlobalErrors/GlobalErrors';
import { syncMessagesWithFrinedThunkCreator, syncAllMessagesAC } from './redux/Dialogs-Reducer';
import { Redirect } from "react-router-dom"
//import UsersContainer from "./Components/Users/UsersContainer";
const UsersContainer = React.lazy(() => import('./Components/Users/UsersContainer'));


class App extends React.Component {
    componentDidMount() {
        this.props.initiliazedThunk();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.ClearIntreval();
            this.props.syncAllMessagesAC(false);
        }
    }
    //sync message
    SyncInterval(userIdi) {
        this.timerID = setInterval(() =>
            this.props.syncMessagesWithFrinedThunk(userIdi), 5000);
    }
    ClearIntreval() { return clearInterval(this.timerID) };
    //end

    render() {
        if (!this.props.initialized) {
            return <Preloader />
        }
        return (
            <div className="App">
                <GlobalErrors />
                <HeaderContainer />
                <Route exact path='/' render={() => (<Home/>)}/>
                <div className='container'>
                    <div className='row'>
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
                            <Route path='/Dialogs' render={() => this.props.id ? <DialogsContainer /> : <Redirect to='/Login' />} />
                        </div>
                    </div>
                </div>
                <div className="container-fluid fluidToMobile">
                    <Route path='/messages/:userId?' render={() => this.props.id ?
                        <MessagesContainer SyncInterval={this.SyncInterval.bind(this)}
                            ClearIntreval={this.ClearIntreval.bind(this)}
                        /> : <Redirect to='/Login' />} />
                </div>
            </div>
        );
    }
}

let mapStateToProps = (state) => ({
    initialized: state.app.initialized,
    id: state.Auth.id
})

export default compose(
    connect(mapStateToProps, {
        initiliazedThunk: initiliazedThunkCreator,
        syncMessagesWithFrinedThunk: syncMessagesWithFrinedThunkCreator,
        syncAllMessagesAC
    }),
    withRouter
)(App)
