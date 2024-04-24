import s from "./Users.module.css"
import ph from "../../assets/images/tetatet.jpeg"
import React from "react";
import {NavLink} from "react-router-dom";

let User = ({user, followingInProgress, unfollow, follow}) => {

    return <div>
        <span>
          <div className={s.ava}>
            <NavLink to={"/profile/" + user.id}> <img alt="xxx"
                                                      src={user.photos.small != null ? user.photos.small : ph}/> </NavLink>
          </div>
          <div className={s.btn}>{user.followed
              ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                  unfollow(user.id)
              }}> Unfollow </button>
              : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                  follow(user.id)
              }}> Follow </button>}
          </div>
        </span>
        <span>
          <span>
            <div>{user.name}</div>
            <div>{user.status}</div>
          </span>
          <span>
            <div>{user.id}</div>
            <div>{"user.location.city"}</div>
          </span>
        </span></div>
};

export default User