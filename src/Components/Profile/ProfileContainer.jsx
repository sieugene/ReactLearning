import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getMyProfileThunkCreator, getProfileThunkCreator, setUserProfileAC} from "../../redux/ProfilePage-Reducer";
import {Redirect, withRouter} from "react-router-dom";
import {withAuthRedirectHoc} from "../HOC/WithAuthRedirect";
import {compose} from "redux";


class ProfileContainer extends React.Component {
    componentDidMount() {
        //проверяем из url пользователя по параметрам
        let userId = this.props.match.params.userId;
        //если не нашли, вызываем узнать наш профиль
        if(!userId || !this.props.match.params.userId) {
            this.props.getMyProfileThunk();
        }
        //устанавливаем пользователя и получаем массив
        this.props.getProfileThunk(userId);
    }

    render(){
        //добавление id к url после авторизации
        if(!this.props.match.params.userId){
            if(!this.props.id){
                return <div>not auth</div>
            }else {
                let path = `/profile/${this.props.id}`;
                this.props.getProfileThunk(this.props.id);
                return <Redirect to={path}/>
            }
        }

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
        id: state.Auth.id
    }
}

//none compose
// let WithDataUrlContainerComponent = withRouter(ProfileContainer)
// let withAuthRedirect = withAuthRedirectHoc(WithDataUrlContainerComponent)
// export default connect(mapStateToProps, {
//     setUser: setUserProfileAC,
//     getProfileThunk: getProfileThunkCreator,
//     getMyProfileThunk: getMyProfileThunkCreator
// })(withAuthRedirect);

export default compose(
    connect(mapStateToProps,
        {setUser: setUserProfileAC,
        getProfileThunk: getProfileThunkCreator,
        getMyProfileThunk: getMyProfileThunkCreator
    }),
    //withAuthRedirectHoc,
    withRouter
)(ProfileContainer)

//Compose берет ProfileContainer закидывает в withRouter, после получает результат кидает в withAuthRedirectHoc
//после получает результат и записывает в connect