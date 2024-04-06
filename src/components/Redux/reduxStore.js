import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from "redux";
import { thunk as thunkMiddleware} from "redux-thunk"
import { reducer as reduxForm } from "redux-form";
import sidebarReducer from "./sidebarReducer";
import dialogsReducer from "./dialogsReducer";
import profileReducer from "./profileReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import appReducer from "./appReducer.ts";




let reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
  form: reduxForm,

})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))

//let store = createStore(reducers, applyMiddleware(thunkMiddleware));
export default store;
