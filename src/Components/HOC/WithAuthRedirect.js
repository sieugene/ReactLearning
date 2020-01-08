import React from "react";
import Redirect from "react-router-dom/es/Redirect";
import {connect} from "react-redux";

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


