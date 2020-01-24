import React from 'react';
import Dialog from "./Dialog";
import MessagesContainer from "./MessagesContainer";
import {Route} from "react-router-dom";
import s from './Dialogs.module.css'

const Dialogs = (props) => {
    return(
        <div className={s.containerDialog}>
            {/*Dialogs*/}
            {/*<div><button onClick={()=> {props.startChattingThunk(2)}}>StartChatting</button></div>*/}
            {/*with user with id 2*/}
            <div className={s.listDialogs}>
                    {props.listDialogs.length === 0 ? <div>No dialogs</div> :
                        props.listDialogs.map(dialog => <Dialog dialog={dialog} key={dialog.id}/>)}
            </div>
            <Route path='/Dialogs/messages/:userId?' render={() => <MessagesContainer/>}/>
            {/*<h3>Get list new Messages count</h3>*/}
            {/*<button onClick={()=>{props.getListNewMessagesThunk()}}>get</button>*/}
            {/*<div>*/}
            {/*    {!props.countNesMessages ? 'Count: 0' :*/}
            {/*        'Count:' + props.countNesMessages*/}
            {/*    }*/}
            {/*</div>*/}
        </div>
    )
}

export default Dialogs;