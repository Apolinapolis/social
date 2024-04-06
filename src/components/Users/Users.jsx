import React from "react";
import Paginator from "../common/paginator/Paginator";
import User from "./User";

let Users = ({currentPage, totalUsersCount, pageSize, onPageChenged, users, ...props }) => {

  return <div>
    <Paginator currentPage={currentPage}  onPageChenged={onPageChenged} 
     totalItemsCount={totalUsersCount} pageSize={pageSize}/>
    <div>
    { users.map(u => <User user={u} followingInProgress={props.followingInProgress}
    unfollow={props.unfollow} follow={props.follow} key={u.id} />)} </div></div>}

export default Users