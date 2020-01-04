import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {setUserProfileAC} from "../../redux/ProfilePage-Reducer";
import * as axios from "axios";
import {withRouter} from "react-router-dom";


class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if(!userId){
            userId = '1709'
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
            .then(response => {
                this.props.setUser(response.data)
            })
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
    setUser: setUserProfileAC
})(WithDataUrlContainerComponent);