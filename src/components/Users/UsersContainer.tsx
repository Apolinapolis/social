import React from "react"
import Users from "./Users"
import Preloader from "../common/preloader";
import { connect } from "react-redux";
import { follow, unfollow, requestUsers } from "../Redux/usersReducer";
import { compose } from "redux";
import { getSuper, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress} from "../Redux/userSelectors";
import { userType } from "../../types/types";
import { appStateType } from "../Redux/reduxStore";

type dispatchPropsType = {
   unfollow: (userId:number) => void
   follow: (userId:number) => void
   requestUsers: (currentPage: number, pageSize: number) => void
}
type mapStatePropsType = { 
   currentPage: number
   pageSize: number
   isFetching: boolean
   totalUsersCount: number
   users: Array<userType>
   followingInProgress: Array<number>
}
type ownPropsType = {
   pageTitle: string
}

type propsType = dispatchPropsType & mapStatePropsType & ownPropsType


class UsersComponent extends React.Component<propsType> {

   componentDidMount() {
      const {currentPage, pageSize} = this.props
      this.props.requestUsers(currentPage, pageSize)
   }

   onPageChenged = (pageNumber:number) => {
      const {pageSize} = this.props;
      this.props.requestUsers(pageNumber, pageSize)
   }

   render() {return <> 
   <h2>{this.props.pageTitle}</h2>
   {this.props.isFetching ? <Preloader /> : null} 
      <Users
         totalUsersCount={this.props.totalUsersCount}
         pageSize={this.props.pageSize}
         currentPage={this.props.currentPage}
         users={this.props.users}
         unfollow={this.props.unfollow}
         follow={this.props.follow}
         onPageChenged={this.onPageChenged}
         followingInProgress = {this.props.followingInProgress}
      /> </>}
}

let mapStateToProps = (state:appStateType):mapStatePropsType => {
   return {
      users: getSuper (state),
      pageSize: getPageSize(state),
      totalUsersCount: getTotalUsersCount(state),
      currentPage: getCurrentPage(state),
      isFetching: getIsFetching(state),
      followingInProgress: getFollowingInProgress(state)
   }
}

export default compose<React.Component>(connect(mapStateToProps, {follow, unfollow, requestUsers}))(UsersComponent)