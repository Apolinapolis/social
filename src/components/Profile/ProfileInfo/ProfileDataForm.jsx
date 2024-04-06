import {сreateField, Input, Textarea} from "../../common/FormControls"
import { reduxForm } from "redux-form"
import s from './ProfileInfo.module.css'

const ProfileForm = ({handleSubmit, profile , error}) => { 
   return <form onSubmit={handleSubmit}>
   <div><button><i>Save</i></button></div>
   {error && <div className={s.formSummaryError}>{error}</div>}
   <div><b>Full name</b>: {сreateField("fullName", "fullName", [], Input)}</div>
   <div><b>looking for a job</b>: { сreateField("", "lookingForAJob", [], Input, {type: "checkbox"}) }</div>
   <div><b>My skills</b>: {сreateField("My professional skills", "lookingForAJobDescription", [], Textarea)}</div>
   <div><b>About me</b>: {сreateField("About me", "AboutMe", [], Textarea)}</div>
  <div>
       <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
         return <div key={key} className={s.contacts}>
            <b>{key}: {сreateField(key, "contacts." + key, [], Input)}</b>
         </div>
       })}</div>
   </form>
}  

const ProfileFormReduxForm = reduxForm({ form: "edit-profile" })(ProfileForm)
export default ProfileFormReduxForm