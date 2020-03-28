import React from 'react';
import Sidebar from './../Sidebar/SIdebar';

const DropDownNavbar = (props) => {
    let addClassForToggle = props.toggle ? ' active' : '';
    return (
        <div className="container blockDrop">
            <div className={'dropdownMenu' + addClassForToggle }>
                <Sidebar logoutThunk={props.logoutThunk} />
            </div>
        </div>
    )
}

export default DropDownNavbar