import React from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AppStateType } from '../../redux/store-redux';


type MapStateType = {
    id: number | null
}
type PropsType = MapStateType

let MapStateToPropsForHOC = (state: AppStateType): MapStateType => {
    return {
        id: state.Auth.id
    }
}
type WrappComponentType = React.ComponentClass<PropsType> | React.StatelessComponent<PropsType>;
type AnotherComponentType = React.FC<any>

export const withAuthRedirect = (Component: WrappComponentType): AnotherComponentType => {
    class AuthRedirectHOC extends React.Component<PropsType> {
        render() {
            if (!this.props.id) {
                return <Redirect to={'/login'} />
            }
            return <Component {...this.props} />
        }
    }
    return connect(MapStateToPropsForHOC)(AuthRedirectHOC)
}
