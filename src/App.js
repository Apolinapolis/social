import "./App.css";
import HeaderContainer from "./components/Header/HeaderContainer";
import UsersContainer from "./components/Users/UsersContainer";
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import Login from "./components/Login/login";
import { Route, Routes, redirect } from "react-router-dom";
import React ,{ Component, } from "react";
import { connect } from "react-redux";
import { initializeApp } from "./components/Redux/appReducer.ts";
import Preloader from "./components/common/preloader";
import { compose } from "redux";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import store from "./components/Redux/reduxStore";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));



class App extends Component {

  cathAllUnhandledError = (promiseRejectionEvent) => {
    console.error(promiseRejectionEvent)
  }

 componentDidMount() {
  this.props.initializeApp();
  window.addEventListener("unhandledrejection", this.cathAllUnhandledError)
}

componentWillUnmount() {
  window.removeEventListener("unhandledrejection", this.cathAllUnhandledError)
}

 render(){ 
 if (!this.props.initialized) {return <Preloader/>}
  return ( <React.Suspense fallback={<div><Preloader /></div>}>
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wpapper-content">
          <Routes>
          <Route exact path="" element={<ProfileContainer/>}/>
            <Route path="/profile/:userId?" element={<ProfileContainer/>}/>
            <Route path="/dialogs" element={<DialogsContainer/>}/>
            <Route path="/users" element={<UsersContainer pageTitle={'Самураи'}/>}/>
            <Route path="/news" element={<News />} />
            <Route path="/music" element={<Music />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<div>404 NOT FOUND</div>} />
          </Routes>
        </div>
      </div></React.Suspense>
  );
}}

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component {...props} router={{ location, navigate, params }} />
    );
  }
  return ComponentWithRouterProp;
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

const AppContainer = compose(withRouter, connect(mapStateToProps, {initializeApp}))(App);

const SamuraiJSApp = (props) => {
  return <BrowserRouter basename={process.env.PUBLIC_URL}>
  <Provider store = {store}>
  <AppContainer/>
  </Provider></BrowserRouter>
}

export default SamuraiJSApp