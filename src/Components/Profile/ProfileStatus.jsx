import React from 'react';

class ProfileStatus extends React.Component {
    state = {
        editMode: false
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
    }
    render() {
        return (
            <div>
                {!this.state.editMode ?
                    <span onDoubleClick={this.activateEditMode}>Status: here</span>
                    :
                    <input autoFocus={true} onBlur={this.deactivateEditMode} placeholder={this.props.status}/>
                }
            </div>
        )
    }
}

export default ProfileStatus