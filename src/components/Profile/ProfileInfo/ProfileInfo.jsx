import Preloader from '../../common/preloader'
import s from './ProfileInfo.module.css'
import React, { useState } from 'react'
import ProfileStatusWithHooks from './ProfileStatusF'
import ph from "../../../assets/images/tetatet.jpeg"
import ProfileForm from "./ProfileDataForm"


const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {

    let [editMode, setEditMode] = useState(false)

    if (!profile) return <Preloader/>

    const uploadPhoto = (e) => {
    if (e.target.files.length) {
    savePhoto(e.target.files[0])
    } }

    const onSubmit = (formdata) => { 
        saveProfile(formdata).then( () => { setEditMode(false)} )
        }
    

   return  <div>
    <div><img src="https://images.wallpaperscraft.ru/image/single/listia_rastenie_makro_208778_1920x1080.jpg" alt='xxx'></img></div>
    <div className={s.description}>
        <img src={profile.photos.large || ph } alt="ProfileInfo" />
        {isOwner && <input type={"file"} onChange={uploadPhoto} />}
    
        {editMode 
        ? <ProfileForm initialValues={profile} onSubmit={onSubmit} profile={profile}/> 
        : <ProfileData profile={profile} 
            isOwner={isOwner} 
            goToEditMode={ () => {setEditMode(true)} } />
        }

        <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
        </div></div>
}

const ProfileData = ({profile, isOwner, goToEditMode}) => { return <div>
    {isOwner && <div><button onClick={goToEditMode}><i>Edit Mode</i></button></div>} 
    <div><b>Full name</b>: {profile.fullName}</div>
    <div><b>looking for a job</b>: {profile.lookingForAJob ? 'yes' : 'no'}</div>
    <div><b>My skills</b>: {profile.lookingForAJobDescription}</div>
    <div><b>About me</b>: {profile.aboutMe}</div>
    <div><b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
       return <Contacs key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
    })}</div></div>
}


const Contacs = ({contactTitle, contactValue}) => {
    return <div className={s.contacts}><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo