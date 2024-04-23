import { stopSubmit } from "redux-form";
import { photosType, postsType, profileType } from "../../types/types";
import {profileAPI} from "../../API/profile-API";
import {BaseThunkType, InferActionsTypes} from "./reduxStore";


const ADD_POST = "SN/profile/ADD-POST";
const SET_USER_PROFILE = "SN/profile/SET_USER_PROFILE"
const SET_STATUS = "SN/profile/SET_STATUS"
const DEL_POST = "SN/profile/DEL_POST"
const SAVE_PHOTO = "SN/profile/SAVE_PHOTO"


let initialState = {
  posts: [
    { id: 1, likesCount: 12, message: "Hello, BRO" },
    { id: 2, likesCount: 4, message: "Hello, B" },
    { id: 3, likesCount: 51, message: "Hell Oy" },
    { id: 4, likesCount: 614, message: "nastroenie super" },
    { id: 5, likesCount: 111, message: "It`s my first post!" }] as Array<postsType>,
    profile: null as profileType | null ,
    status: "it is status in profileReducer",
    newPostText: ''
}

const profileReducer = (state = initialState, action:ActionsType):initialStateType => {
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

export const actions = {
  addPostActionCreator: (myPostText:string) => ({ type: ADD_POST, myPostText }as const),
  setUserProfile: (profile:profileType) => ({ type: SET_USER_PROFILE, profile}as const),
  setStatus: (status:string) => ({ type: SET_STATUS, status}as const),
  deletePost: (postId:number) => ({ type: DEL_POST, postId}as const),
  savePhotoSuccess: (photos:photosType) => ({ type: SAVE_PHOTO, photos}as const)
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

 export const savePhoto = (file:any):ThunkType => async (dispatch) => {
    let response = await profileAPI.savePhoto(file)
    if (response.resultCode === 0) {dispatch(actions.savePhotoSuccess(response.data.photos))}
  }

 export const saveProfile = (profile:profileType):ThunkType => async (dispatch:any, getState:any) => {
  const userId = getState().auth.userId
  const response = await profileAPI.saveProfile(profile)
    if (response.resultCode === 0) {dispatch(getUserProfile(userId))}
    else {dispatch(stopSubmit("edit-profile", { _error: response.messages[0] }))
    return Promise.reject(response.messages[0])
  }}

export default profileReducer;


type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>
export type initialStateType = typeof initialState
