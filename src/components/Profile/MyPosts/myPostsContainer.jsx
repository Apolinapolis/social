import { addPostActionCreator } from '../../Redux/profileReducer'
import MyPosts from './myPosts'
import { connect } from 'react-redux'

let mapStateToProps = (state) => {return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,
}}
let mapDispatchToProps = (dispatch) => {return {addPost:(myPostText) => dispatch(addPostActionCreator(myPostText))} }

const MyPostsContainer = connect(mapStateToProps,mapDispatchToProps)(MyPosts)
export default MyPostsContainer