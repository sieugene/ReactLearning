import React from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { logoutThunkCreator } from "../../redux/Auth-Reducer";
import { initiliazedUserPhotoThunkCreator } from "../../redux/App-Reducer";
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { AppStateType } from "../../redux/store-redux";


type MapStateType = {
    id: number | null
    userPhoto: {
        small: string | null
        large: string | null
    }
    isAuth: boolean
    login: string | null
}
type MapDispatchType = {
    initiliazedUserPhotoThunk: (id: number) => void
    logoutThunk: () => void
}
type WithRouterType = {
    location: {
        pathname: string
    }
}
type StateType = {
    toggle: boolean
}
type PropsType = MapStateType & MapDispatchType & WithRouterType

class HeaderContainer extends React.Component<PropsType, StateType> {
    constructor(props: PropsType) {
        super(props);
        this.state = { toggle: false };
    }
    dropDownToogle() {
        this.setState({
            toggle: !this.state.toggle
        });
    }

    componentDidMount() {
        if (this.props.id) {
            this.props.initiliazedUserPhotoThunk(this.props.id);
        }
    }
    //when changing accounts, the avatar does not change, correction
    componentDidUpdate(prevProps: PropsType) {
        if (prevProps.id !== this.props.id) {
            if (this.props.id === null) {
                //none
            } else {
                this.props.initiliazedUserPhotoThunk(this.props.id);
            }
        }
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.setState({
                toggle: false
            });
        }
    }

    render() {
        return (
            <Header userPhoto={this.props.userPhoto} dropDownToogle={this.dropDownToogle.bind(this)}
                toggle={this.state.toggle} isAuth={this.props.isAuth} login={this.props.login}
                logoutThunk={this.props.logoutThunk}
            />
        )
    }
}
let mapStateToProps = (state: AppStateType): MapStateType => {
    return {
        isAuth: state.Auth.isAuth,
        login: state.Auth.login,
        id: state.Auth.id,
        userPhoto: state.app.userPhoto
    }
}

export default compose(
    connect<MapStateType, MapDispatchType, null, AppStateType>
        (mapStateToProps, {
            logoutThunk: logoutThunkCreator,
            initiliazedUserPhotoThunk: initiliazedUserPhotoThunkCreator
        }),
    withRouter)(HeaderContainer);