import React from 'react';
import s from './GlobalErrors.module.css'

class GlobalErrors extends React.Component {
    constructor(props) {
        super(props);
        this.state = { globalErrors: null };
    }
    catchAllUnhandelErrors = (promiseRejectionEvent) => {
        // alert(promiseRejectionEvent.reason.message);
        //console.log(promiseRejectionEvent)
        this.setState({
            globalErrors: promiseRejectionEvent.reason.message +
                '(' + promiseRejectionEvent.reason.request.response + ')'
        })
        setTimeout(() =>
            this.setState({
                globalErrors: null
            })
            , 5000)
    }

    componentDidMount() {
        window.addEventListener("unhandledrejection", this.catchAllUnhandelErrors)
    }
    render() {
        return (
            <>
                {this.state.globalErrors ?
                    <div className={s.error_window}>
                        {this.state.globalErrors}
                    </div>
                    :
                    ''
                }
            </>
        )
    }
}

export default GlobalErrors