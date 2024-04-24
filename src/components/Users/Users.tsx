import React, {FC} from "react";
import Paginator from "../common/paginator/Paginator";
import {userType} from "../../types/types";
import User from "./User"

type propsType = {
    currentPage: number
    totalUsersCount: number
    pageSize: number
    onPageChenged: (pageNumber: number) => void
    users: Array<userType>
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void

}


let Users: FC<propsType> = ({currentPage, totalUsersCount, pageSize, onPageChenged, users, ...props}) => {
    return (
        <div>
            <Paginator
                currentPage={currentPage}
                onPageChenged={onPageChenged}
                totalItemsCount={totalUsersCount}
                pageSize={pageSize}
            />
            <div>
                {users.map(u => <User user={u} followingInProgress={props.followingInProgress}
                                      unfollow={props.unfollow} follow={props.follow} key={u.id}/>)
                }
            </div>
        </div>
    )
}

export default Users