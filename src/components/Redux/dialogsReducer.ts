import {InferActionsTypes} from "./reduxStore";

const diaPhoto = "https://thumbs.dreamstime.com/b/го-ова-бойскаута-м-а-шей-группы-90271267.jpg"

export const actions = {sendMessageCreator: (newMessageBody: string) => ({ type: "SEND_MESSAGE", newMessageBody } as const)}
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

const dialogsReducer = (state = initialState, action: ActionsType):initialStateType => {
  switch (action.type) {
    case "SEND_MESSAGE":
      let body = action.newMessageBody;
      return { ...state, message: [...state.message, { id: 6, message: body }] }
    default:
      return state;
  }
}

export default dialogsReducer;

type dialogsType = {
  name: string
  id: number
  photo: string
}

type messageType = {
  id: number
  message: string
}

type ActionsType = InferActionsTypes<typeof actions>

export type initialStateType = typeof initialState
