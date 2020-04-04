import React from 'react';
import Profile from "./Profile";
import { connect } from "react-redux";
import {
    getProfileThunkCreator,
    setStatusUserThunkCreator,
    updateProfileUserThunkCreator, updateStatusUserThunkCreator, uploadNewPhotoThunkCreator
} from "../../redux/ProfilePage-Reducer";
import { Redirect, withRouter } from "react-router-dom";
import { compose } from "redux";
import { ProfileType } from '../../Types/ProfileTypes';
import { AppStateType } from '../../redux/store-redux';

type MapStateType = {
    id: number | null
    profile: ProfileType
    status: string | null
    loading: boolean
}
type WithRouterType = {
    match: {
        params: {
            userId: string
        }
    }
}
type MapDispatchType = {
    getProfileThunk: (userId: number) => void
    setStatusUserThunk: (userId: number) => void
    updateStatusUserThunk: (userId: number, newStatus: string | null) => void
    updateProfileUserThunk: (profile: ProfileType) => void
    uploadNewPhotoThunk: (photo: File) => void
}
type PropsType = MapStateType & MapDispatchType & WithRouterType

class ProfileContainer extends React.Component<PropsType> {
    updateProfile(userId: number) {
        this.props.getProfileThunk(userId);
        this.props.setStatusUserThunk(userId);
    }

    componentDidMount() {
        //Установка профиля пользователя
        //проверяем из url пользователя по параметрам
        let userId = Number(this.props.match.params.userId);
        this.updateProfile(userId);
    }

    componentDidUpdate(prevProps: PropsType) {
        //обновление профилей при смене url
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.updateProfile(Number(this.props.match.params.userId));
        }
    }

    render() {
        //добавление url
        if (!this.props.match.params.userId) {
            if (!this.props.id) {
                return <Redirect to={'/login'} />
            } else {
                let path = `/profile/${this.props.id}`;
                return <Redirect to={path} />
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

let mapStateToProps = (state: AppStateType): MapStateType => {
    return {
        profile: state.profilePage.profile,
        id: state.Auth.id,
        status: state.profilePage.status,
        loading: state.profilePage.loading
    }
}

export default compose(
    connect<MapStateType, MapDispatchType, null, AppStateType>
        (mapStateToProps,
            {
                // setUser: setUserProfileAC,
                getProfileThunk: getProfileThunkCreator,
                setStatusUserThunk: setStatusUserThunkCreator,
                updateStatusUserThunk: updateStatusUserThunkCreator,
                updateProfileUserThunk: updateProfileUserThunkCreator,
                uploadNewPhotoThunk: uploadNewPhotoThunkCreator
            }),
    withRouter
)(ProfileContainer)
