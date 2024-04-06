import MyPostsContainer from './MyPosts/myPostsContainer'
import ProfileInfo from './ProfileInfo/ProfileInfo'

const Profile = (props) => {
    return <div>
        <ProfileInfo savePhoto={props.savePhoto} 
        profile={props.profile} 
        status={props.status} 
        updateStatus={props.updateStatus} 
        saveProfile={props.saveProfile}
        isOwner={props.isOwner}/>
        <MyPostsContainer/>
    </div>
}

export default Profile