import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getMyProfileThunkCreator, getProfileThunkCreator, setUserProfileAC} from "../../redux/ProfilePage-Reducer";
import {withRouter} from "react-router-dom";
import {withAuthRedirectHoc} from "../HOC/WithAuthRedirect";
import Preloader from "../../assets/preloader/Preloader";




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
        while(!userId){
           return <Preloader />
        }
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
        myProfileId: state.profilePage.myProfileId,
    }
}


let WithDataUrlContainerComponent = withRouter(ProfileContainer)
let withAuthRedirect = withAuthRedirectHoc(WithDataUrlContainerComponent)
export default connect(mapStateToProps, {
    setUser: setUserProfileAC,
    getProfileThunk: getProfileThunkCreator,
    getMyProfileThunk: getMyProfileThunkCreator
})(withAuthRedirect);