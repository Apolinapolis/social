import React, { ChangeEvent } from 'react'

type propsType = {
    status: string
    updateStatus: (newStatus:string) => void
}

type stateType = {
    editMode: boolean
    status: string
}

class ProfileStatus extends React.Component<propsType, stateType > {
    state = {
        editMode: false,
        status: this.props.status,
    }

    activateEditMode = () => { this.setState({ editMode: true }) }
    deactivateEditMode = () => {
        this.setState({ editMode: false })
        this.props.updateStatus(this.state.status)
    }
    onStatusChange = (el:ChangeEvent<HTMLInputElement>) => {
        this.setState({ status: el.currentTarget.value })
    }

    componentDidUpdate(prevPropse:propsType, prevState:stateType){
        if (prevPropse.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }

    }

    render() {
        return <>
            <div>{!this.state.editMode && <div><span onClick={this.activateEditMode}>{this.props.status}</span></div>}
                {this.state.editMode && <div><input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.status} /></div>}</div>
        </>
    }
}

export default ProfileStatus