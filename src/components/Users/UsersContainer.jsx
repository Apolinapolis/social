import React from "react"
import Users from "./Users"
import Preloader from "../common/preloader";
import { connect } from "react-redux";
import { follow, unfollow, setCurrentPage, toggleFollowingProgress, getUsers } from "../Redux/usersReducer";
import { compose } from "redux";
import { getStatus } from "../Redux/profileReducer";
import { getSuper, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress} from "../Redux/userSelectors";

class UsersComponent extends React.Component {

   componentDidMount() {
      const {currentPage, pageSize} = this.props
      this.props.getUsers(currentPage, pageSize)
   }

   onPageChenged = (pageNumber) => {
      const {pageSize} = this.props;
      this.props.getUsers(pageNumber, pageSize)
   }

   render() {return <> {this.props.isFetching 
      ? <Preloader /> 
      : null} 
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

let mapStateToProps = (state) => {
   return {
      users: getSuper (state),// reselect
      pageSize: getPageSize(state),
      totalUsersCount: getTotalUsersCount(state),
      currentPage: getCurrentPage(state),
      isFetching: getIsFetching(state),
      followingInProgress: getFollowingInProgress(state),
   }
}

export default compose((connect (mapStateToProps, {getStatus, follow, unfollow, setCurrentPage,toggleFollowingProgress, getUsers})))(UsersComponent)