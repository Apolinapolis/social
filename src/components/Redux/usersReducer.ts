import { usersAPI } from "../../API/api";
import { userType } from "../../types/types";
import { updateObjinArr } from "../../utilits/objHelper";



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

const usersReducer = (state = initialState, action:any):initialStateType => {
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


export const followSuccess = (userId:number) => ({ type: FOLLOW, userId });
export const unfollowSuccess = (userId:number) => ({ type: UNFOLLOW, userId });
export const setUsers = (users:Array<userType>) => ({ type: SET_USERS, users });
export const setCurrentPage = (currentPage:number) => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalUsersCount = (totalUsersCount:number) => ({
  type: SET_TOTAL_COUNT,
  count: totalUsersCount,
});
export const toggleIsFetching = (isFetching:boolean) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});
export const toggleFollowingProgress = (isFetching:boolean, userId:number) => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  isFetching,
  userId,
});

export const getUsers = (currentPage:number, pageSize:number) => {
  return async (dispatch:any) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(currentPage));
    let data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
  };
};

const followFlow = async(dispatch:any, userId:number, apiMethod:any, actionCreator:any) => {
  dispatch(toggleFollowingProgress(true, userId));
  let response = await apiMethod(userId);
  if (response.data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleFollowingProgress(false, userId));
};

export const follow = (userId:number) => {
  return async (dispatch:any) => {
    followFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess)
}};

export const unfollow = (userId:number) => {
  return async (dispatch:any) => {
    followFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess)
  };
};

export default usersReducer;
