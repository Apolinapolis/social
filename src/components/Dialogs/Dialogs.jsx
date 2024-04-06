import s from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem';
import React from 'react';
import { Navigate } from 'react-router-dom';
import Message from "./Message/Message"
import { Field, reduxForm } from "redux-form"
import { Textarea } from '../common/FormControls';
import { maxLengthCreator, required } from '../../utilits/validators/validators';

const Dialogs = (props) => {
    
    let state = props.dialogsPage;
    let dialogsElements = state.dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id} photo={dialog.photo} />)
    let messageElements = state.message.map(mess => <Message className={s.message} message={mess.message} id={'123'} />)

    const addNewMessage = (text) => { props.sendMessage(text.newMessageBody) }

    if (!props.isAuth) { return <Navigate to={"/login"} /> }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>{dialogsElements}</div>
            <div className={s.messages}>
            <div>{messageElements}</div>
            </div>
            <AddMessageFormRedux onSubmit={addNewMessage}/>
        </div>
    )
}

const maxlength10 = maxLengthCreator(10)
const AddMessageForm = (props) => {
    return <form onSubmit={props.handleSubmit}> 
        <div><Field component={Textarea} name="newMessageBody" validate = {[required , maxlength10]} placeholder='Вводи'/></div>
        <div><button>Send</button></div>
    </form>
}

const AddMessageFormRedux = reduxForm({ form: "dialogAddMessageForm" })(AddMessageForm)

export default Dialogs