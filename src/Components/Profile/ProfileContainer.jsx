import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getProfileThunkCreator,
    setStatusUserThunkCreator,
    setUserProfileAC, updateProfileUserThunkCreator, updateStatusUserThunkCreator, uploadNewPhotoThunkCreator
} from "../../redux/ProfilePage-Reducer";
import {Redirect, withRouter} from "react-router-dom";
import {compose} from "redux";

class ProfileContainer extends React.Component {
    updateProfile(userId) {
        this.props.getProfileThunk(userId);
        this.props.setStatusUserThunk(userId);
    }

    componentDidMount() {
        //Установка профиля пользователя
        //проверяем из url пользователя по параметрам
        let userId = this.props.match.params.userId;
        this.updateProfile(userId);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //обновление профилей при смене url
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.updateProfile(this.props.match.params.userId);
        }
    }

    render() {
        //добавление url
        if (!this.props.match.params.userId) {
            if (!this.props.id) {
                return <Redirect to={'/login'}/>
            } else {
                let path = `/profile/${this.props.id}`;
                return <Redirect to={path}/>
            }
        }
        return (
                <Profile profile={this.props.profile} status={this.props.status}
                         updateStatusUserThunk={this.props.updateStatusUserThunk}
                         id={this.props.id}
                    //math params для изменения статуса
                         urlMatchParams={this.props.match.params.userId}
                         updateProfileUserThunk={this.props.updateProfileUserThunk}
                         uploadNewPhotoThunk={this.props.uploadNewPhotoThunk}
                         loading={this.props.loading}
                />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        id: state.Auth.id,
        status: state.profilePage.status,
        loading: state.profilePage.loading
    }
}


export default compose(
    connect(mapStateToProps,
        {
            setUser: setUserProfileAC,
            getProfileThunk: getProfileThunkCreator,
            setStatusUserThunk: setStatusUserThunkCreator,
            updateStatusUserThunk: updateStatusUserThunkCreator,
            updateProfileUserThunk: updateProfileUserThunkCreator,
            uploadNewPhotoThunk: uploadNewPhotoThunkCreator
        }),
    //withAuthRedirectHoc,
    withRouter
)(ProfileContainer)
