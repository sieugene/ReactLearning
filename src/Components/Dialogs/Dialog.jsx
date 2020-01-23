import React from 'react';
import s from "./Dialogs.module.css";
import {NavLink} from "react-router-dom";

const Dialog = (props) => {
    return(
        <div className={s.dialog}>
            <div>
                <NavLink to={`/messages/${props.dialog.id}`}>Id user: {props.dialog.id}</NavLink>
            </div>
            <div>
                UserName: {props.dialog.userName}
            </div>
            <div>
                Has New Message: {props.dialog.hasNewMessages ? 'Yes' : 'No'}
            </div>
            <div>
                Last Dialog Activity Data: {props.dialog.lastDialogActivityDate}
            </div>
            <div>
                last User Activity Date: {props.dialog.lastUserActivityDate}
            </div>
            <div>
                new Messages Count: {props.dialog.newMessagesCount}
            </div>
            <div>
                {!props.dialog.photos.small || !props.dialog.photos.large ? 'no img' :
                    <img src={props.dialog.photos.small} alt=''/> || <img src={props.dialog.photos.large} alt=''/>
                }
            </div>
        </div>
    )
}

export default Dialog;