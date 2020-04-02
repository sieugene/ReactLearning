import React from 'react';
import s from './GlobalErrors.module.css'


type StateType = {
    globalErrors: null | string
}
type PromiseRejectionType = {
    reason: {
        message: string;
        request: {
            response: string;
        }
    }
}
//<{}> because props are empty, only read
class GlobalErrors extends React.Component<{},StateType> {
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = { globalErrors: null };
    }
    catchAllUnhandelErrors = (promiseRejectionEvent:PromiseRejectionType) => {
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