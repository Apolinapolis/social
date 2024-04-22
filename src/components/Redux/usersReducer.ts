import { Dispatch } from "react";
import { userType } from "../../types/types";
import { updateObjinArr } from "../../utilits/objHelper";
import { InferActionsTypes, appStateType } from "./reduxStore";
import { ThunkAction } from "redux-thunk";
import {usersAPI} from "../../API/users-API";


type dispatchType = Dispatch<actionsType>
type ThunkType = ThunkAction<Promise<void>, appStateType, unknown, actionsType>

type initialStateType = typeof initialState

type actionsType = InferActionsTypes<typeof actions>

let initialState = {
  users: [] as Array<userType>,
  pageSize: 10,
  totalItemsCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>,
};


const usersReducer = (state = initialState, action:actionsType):initialStateType => {
  switch (action.type) {
    case 'FOLLOW':
      return {
        ...state,
        users: updateObjinArr(state.users, action.userId, "id", {followed: true})
      };
    case "UNFOLLOW":
      return {
        ...state,
        users: updateObjinArr(state.users,action.userId, "id", {followed: false})
      };
    case "SET_USERS":
      return { ...state, users: action.users };
    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.currentPage };
    case "SET_TOTAL_COUNT":
      return { ...state, totalItemsCount: action.count };
    case "TOGGLE_IS_FETCHING":
      return { ...state, isFetching: action.isFetching };
    case "TOGGLE_IS_FOLLOWING_PROGRESS":
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId),
      };
    default:
      return state;
  }
}

export const actions = {
  followSuccess: (userId:number) => ({ type: "FOLLOW", userId } as const),
  unfollowSuccess: (userId:number) => ({ type: "UNFOLLOW", userId }as const),
  setUsers: (users:Array<userType>) => ({ type: "SET_USERS", users }as const),
  setCurrentPage: (currentPage:number) => ({type: "SET_CURRENT_PAGE", currentPage}as const),
  setTotalUsersCount: (totalUsersCount:number) => ({ type: "SET_TOTAL_COUNT", count: totalUsersCount }as const),
  toggleIsFetching: (isFetching:boolean) => ({ type: "TOGGLE_IS_FETCHING", isFetching }as const),
  toggleFollowingProgress: (isFetching:boolean, userId:number) => ({ type: "TOGGLE_IS_FOLLOWING_PROGRESS",isFetching,userId }as const),
}


export const requestUsers = (currentPage:number, pageSize:number):ThunkType => { 
  return async (dispatch, getState) => {
    dispatch(actions.setCurrentPage(currentPage));
    dispatch(actions.toggleIsFetching(true));
    let data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(actions.toggleIsFetching(false));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUsersCount(data.totalCount));
  };
};

const followFlow = async(dispatch:dispatchType, userId:number, apiMethod:any, actionCreator:(userId:number) => actionsType) => {
  dispatch(actions.toggleFollowingProgress(true, userId));
  let response = await apiMethod(userId);
  if (response.data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(actions.toggleFollowingProgress(false, userId));
};

export const follow = (userId:number):ThunkType => {
  return async (dispatch) => {
    followFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess)
}};

export const unfollow = (userId:number):ThunkType => {
  return async (dispatch) => {
    followFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess)
  };
};

export default usersReducer;
