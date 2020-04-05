import React from 'react';
import post2 from './../../assets/images/post2.jpg'
import post3 from './../../assets/images/post3.jpg'

const Home = () => {
    const postBackground = (img: string) => {
        return {
            backgroundImage: 'url(' + img + ')',
            height: '35vh',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            backgroundPosition: 'center'
        }
    };
    return (
        <>
            <div className="container post">
                <div className="row">
                    <div className="col s12 m12">
                        <div className="card">
                            <div className="card-image waves-effect waves-block waves-light activator" style={postBackground(post3)}>
                                <i className="material-icons small right white-text activator mr10">more_horiz</i>
                                <span className="card-title activator">Update v3.0</span>
                            </div>
                            <div className="card-content">
                                <p>
                                    In this update,
                                    almost the entire application is rewritten in typescript,
                                    and most bugs and bugs are fixed.
                                <br />
                                    <b>Changes</b>:
                            </p>
                                <ul>
                                    <li>
                                        Project typing
                                    </li>
                                    <li>
                                        Fixed synchronization of messages
                                </li>
                                    <li>
                                        Syncing messages based on past messages
                                </li>
                                    <li>
                                        Changed the appearance of the chat
                                </li>
                                    <li>
                                        Added the ability to delete messages by click
                                </li>
                                </ul>
                            </div>
                            <div className="card-action">
                                <a href="https://github.com/sieugene/ReactLearning" target='_blank' rel="noopener noreferrer">
                                    Repository link
                                </a>
                            </div>
                            <div className="card-reveal">
                                <span className="card-title grey-text text-darken-4">
                                    Info
                                    <i className="material-icons right">close</i>
                                </span>
                                <h5>This is my first social network
                                that I develop on react.<br />
                                This social network was created at the rate of "it-incubator"<br />
                                Using libraries: React and Redux (Thunk, Axios,redux-form).
                                    </h5>
                                <b>API: <a href="https://social-network.samuraijs.com/" target='_blank' rel="noopener noreferrer">
                                    https://social-network.samuraijs.com/
                                    </a>
                                </b>
                                <p>
                                    At this point, the user can:
                                </p>
                                <ul>
                                    <li>Log in(there is validation, captcha)</li>
                                    <li>To change the profile information</li>
                                    <li>Subscribe to other users</li>
                                    <li>Write messages to users</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col s12 m12">
                        <div className="card">
                            <div className="card-image waves-effect waves-block waves-light activator" style={postBackground(post2)}>
                                <i className="material-icons small right white-text activator mr10">more_horiz</i>
                                <span className="card-title activator">Update v2.0</span>
                            </div>
                            <div className="card-content">
                                <p>
                                    In this update,
                                    I changed the external part of the
                                    application, refactored the code,
                                    connected typescript and started
                                    making small changes, at the moment
                             there are not big bugs.<br />
                                    <b>Changes</b>:
                            </p>
                                <ul>
                                    <li>
                                        Changed the design
                                </li>
                                    <li>
                                        Syncing messages without reloading
                                </li>
                                    <li>
                                        More secure routing
                                </li>
                                    <li>
                                        Message counter(only with reload)
                                </li>
                                    <li>
                                        Error output
                                </li>
                                </ul>
                            </div>
                            <div className="card-action">
                                <a href="https://github.com/sieugene/ReactLearning" target='_blank' rel="noopener noreferrer">
                                    Repository link
                                </a>
                            </div>
                            <div className="card-reveal">
                                <span className="card-title grey-text text-darken-4">
                                    Info
                                    <i className="material-icons right">close</i>
                                </span>
                                <h5>This is my first social network
                                that I develop on react.<br />
                                This social network was created at the rate of "it-incubator"<br />
                                Using libraries: React and Redux (Thunk, Axios,redux-form).
                                    </h5>
                                <b>API: <a href="https://social-network.samuraijs.com/" target='_blank' rel="noopener noreferrer">
                                    https://social-network.samuraijs.com/
                                    </a>
                                </b>
                                <p>
                                    At this point, the user can:
                                </p>
                                <ul>
                                    <li>Log in(there is validation, captcha)</li>
                                    <li>To change the profile information</li>
                                    <li>Subscribe to other users</li>
                                    <li>Write messages to users</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home