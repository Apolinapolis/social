import { getAuthUserData } from "./authReducer"
import {InferActionsTypes} from "./reduxStore";


let initialState = { initialized: false };

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>

const actions = {initializedSuccess: () => ({ type: "SN/APP/SET_INITIALIZED" } as const)}

const appReducer = (state = initialState, action:ActionsType):InitialStateType => {
  switch (action.type) {
    case "SN/APP/SET_INITIALIZED":
      return {...state, initialized: true}
    default: return state
}}

export const initializeApp = () => (dispatch:any) => {
  let promise = dispatch(getAuthUserData());
  Promise.all([promise])
  .then(() => {dispatch(actions.initializedSuccess())})
}


export default appReducer