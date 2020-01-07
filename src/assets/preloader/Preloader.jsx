import React from 'react';
import preloadImg from './preloader.svg'
import s from './preloader.module.css';

let Preloader = (props) => {
    return (
        <div>
            <img src={preloadImg} className={s.preloader} alt=''/>
        </div>
    )
}
export default Preloader;