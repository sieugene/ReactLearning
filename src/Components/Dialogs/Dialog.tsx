import React from 'react';
import { NavLink } from "react-router-dom";
import userPhoto from '../../assets/images/userPhoto.png'
import { DialogItemType } from '../../Types/DialogsTypes';

type PropsType = {
    dialog: DialogItemType
}

const Dialog: React.FC<PropsType> = (props) => {
    let lastDataActivity = props.dialog.lastDialogActivityDate;
    let lastDataActivShort = lastDataActivity.substr(0, lastDataActivity.length - 12)
    return (
        <div className='dialog'>
            <NavLink to={`/messages/${props.dialog.id}`} className='black-text'>
                <div className="row">
                    <div className="col xl1 l1 m2 s3">
                        <div>
                            {!props.dialog.photos.small || !props.dialog.photos.large ?
                                <img src={userPhoto} alt='' />
                                :
                                <img src={props.dialog.photos.small} alt='' /> || <img src={props.dialog.photos.large} alt='' />
                            }
                        </div>
                    </div>
                    <div className="col xl11 l11 m10 s9">
                        <div className="row">
                            <div className="col s6 left-align">
                                <h5>{props.dialog.userName}</h5>
                                <p className='lastMessage'>Last message...</p>
                            </div>
                            <div className="col s6 right-align">
                                <p className='activity'>
                                    {lastDataActivShort}<br />
                                    {/* {props.dialog.lastUserActivityDate}<br /> */}
                                </p>
                                {props.dialog.newMessagesCount <= 0 ? '' :
                                    <p className="newMessage">
                                        <span>
                                            {props.dialog.newMessagesCount}
                                        </span>
                                    </p>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </NavLink>
        </div>
    )
}

export default Dialog;