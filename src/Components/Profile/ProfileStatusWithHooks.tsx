import React, { useEffect, useState, ChangeEvent } from 'react';


type PropsType = {
    status: string | null
    updateStatusUserThunk: (userId: number, status: string | null) => void
    urlMatchParams: string | number
    id: number | null
}


const ProfileStatusWithHooks: React.FC<PropsType> = React.memo(props => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState<string | null>(props.status);

    const activateEditMode = () => {
        setEditMode(true);
    }
    const deactivateEditMode = () => {
        setEditMode(false);
        if (props.id) {
            props.updateStatusUserThunk(props.id, status)
        }
    }
    let onChangeTextStatus = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    }
    //сохранение значения поля статуса при переходах.
    //вместо componentDidUpdate
    useEffect(() => {
        setStatus(props.status)
    }, [props.status]);
    //строка , [props.status], означает Перезапускать эффект только если props.status поменялся

    const withEditStatus = () => {
        //проверка страницы, если страница пользователя, то можно редактировать.
        if (Number(props.urlMatchParams) === props.id) {
            if (!editMode) {
                return <span onDoubleClick={activateEditMode} data-tooltip="double click to change">{!props.status ? <div>_____</div> : props.status}</span>
            } else {
                return <input onChange={onChangeTextStatus} autoFocus={true}
                    onBlur={deactivateEditMode} value={status!} />
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