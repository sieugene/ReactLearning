import React from 'react';
import Dialog from "./Dialog";
import Preloader from "../../assets/preloader/Preloader";

const Dialogs = (props) => {
    if(props.loading){
        return <Preloader/>
    }
    return(
        <div>
            <div>
                    {props.listDialogs.length === 0 ? <div>No dialogs</div> :
                        props.listDialogs.map(dialog => <Dialog dialog={dialog} key={dialog.id}/>)}
            </div>
        </div>
    )
}

export default Dialogs;