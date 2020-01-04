import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {setUserProfileAC} from "../../redux/ProfilePage-Reducer";
import * as axios from "axios";


class ProfileContainer extends React.Component {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
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

export default connect(mapStateToProps, {
    setUser: setUserProfileAC
})(ProfileContainer);