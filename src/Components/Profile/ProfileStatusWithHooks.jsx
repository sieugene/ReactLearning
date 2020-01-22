import React, {useEffect, useState} from 'react';

const ProfileStatusWithHooks = React.memo(props => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    const activateEditMode = () => {
        setEditMode(true);
    }
    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatusUserThunk(props.id, status)
    }
    let onChangeTextStatus = (e) => {
        setStatus(e.currentTarget.value);
    }
    //сохранение значения поля статуса при переходах.
    //вместо componentDidUpdate
    useEffect(() => {
        setStatus(props.status)
    },[props.status]);
    //строка , [props.status], означает Перезапускать эффект только если props.status поменялся

    const withEditStatus = () => {
        //проверка страницы, если страница пользователя, то можно редактировать.
        if (props.urlMatchParams == props.id) {
            if (!editMode) {
                return <span onDoubleClick={activateEditMode} data-tooltip="double click to change">{props.status}</span>
            } else {
                return <input onChange={onChangeTextStatus} autoFocus={true}
                              onBlur={deactivateEditMode} value={status}/>
            }
        } else {
            //просто вывод
            return <div>
                {!props.status ? <div>_____</div> : props.status}
            </div>
        }

    }
    return (
        <div>
            {withEditStatus()}
        </div>
    )
})


export default ProfileStatusWithHooks