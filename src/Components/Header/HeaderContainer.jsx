import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {setAuthUserAC} from "../../redux/Auth-Reducer";
import * as axios from "axios";

class HeaderContainer extends React.Component {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        })
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {id, login, email} = response.data.data;
                    this.props.setAuthUser(id, login, email)
                }
            })
    }

    render() {
        return (
            //выполняем деструктуризацию props
            <Header {...this.props}/>
        )
    }
}
let mapStateToProps = (state) => {
    return {
        isAuth: state.Auth.isAuth,
        login: state.Auth.login
    }
}

export default connect(mapStateToProps, {
    setAuthUser: setAuthUserAC
})(HeaderContainer);