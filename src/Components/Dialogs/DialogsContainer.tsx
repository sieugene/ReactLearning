import React, { useEffect } from 'react';
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import {
    getAllDialogsThunkCreator
} from "../../redux/Dialogs-Reducer";
import { compose } from "redux";
import { Redirect, withRouter } from "react-router-dom";
import { DialogItemType } from '../../Types/DialogsTypes';
import { AppStateType } from '../../redux/store-redux';

type MapStatePropsType = {
    listDialogs: DialogItemType[],
    id: number | null,
    loading: boolean
}
type MapDispatchPropsType = {
    getAllDialogsThunk: () => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType

const DialogsContainer: React.FC<PropsType> = (props) => {
    useEffect(() => {
        props.getAllDialogsThunk();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    if (!props.id) {
        return <Redirect to={'/login'} />
    }
    return (
        <Dialogs listDialogs={props.listDialogs} loading={props.loading} />
    )
}



let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        listDialogs: state.dialogs.listDialogs,
        id: state.Auth.id,
        loading: state.dialogs.loading
    }
}

export default compose(
    withRouter,
    connect<MapStatePropsType, MapDispatchPropsType, null, AppStateType>
        (mapStateToProps, { getAllDialogsThunk: getAllDialogsThunkCreator })
)(DialogsContainer)
