import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from "redux";
import { thunk as thunkMiddleware} from "redux-thunk"
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
 
type rootReducerType = typeof rootReducer
export type appStateType = ReturnType<rootReducerType>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

export default store;
