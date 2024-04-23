import { Action, applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from "redux";
import {thunk as thunkMiddleware, ThunkAction} from "redux-thunk"
import { reducer as reduxForm } from "redux-form";
import sidebarReducer from "./sidebarReducer";
import dialogsReducer from "./dialogsReducer";
import profileReducer from "./profileReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import appReducer from "./appReducer";

let rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
  form: reduxForm,
})

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, appStateType, unknown, A>
export type appStateType = ReturnType<rootReducerType>
type rootReducerType = typeof rootReducer
type propertiesTypes<T> = T extends { [key: string] : infer U } ? U : never
export type InferActionsTypes<T extends { [key: string] : (...args: any[]) => any}> = ReturnType<propertiesTypes<T>>


 
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

export default store;
