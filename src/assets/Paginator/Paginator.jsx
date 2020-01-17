import React, {useState} from 'react';
import s from './Paginator.module.css';

const Paginator = (props => {
    //считаем сколько страниц
    let totalPages = props.totalUsers / props.pageSize;
    let pages = [];
    for (let i = 1; i <= Math.ceil(totalPages); i++) {
        pages.push(i);
    }
    return (
            <div className={s.pagination}>
                {pages.map(p => {
                    return <span className={props.currentPage === p ? s.currentPage : ''}
                                 onClick={(e) =>
                                 { props.onPageCurrentChange(p) }} key={p}> {p} </span>
                })}
            </div>
    )
})

export default Paginator;