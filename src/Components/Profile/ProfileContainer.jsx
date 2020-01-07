import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfileThunkCreator, setUserProfileAC} from "../../redux/ProfilePage-Reducer";
import * as axios from "axios";
import {withRouter} from "react-router-dom";
import {ProfileAPI} from "../../Api/Api";


class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if(!userId){
            userId = '1709'
        }
        this.props.getProfileThunk(userId);
        //none thunk method
        // ProfileAPI.getProfile(userId)
        //     .then(response => {
        //         this.props.setUser(response.data)
        //     })
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
        profile: state.profilePage.profile
    }
}

let WithDataUrlContainerComponent = withRouter(ProfileContainer)
export default connect(mapStateToProps, {
    setUser: setUserProfileAC,
    getProfileThunk: getProfileThunkCreator
})(WithDataUrlContainerComponent);