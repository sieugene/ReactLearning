import React from 'react';
import Dialog from "./Dialog";

const Dialogs = (props) => {
    return(
        <div>
            Dialogs
            <div><button onClick={()=> {props.startChattingThunk(2)}}>StartChatting</button></div>
            with user with id 2
            <hr/>
            <div>
                <div>
                    <h3>All dialogs list</h3>
                    {props.listDialogs.length === 0 ? <div>No dialogs</div> :
                        props.listDialogs.map(dialog => <Dialog dialog={dialog} key={dialog.id}/>)}
                </div>
            </div>
           <hr/>
            <hr/>
            <h3>Get list new Messages count</h3>
            <button onClick={()=>{props.getListNewMessagesThunk()}}>get</button>
            <div>
                {!props.countNesMessages ? 'Count: 0' :
                    'Count:' + props.countNesMessages
                }
            </div>
            <hr/>
            <hr/>
        </div>
    )
}

export default Dialogs;