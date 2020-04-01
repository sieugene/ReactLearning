import React from 'react';
import Dialog from "./Dialog";
import Preloader from "../../assets/preloader/Preloader";
import { DialogItemType} from '../../Types/DialogsTypes';

type PropsType = {
    listDialogs: DialogItemType[]
    loading: boolean
}

const Dialogs:React.FC<PropsType> = (props) => {
    if (props.loading) {
        return <Preloader />
    }
    return (
        <div>
            <div>
                {props.listDialogs.length === 0 ? <div>No dialogs</div> :
                    props.listDialogs.map(dialog => <Dialog dialog={dialog} key={dialog.id} />)}
            </div>
        </div>
    )
}

export default Dialogs;