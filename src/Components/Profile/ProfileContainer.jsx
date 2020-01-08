import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getMyProfileThunkCreator, getProfileThunkCreator, setUserProfileAC} from "../../redux/ProfilePage-Reducer";
import {Redirect, withRouter} from "react-router-dom";




class ProfileContainer extends React.Component {
    componentDidMount() {
        //проверяем из url пользователя по параметрам
        let userId = this.props.match.params.userId;
        //если не нашли, вызываем узнать наш профиль
        if(!userId) {
            if (this.props.isAuth) {
                this.props.getMyProfileThunk();
                userId = this.props.myProfileId
            }
        }
        //устанавливаем пользователя и получаем массив
        this.props.getProfileThunk(userId);
    }
    render(){
        if(!this.props.isAuth) return <Redirect to='/Login'/>
        return(
            <div>
                <Profile profile={this.props.profile}/>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return{
        profile: state.profilePage.profile,
        myProfileId: state.profilePage.myProfileId,
        isAuth: state.Auth.isAuth
    }
}

let WithDataUrlContainerComponent = withRouter(ProfileContainer)
export default connect(mapStateToProps, {
    setUser: setUserProfileAC,
    getProfileThunk: getProfileThunkCreator,
    getMyProfileThunk: getMyProfileThunkCreator
})(WithDataUrlContainerComponent);