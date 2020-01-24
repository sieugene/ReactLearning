import React from 'react';
import s from "./Dialogs.module.css";
import {NavLink} from "react-router-dom";

const Dialog = (props) => {
    return (
        <div className={s.dialogUser}>

            <NavLink to={`/Dialogs/messages/${props.dialog.id}`}>
                <div className={s.userNameWithImg}>
                    {!props.dialog.photos.small || !props.dialog.photos.large ? 'no img' :
                        <img src={props.dialog.photos.small} alt=''/> || <img src={props.dialog.photos.large} alt=''/>
                    }
                    <h3>{props.dialog.userName}</h3>
                </div>
            </NavLink>
            {/*<div>*/}
            {/*    Has New Message: {props.dialog.hasNewMessages ? 'Yes' : 'No'}*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    Last Dialog Activity Data: {props.dialog.lastDialogActivityDate}*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    last User Activity Date: {props.dialog.lastUserActivityDate}*/}
            {/*</div>*/}
            <div>
                {props.dialog.newMessagesCount === 0 ? '' :
                    'new Messages Count:' + props.dialog.newMessagesCount
                }
            </div>
        </div>
    )
}

export default Dialog;