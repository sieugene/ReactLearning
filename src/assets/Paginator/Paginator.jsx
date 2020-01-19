import React, {useState} from 'react';
import s from './Paginator.module.css';

const Paginator = (props => {
    //считаем сколько страниц
    let totalPages = props.totalUsers / props.pageSize;
    let pages = [];
    for (let i = 1; i <= Math.ceil(totalPages); i++) {
        pages.push(i);
    }
    //
    let [portionNumber, setPortionNumber] = useState(1);
    let portionsCount = Math.ceil(totalPages / props.portionSize);
    let leftPortion = (portionNumber - 1) * props.portionSize + 1;
    let rightPortion = portionNumber * props.portionSize;

    return (
        <div className={s.pagination}>
            {portionNumber >= 2 && <button onClick={() => {
                setPortionNumber(portionNumber - 1)
            }} className={s.changePortion}> {'<'} </button>}
            {pages.filter(p => p >= leftPortion && p <= rightPortion)
                .map(p => {
                    return <span className={props.currentPage === p ? s.currentPage : ''}
                                 onClick={(e) => {
                                     props.onPageCurrentChange(p)
                                 }} key={p}> {p} </span>
                })}
            {portionsCount > portionNumber && <button onClick={() => {
                setPortionNumber(portionNumber + 1);
            }}  className={s.changePortion}>{'>'}
            </button>
            }
        </div>
    )
})

export default Paginator;