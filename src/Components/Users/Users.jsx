import React from 'react';
import s from './Users.module.css';
import * as axios from 'axios';

// Эта компонента отличается от функциональной тем что здесь появился
// extends
// render
// constructor
// this
class Users extends React.Component {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${this.props.currentPage}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setUsersTotal(response.data.totalCount)
            })
    }

    //новый запрос, на изменение выбранной страницы
    onPageCurrentChange = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${pageNumber}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setUsersTotal(response.data.totalCount)
            })
    }

    render() {
        //считаем сколько страниц
        let totalPages = this.props.totalUsers / this.props.pageSize;
        let pages = [];
        //пробегаем и пушим
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        return (
            <div className={s.mainBlock}>
                <div className={s.pagination}>
                    {pages.map(p => {
                        //map страниц, присвоение класса выбранной странице
                        //и функция на изменение страницы
                        return <span
                            className={this.props.currentPage === p && s.currentPage}
                                     onClick={(e) => {
                                         this.onPageCurrentChange(p)
                                     }}>
                            {p} </span>
                    })}
                </div>
                {
                    this.props.UsersList.map(u =>
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
                                            this.props.unFollow(u.id)
                                        }
                                    }>UnFollow</button>
                                    :
                                    <button onClick={
                                        () => {
                                            this.props.follow(u.id)
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
}

export default Users;