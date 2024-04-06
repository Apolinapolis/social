import s from './Post.module.css';


const Post = (props) => {
    return <div className={s.item}>
        <img src="https://android-obzor.com/wp-content/uploads/2022/03/28e4ac42f547e6ac0f50f7cfa916ca93.jpg" alt="ops!" />
        {props.message}
        <div><button id='likesBtn'>LIKE</button><span>{'  '+ props.likesCount + ' Likes'}</span></div>
    </div>
}

export default Post