const SEND_MESSAGE = "SEND_MESSAGE";

let initialState = {
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
    { id: 4, message: "paha!" },
    { id: 5, message: "Ohh... its Grossartich!" },
  ],
}

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      let body = action.newMessageBody;
      return {...state, message: [...state.message, { id: 6, message: body }]}
    default:
      return state;
  }
};

export const sendMessageCreator = (newMessageBody) => ({ type: SEND_MESSAGE, newMessageBody });

export default dialogsReducer;
