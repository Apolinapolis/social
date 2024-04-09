import { Dispatch } from "react";
import { usersAPI } from "../../API/api";
import { userType } from "../../types/types";
import { updateObjinArr } from "../../utilits/objHelper";
import { appStateType } from "./reduxStore";
import { ThunkAction } from "redux-thunk";



const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_COUNT = "SET_TOTAL_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";

let initialState = {
  users: [] as Array<userType>,
  pageSize: 10,
  totalItemsCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>,
};

type initialStateType = typeof initialState

type actionsType = followSuccessActionType | unfollowSuccessActionType | setUsersActionType 
| setCurrentPageActionType | setTotalUsersCountActionType | toggleIsFetchingActionType | toggleFollowingProgressActionType

const usersReducer = (state = initialState, action:actionsType):initialStateType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateObjinArr(state.users, action.userId, "id", {followed: true})
      };
    case UNFOLLOW:
      return {
        ...state,
        users: updateObjinArr(state.users,action.userId, "id", {followed: false})
      };
    case SET_USERS:
      return { ...state, users: action.users };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage };
    case SET_TOTAL_COUNT:
      return { ...state, totalItemsCount: action.count }; //  totalUsersCount
    case TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.isFetching };
    case TOGGLE_IS_FOLLOWING_PROGRESS:
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId),
      };
    default:
      return state;
  }
};

type followSuccessActionType = {
  type: typeof FOLLOW
  userId: number
}
type unfollowSuccessActionType = {
  type: typeof UNFOLLOW
  userId: number
}
type setUsersActionType = {
  type: typeof SET_USERS
  users: Array<userType>
}
type setCurrentPageActionType = {
  type: typeof SET_CURRENT_PAGE
  currentPage: number
}
type setTotalUsersCountActionType = {
  type: typeof SET_TOTAL_COUNT
  count: number
}
type toggleIsFetchingActionType = {
  type: typeof TOGGLE_IS_FETCHING
  isFetching: boolean
}
type toggleFollowingProgressActionType = {
  type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
  isFetching: boolean
  userId: number
}


type getStateType = ()=> appStateType
type dispatchType = Dispatch<actionsType>
type ThunkType = ThunkAction<Promise<void>, appStateType, unknown, actionsType>

export const followSuccess = (userId:number):followSuccessActionType => ({ type: FOLLOW, userId });
export const unfollowSuccess = (userId:number):unfollowSuccessActionType => ({ type: UNFOLLOW, userId });
export const setUsers = (users:Array<userType>):setUsersActionType => ({ type: SET_USERS, users });
export const setCurrentPage = (currentPage:number):setCurrentPageActionType => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalUsersCount = (totalUsersCount:number):setTotalUsersCountActionType => ({ type: SET_TOTAL_COUNT, count: totalUsersCount });
export const toggleIsFetching = (isFetching:boolean):toggleIsFetchingActionType => ({ type: TOGGLE_IS_FETCHING, isFetching });
export const toggleFollowingProgress = (isFetching:boolean, userId:number):toggleFollowingProgressActionType => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS,isFetching,userId });

export const requestUsers = (currentPage:number, pageSize:number):ThunkType => { 
  return async (dispatch, getState) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(currentPage));
    let data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
  };
};

const followFlow = async(dispatch:dispatchType, userId:number, apiMethod:any, actionCreator:(userId:number)=> followSuccessActionType | unfollowSuccessActionType) => {
  dispatch(toggleFollowingProgress(true, userId));
  let response = await apiMethod(userId);
  if (response.data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleFollowingProgress(false, userId));
};

export const follow = (userId:number):ThunkType => {
  return async (dispatch) => {
    followFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess)
}};

export const unfollow = (userId:number):ThunkType => {
  return async (dispatch) => {
    followFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess)
  };
};

export default usersReducer;
