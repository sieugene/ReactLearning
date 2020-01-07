import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getMyProfileThunkCreator, getProfileThunkCreator, setUserProfileAC} from "../../redux/ProfilePage-Reducer";
import * as axios from "axios";
import {withRouter} from "react-router-dom";
import {ProfileAPI} from "../../Api/Api";


class ProfileContainer extends React.Component {
    componentDidMount() {
        //проверяем из url пользователя по параметрам
        let userId = this.props.match.params.userId;
        //если не нашли, вызываем узнать наш профиль
        if(!userId){ this.props.getMyProfileThunk(); userId = this.props.myProfileId}
        //если не нашли наш профиль, то по дефолту 2
        if(!userId){ userId = '2'}
        //устанавливаем пользователя и получаем массив
        this.props.getProfileThunk(userId);
    }
    render(){
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
        myProfileId: state.profilePage.myProfileId
    }
}

let WithDataUrlContainerComponent = withRouter(ProfileContainer)
export default connect(mapStateToProps, {
    setUser: setUserProfileAC,
    getProfileThunk: getProfileThunkCreator,
    getMyProfileThunk: getMyProfileThunkCreator
})(WithDataUrlContainerComponent);