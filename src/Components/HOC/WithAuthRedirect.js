import React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

let mapStateToPropsForHoc = (state) => {
    return {
        isAuth: state.Auth.isAuth
    }
}

export const withAuthRedirectHoc = (Component) => {
    class authRedirectContainer extends React.Component {
        render(){
            if(!this.props.isAuth) return <Redirect to='/Login'/>
            return  <Component {...this.props}/>
        }
    }
    return connect(mapStateToPropsForHoc)(authRedirectContainer)
}


