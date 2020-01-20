import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getProfileThunkCreator,
    setStatusUserThunkCreator,
    setUserProfileAC, updateProfileUserThunkCreator, updateStatusUserThunkCreator
} from "../../redux/ProfilePage-Reducer";
import {Redirect, withRouter} from "react-router-dom";
import {withAuthRedirectHoc} from "../HOC/WithAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {
    componentDidMount() {
        //Установка профиля пользователя
        //проверяем из url пользователя по параметрам
        let userId = this.props.match.params.userId;
        //устанавливаем пользователя и получаем массив
        this.props.getProfileThunk(userId);
        //установка статуса
        this.props.setStatusUserThunk(userId);
    }
    render() {
        //синхронизация профиля
        //добавление id к url после авторизации
        if (!this.props.match.params.userId) {
            if (!this.props.id) {
                return <Redirect to={'/login'}/>
            } else {
                let path = `/profile/${this.props.id}`;
                this.props.getProfileThunk(this.props.id);
                this.props.setStatusUserThunk(this.props.id);
                return <Redirect to={path}/>
            }
        }
        return (
            <div>
                <Profile profile={this.props.profile} status={this.props.status}
                         updateStatusUserThunk={this.props.updateStatusUserThunk}
                         id={this.props.id}
                         //math params для изменения статуса
                        urlMatchParams={this.props.match.params.userId}
                         updateProfileUserThunk={this.props.updateProfileUserThunk}
                />
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        id: state.Auth.id,
        status: state.profilePage.status
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
        }),
    //withAuthRedirectHoc,
    withRouter
)(ProfileContainer)
