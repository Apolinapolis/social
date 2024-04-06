const SEND_MESSAGE = "SEND_MESSAGE"
const diaPhoto = "https://thumbs.dreamstime.com/b/го-ова-бойскаута-м-а-шей-группы-90271267.jpg"

type dialogsType = {
  name: string
  id: number
  photo: string
}

 type messageType = {
  id: number
  message: string
 }

let initialState = {
  dialogs: [
    { name: "Diman", id: 1, photo: diaPhoto },
    { name: "Roman", id: 2, photo: diaPhoto },
    { name: "Sweet Olga", id: 3, photo: diaPhoto },
    { name: "SerTUR", id: 4, photo: diaPhoto },
    { name: "Dophamin Hunter", id: 5, photo: diaPhoto } ] as Array<dialogsType> , 
  message: [
    { id: 1, message: "Hello!" },
    { id: 2, message: "apolinapolis, its realy you?!" },
    { id: 3, message: "i`m youre friend to!" },
    { id: 4, message: "paha!" },
    { id: 5, message: "Ohh... its Grossartich!" },
  ] as Array<messageType> ,
}

export type initialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: any):initialStateType => {
  switch (action.type) {
    case SEND_MESSAGE:
      let body = action.newMessageBody;
      return { ...state, message: [...state.message, { id: 6, message: body }] }
    default:
      return state;
  }
}

type sendMessageCreatorActionType = {
  type: typeof SEND_MESSAGE
  newMessageBody: string
}

export const sendMessageCreator = (newMessageBody: string):sendMessageCreatorActionType => ({ type: SEND_MESSAGE, newMessageBody });

export default dialogsReducer;
