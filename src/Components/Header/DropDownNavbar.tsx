import React from 'react';
import Sidebar from '../Sidebar/SIdebar';


type PropsType = {
    toggle: boolean
    logoutThunk: () => void
    isAuth: boolean
}
const DropDownNavbar:React.FC<PropsType> = (props) => {
    let addClassForToggle = props.toggle ? ' active' : '';
    return (
        <div className="container blockDrop">
            <div className={'dropdownMenu' + addClassForToggle}>
                <Sidebar logoutThunk={props.logoutThunk} isAuth={props.isAuth} />
            </div>
        </div>
    )
}

export default DropDownNavbar