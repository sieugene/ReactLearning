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
        axios.get("https://social-network.samuraijs.com/api/1.0/users")
            .then(response => {
                debugger
                this.props.setUsers(response.data.items)
            })
    }

    render() {
        return (
            <div className={s.mainBlock}>
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