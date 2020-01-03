import React from 'react';
import s from './Users.module.css';


const Users = (props) => {
    //считаем сколько страниц
    let totalPages = props.totalUsers / props.pageSize;
    let pages = [];
    //пробегаем и пушим
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }
    //поиск по пользователям, реф
    let newTextTerm = React.createRef();

    return (
        <div className={s.mainBlock}>
            <div>
                Search on page
                <input value={props.searchTerm} ref={newTextTerm}
                       onChange={() => {
                           props.onSearchChange(newTextTerm.current.value)
                       }}
                />
            </div>
            <div className={s.pagination}>
                {pages.map(p => {
                    //map страниц, присвоение класса выбранной странице
                    //и функция на изменение страницы
                    return <span
                        className={props.currentPage === p && s.currentPage}
                        onClick={(e) => {
                            props.onPageCurrentChange(p)
                        }}>
                            {p} </span>
                })}
            </div>
            {
                props.UsersList.map(u =>
                    <div key={u.id} className={s.userMain}>
                        <img className={s.userImg} src={
                            u.photos.small != null ? u.photos.small :
                                ' https://www.kanali6.com.cy/sites/default/files/producer_0.png'
                        }
                        />
                        <br/>
                        {
                            u.followed
                                ?
                                <button onClick={
                                    () => {
                                        props.unFollow(u.id)
                                    }
                                }>UnFollow</button>
                                :
                                <button onClick={
                                    () => {
                                        props.follow(u.id)
                                    }
                                }>Follow</button>
                        }
                        <div>Name: {u.name}</div>
                        <div>Status :{u.status}</div>
                        <div>City: {'u.location.city'}</div>
                        <div>Country: {'u.location.country'}</div>
                    </div>)
            }
        </div>
    )
}

export default Users;