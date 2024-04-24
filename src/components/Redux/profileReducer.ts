import {FormAction} from "redux-form/lib/actions";
import { photosType, postsType, profileType } from "../../types/types";
import {profileAPI} from "../../API/profile-API";
import {BaseThunkType, InferActionsTypes} from "./reduxStore";
import {stopSubmit} from "redux-form";


let initialState = {
  posts: [
    { id: 1, likesCount: 12, message: "Hello, BRO" },
    { id: 2, likesCount: 4, message: "Hello, B" },
    { id: 3, likesCount: 51, message: "Hell Oy" },
    { id: 4, likesCount: 614, message: "I love development" },
    { id: 5, likesCount: 111, message: "It`s my first post!" }] as Array<postsType>,
    profile: null as profileType | null ,
    status: "it is status in profileReducer",
    newPostText: ''
}

const profileReducer = (state = initialState, action:ActionsType):initialStateType => {
  switch (action.type) {
    case "SN/profile/ADD-POST":
      let newPost = {
        id: 5,
        message: action.myPostText,
        likesCount: 0,
      };
      return { ...state, posts: [...state.posts, newPost], newPostText: "" };
    case "SN/profile/SET_USER_PROFILE":
      return { ...state, profile: action.profile };
    case "SN/profile/SET_STATUS":
      return { ...state, status: action.status };
    case "SN/profile/DEL_POST":
      return { ...state, posts: state.posts.filter(p => p.id !== action.postId) };
    case "SN/profile/SAVE_PHOTO":
      return { ...state, profile: {...state.profile, photos: action.photos} };
    default:
      return state;
  }
};

export const actions = {
  addPostActionCreator: (myPostText:string) => ({ type: "SN/profile/ADD-POST", myPostText }as const),
  setUserProfile: (profile:profileType) => ({ type: "SN/profile/SET_USER_PROFILE", profile}as const),
  setStatus: (status:string) => ({ type: "SN/profile/SET_STATUS", status}as const),
  deletePost: (postId:number) => ({ type: "SN/profile/DEL_POST", postId}as const),
  savePhotoSuccess: (photos:photosType) => ({ type: "SN/profile/SAVE_PHOTO", photos}as const)
}

export const getUserProfile = (userId:number):ThunkType => async (dispatch) => {
  //if (!userId)  return <Navigate to={"/login"}/>
  let response = await profileAPI.getProfile(userId)
  dispatch(actions.setUserProfile(response))
  };

export const getStatus = (userId:number):ThunkType => async (dispatch) => {
 // if (!userId)  return <Navigate to={"/login"}/>
  let response = await profileAPI.getStatus(userId);
  dispatch(actions.setStatus(response))
  }

export const updateStatus = (status:string):ThunkType => async (dispatch) => {
  try {
  let response = await profileAPI.updateStatus(status)
  if (response.resultCode === 0){ dispatch(actions.setStatus(status)) }
} catch(error) {console.error("Some error")}}

export const savePhoto = (file:File):ThunkType => async (dispatch) => { // File
    let response = await profileAPI.savePhoto(file)
    if (response.resultCode === 0) {dispatch(actions.savePhotoSuccess(response.data.photos))}
  }

export const saveProfile = (profile:profileType):ThunkType => async (dispatch, getState) => {
  const userId = getState().auth.userId
  const data = await profileAPI.saveProfile(profile)

    if (data.resultCode === 0) {
      if(userId != null) {
        dispatch(getUserProfile(userId))
      }else {throw new Error("user id can`t be null.")
      }
    }else {dispatch(stopSubmit("edit-profile", { _error: data.messages[0] }))
    return Promise.reject(data.messages[0])
  }}

export default profileReducer;


type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>
export type initialStateType = typeof initialState
