import { stopSubmit } from "redux-form"
import { ResultCodeEnum } from "../../API/api";
import {authAPI} from "../../API/authAPI";
import {securityAPI} from "../../API/security-API";
import {BaseThunkType, InferActionsTypes} from "./reduxStore";


let initialState = {
  userId: null as number | null ,
  email: null as string | null,
  login: null as string | null,
  isAuth: false ,
  captchaUrl: null as string | null,
};

export const actions = {

  setUserData: (userId: number | null, email: string | null, login: string, isAuth: boolean) => (
  { type: "SN/auth/SET_USER_DATA", payload: { userId, email, login, isAuth } } as const),

  getCaptchaUrlSuccess: (captchaUrl: string) => (
      { type: "SN/auth/GET_CAPTCHA_URL_SUCCESS", payload: { captchaUrl } } as const)
}

const authReducer = (state = initialState, action: ActionsType): initialStateType => {
  switch (action.type) {
    case "SN/auth/SET_USER_DATA":
    case "SN/auth/GET_CAPTCHA_URL_SUCCESS":
      return { ...state, ...action.payload }
    default: return state
  }
}

export const getAuthUserData = ():ThunkType => async (dispatch) => {
  const meData = await authAPI.me();
  if (meData.resultCode === ResultCodeEnum.Success) {
    let { id, email, login } = meData.data;
    dispatch(actions.setUserData(id, email, login, true));
  }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string):ThunkType => async (dispatch) => {
  let data = await authAPI.login(email, password, rememberMe, captcha);
  if (data.resultCode === ResultCodeEnum.Success) {
    dispatch(getAuthUserData());
  } else {
    if (data.resultCode === ResultCodeEnum.CaptchaIsRequired) {
      dispatch(getCaptchaUrl())
    }
  }

  {
    let message = data.messages.length > 0 ? data.messages[0] : "Some error";
    dispatch(stopSubmit("login", { _error: message }))
  }
};

export const logout = ():ThunkType => async (dispatch) => {
  let response = await authAPI.logout();
  if (response.data.resultCode === 0) {
    dispatch(actions.setUserData(null, null, null, false));
  }
};

export const getCaptchaUrl = ():ThunkType => async (dispatch) => {
  const data = await securityAPI.getCaptchaUrl()
  const captchaUrl = data.data.url
  dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
};

export default authReducer;

export type initialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | ReturnType<typeof stopSubmit>>