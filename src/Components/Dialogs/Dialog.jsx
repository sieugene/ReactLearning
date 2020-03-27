import React from 'react';
import { NavLink } from "react-router-dom";
import userPhoto from '../../assets/images/userPhoto.png'

const Dialog = (props) => {
    return (
        <div className='dialog'>
            <NavLink to={`/messages/${props.dialog.id}`} className='black-text'>
                <div className="row">
                    <div className="col s2">
                        <div>
                            {!props.dialog.photos.small || !props.dialog.photos.large ?
                                <img src={userPhoto} alt='' />
                                :
                                <img src={props.dialog.photos.small} alt='' /> || <img src={props.dialog.photos.large} alt='' />
                            }
                        </div>
                    </div>
                    <div className="col s10">
                        <div className="row">
                            <div className="col s6 left-align">
                                <h5>{props.dialog.userName}</h5>
                            </div>
                            <div className="col s6 right-align">
                                {props.dialog.lastDialogActivityDate}<br />
                                {props.dialog.lastUserActivityDate}<br />
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