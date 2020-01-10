import React from 'react';

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
        this.props.updateStatusUserThunk(this.props.id,this.state.status);
    }
    onChangeTextStatus = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    }
    render() {
        return (
            <div>
                {!this.state.editMode ?
                    <span onDoubleClick={this.activateEditMode}>Status: {this.props.status}</span>
                    :
                    <input onChange={this.onChangeTextStatus} autoFocus={true} onBlur={this.deactivateEditMode}
                           value={this.state.status}/>
                }
            </div>
        )
    }
}

export default ProfileStatus