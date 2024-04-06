import React from 'react'
import Post from './Post/Post'
import s from './myPosts.module.css'
import { Textarea } from '../../common/FormControls'
import { Field, reduxForm } from "redux-form"
import { required, maxLengthCreator } from '../../../utilits/validators/validators'

const MyPosts = props => {
    let postsElements = [...props.posts].reverse().map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount} />)
    let onAddPost = (values) => props.addPost(values.myPostText)
    let maxlength10 = maxLengthCreator(10) 

    const AddNewPostForm = (props) => {
        return <form onSubmit={props.handleSubmit} >
        <div><Field name = 'myPostText' component = {Textarea} validate = {[required , maxlength10]} placeholder = "cool" /></div>
        <div><button> Add Post </button><button> Post remove </button></div>
        </form>
    }

    const ReactPostsTextArea = reduxForm({ form: "profileAddNewPostForm" })(AddNewPostForm)

    return <div className={s.postsBlock}>
        <h3>My Super Posts</h3>
       <ReactPostsTextArea onSubmit={onAddPost}/>
        <div className={s.posts}>
            {postsElements}
        </div>
    </div>
}

export default MyPosts