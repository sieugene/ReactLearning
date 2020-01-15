import React from 'react';
//WITHOUT HOOKS, old file
class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.status
    }
    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }
    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateStatusUserThunk(this.props.id, this.state.status);
    }
    onChangeTextStatus = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    }
    //сохранение значения поля статуса при переходах.
    componentDidUpdate(prevProps){
        if (this.props.status !== prevProps.status) {
            this.state.status = this.props.status
        }
    }
    render() {
        const withEditStatus = () => {
            //проверка страницы, если страница пользователя, то можно редактировать.
            if (this.props.urlMatchParams == this.props.id) {
                if (!this.state.editMode) {
                    return <span onDoubleClick={this.activateEditMode}>Status: {this.props.status}</span>
                } else {
                    return <input onChange={this.onChangeTextStatus} autoFocus={true} onBlur={this.deactivateEditMode}
                                  value={this.state.status}/>
                }
            } else {
                //просто вывод
                return <div>
                    {!this.props.status ? <div>_____</div> : 'Status:' + this.props.status}
                </div>
            }

        }
        return (
            <div>
                {withEditStatus()}
            </div>
        )
    }
}

export default ProfileStatus