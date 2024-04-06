//import { Navigate } from "react-router-dom";
import { usersAPI, profileAPI } from "../../API/api"
import { stopSubmit } from "redux-form";
import { photosType, postsType, profileType } from "../../types/types";


const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE"
const SET_STATUS = "SET_STATUS"
const DEL_POST = "DEL_POST"
const SAVE_PHOTO = "SAVE_PHOTO"



let initialState = {
  posts: [
    { id: 1, likesCount: 12, message: "Hello, BRO" },
    { id: 2, likesCount: 4, message: "Hello, B" },
    { id: 3, likesCount: 51, message: "Hell Oy" },
    { id: 4, likesCount: 614, message: "airuqp ppq uqweh b" },
    { id: 5, likesCount: 111, message: "It`s my first post!" }] as Array<postsType>,
    profile: null as profileType | null ,
    status: "it is status in profileReduser",
    newPostText: ''
}

export type initialStateType = typeof initialState

const profileReducer = (state = initialState, action:any):initialStateType => {
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: 5,
        message: action.myPostText,
        likesCount: 0,
      };
      return { ...state, posts: [...state.posts, newPost], newPostText: "" };
    case SET_USER_PROFILE:
      return { ...state, profile: action.profile };
    case SET_STATUS:
      return { ...state, status: action.status };
    case DEL_POST:
      return { ...state, posts: state.posts.filter(p => p.id !== action.postId) };
    case SAVE_PHOTO:
      return { ...state, profile: {...state.profile, photos: action.photos} };
    default:
      return state;
  }
};

type addPostActionCreatorType = {type: typeof ADD_POST, myPostText: string}
type setUserProfileType = {type: typeof SET_USER_PROFILE, profile: profileType}
type setStatusType = {type: typeof SET_STATUS, status: string}
type deletePostType = {type: typeof DEL_POST, postId: number}
type savePhotoType = {type: typeof SAVE_PHOTO, photos: photosType}

export const addPostActionCreator = (myPostText:string):addPostActionCreatorType => ({ type: ADD_POST, myPostText });
export const setUserProfile = (profile:profileType):setUserProfileType => ({ type: SET_USER_PROFILE, profile});
export const setStatus = (status:string):setStatusType => ({ type: SET_STATUS, status});
export const deletePost = (postId:number):deletePostType => ({ type: DEL_POST, postId});
export const savePhotoSuccess = (photos:photosType):savePhotoType => ({ type: SAVE_PHOTO, photos});

export const getUserProfile = (userId:number) => async (dispatch:any) => {
  //if (!userId)  return <Navigate to={"/login"}/>
  let response = await usersAPI.getProfile(userId)
  dispatch(setUserProfile(response.data))
  };

export const getStatus = (userId:number) => async (dispatch:any) => {
 // if (!userId)  return <Navigate to={"/login"}/>
  let response = await profileAPI.getStatus(userId);
  dispatch(setStatus(response.data))
  }

export const updateStatus = (status:string) => async (dispatch:any) => { 
  try {
  let response = await profileAPI.updateStatus(status)
  if (response.data.resultCode === 0){ dispatch(setStatus(status)) }
} catch(error) {console.error("Some error")}}

 export const savePhoto = (file:any) => async (dispatch:any) => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {dispatch(savePhotoSuccess(response.data.data.photos))}
  }

 export const saveProfile = (profile:profileType) => async (dispatch:any, getState:any) => {
  const userId = getState().auth.userId
  const response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {dispatch(getUserProfile(userId))}
    else {dispatch(stopSubmit("edit-profile", { _error: response.data.messages[0] }))
    return Promise.reject(response.data.messages[0])
  }}

export default profileReducer;
