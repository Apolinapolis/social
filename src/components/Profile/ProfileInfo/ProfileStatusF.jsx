import React, { useEffect, useState } from 'react'
const ProfileStatusWithHooks = (props) => {

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)
    useEffect( () => {setStatus(props.status)}, [props.status] )
    let activateEditmode = () => { setEditMode(true) }
    let deactivateEditmode = () => { setEditMode(false); props.updateStatus(status)}
    const onStatusChange = (e) => {setStatus(e.currentTarget.value)}
    return <div>{
            !editMode
            && <div><b>Status:</b><span onDoubleClick={activateEditmode}>{props.status + "..."}</span></div>}
            {editMode
            && <div><input onChange={onStatusChange} value={status}
            autoFocus={true} onBlur={deactivateEditmode} /></div>}</div> 
}

export default ProfileStatusWithHooks