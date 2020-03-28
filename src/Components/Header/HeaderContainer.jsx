import React from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { logoutThunkCreator } from "../../redux/Auth-Reducer";
import { initiliazedUserPhotoThunkCreator } from "../../redux/App-Reducer";
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';


class HeaderContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { toggle: false };
    }
    dropDownToogle() {
        this.setState({
            toggle: !this.state.toggle
        });
    }

    componentDidMount() {
        this.props.initiliazedUserPhotoThunk(this.props.id);
    }
    //when changing accounts, the avatar does not change, correction
    componentDidUpdate(prevProps, prevState, snapshot) {
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
            <Header {...this.props} userPhoto={this.props.userPhoto} dropDownToogle={this.dropDownToogle.bind(this)}
                toggle={this.state.toggle}
            />
        )
    }
}
let mapStateToProps = (state) => {
    return {
        isAuth: state.Auth.isAuth,
        login: state.Auth.login,
        id: state.Auth.id,
        userPhoto: state.app.userPhoto
    }
}

export default compose(
    connect(mapStateToProps, {
        logoutThunk: logoutThunkCreator,
        initiliazedUserPhotoThunk: initiliazedUserPhotoThunkCreator
    }),
    withRouter)(HeaderContainer);