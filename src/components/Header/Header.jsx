import { NavLink } from 'react-router-dom'
import s from './Header.module.css'

const Header = (props) => {
    return <header className={s.header}>
    <img src="https://thumbs.dreamstime.com/b/го-ова-бойскаута-м-а-шей-группы-90271267.jpg" alt='xxx'></img>
    <div className={s.loginBlock}>{ props.isAuth 
    ? <div>{props.login} - <button onClick={props.logout}>Log out</button></div> 
    : <NavLink to={'/login'}>Login</NavLink> }</div>
  </header>
}

export default Header