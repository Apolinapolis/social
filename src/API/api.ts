import axios from "axios";
import {userType} from "../types/types";


export const instance = axios.create({
  baseURL: `https://social-network.samuraijs.com/api/1.0/`,
  headers: { "API-KEY": "1721d0bf-4bc2-4cee-8d7e-6d0004333236" },
  withCredentials: true,
});


export enum ResultCodeEnum {
  Success = 0,
  Error = 1,
  CaptchaIsRequired = 10
}

export type GetItemsType = {
  items: Array<userType>
  totalCount: number
  error: string | null
}

export type ResponseType<D = {}> = {
  data: D
  messages: Array<string>
  resultCode: ResultCodeEnum
}