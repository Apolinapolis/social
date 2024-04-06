import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import sidebarReducer from "./sidebarReducer";

let store = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, likesCount: 12, message: "Hello, BRO" },
        { id: 2, likesCount: 4, message: "Hello, BRrrrrr" },
        { id: 3, likesCount: 51, message: "Hell Oy" },
        { id: 4, likesCount: 614, message: "airuqp ppq uqweh b" },
        { id: 5, likesCount: 111, message: "It`s my first post!" },
      ],
      newPostText: "fuck! eah",
    },
    dialogsPage: {
      dialogs: [
        {
          name: "Diman",
          id: 1,
          photo:
            "https://thumbs.dreamstime.com/b/го-ова-бойскаута-м-а-шей-группы-90271267.jpg",
        },
        {
          name: "Roman",
          id: 2,
          photo:
            "https://thumbs.dreamstime.com/b/го-ова-бойскаута-м-а-шей-группы-90271267.jpg",
        },
        {
          name: "Samochka olga",
          id: 3,
          photo:
            "https://thumbs.dreamstime.com/b/го-ова-бойскаута-м-а-шей-группы-90271267.jpg",
        },
        {
          name: "Serdey",
          id: 4,
          photo:
            "https://thumbs.dreamstime.com/b/го-ова-бойскаута-м-а-шей-группы-90271267.jpg",
        },
        {
          name: "No name hero",
          id: 5,
          photo:
            "https://thumbs.dreamstime.com/b/го-ова-бойскаута-м-а-шей-группы-90271267.jpg",
        },
      ],
      message: [
        { id: 1, message: "Hello!" },
        { id: 2, message: "apolinapolis, its realy you?!" },
        { id: 3, message: "i`m youre friend to!" },
        { id: 4, message: "WAZZZZAP!" },
        { id: 5, message: "Ohh... its Grossartich!" },
      ],
      newMessageBody: "",
    },
    sidebar: {
      friends: [{ name: "Sergey" }, { name: "Larra" }, { name: "Olav" }],
    },
  },
  _callSubscriber() {
    alert("called subscriber on State.js / store");
  },
  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._state.sidebar = sidebarReducer(this._state.sidebar, action);
    this._callSubscriber(this._state);
  },
};
window.store = store
export default store;

