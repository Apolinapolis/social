import axios from "axios";
import { profileType } from "../types/types";

export enum ResultCodeEnum {
  Success = 0,
  Error = 1,
  CaptchaIsRequired = 10
}

type meResponseType = {
  data: { 
    id: number 
    email: string 
     login:string 
     }
  resultCode:ResultCodeEnum
  messages: Array<string>
}
type loginResponseType = {
  data: { 
    userId: number 
     }
  resultCode:ResultCodeEnum
  messages: Array<string>
}


const instance = axios.create({
  baseURL: `https://social-network.samuraijs.com/api/1.0/`,
  headers: { "API-KEY": "1721d0bf-4bc2-4cee-8d7e-6d0004333236" },
  withCredentials: true,
});

export const usersAPI = {
  async getUsers(currentPage = 1, pageSize = 10) {
    const response = await instance.get(
      `users?page=${currentPage}&count=${pageSize}`
    );
    return response.data;
  },

  follow(userId:number) {
    return instance.post(`follow/${userId}`);
  },
  unfollow(userId:number) {
    return instance.delete(`follow/${userId}`);
  },
  getProfile(userId:number) {
    return profileAPI.getProfile(userId);
  },
};

export const authAPI = {
  me() {
    return instance.get<meResponseType>(`auth/me`).then(res => res.data)
  },
  login(email:string, password:string, rememberMe:boolean = false, captcha:string | null = null) {
    return instance.post<loginResponseType>(`auth/login`, { email, password, rememberMe, captcha}).then(res => res.data)
  },
  logout() {
    return instance.delete(`auth/login`);
  },
};

//instance.get<string>(`auth/me`).then((response) => response.data.toUpperCase())

export const profileAPI = {
  getProfile(userId:number) {
    return instance.get(`profile/` + userId);
  }, // trable? undefind
  getStatus(userId:number) {
    return instance.get(`profile/status/` + userId);
  },
  updateStatus(status:string) {
    return instance.put(`profile/status`, { status: status });
  },
  savePhoto(photoFile:string) {
    let formData = new FormData();
    formData.append("image", photoFile);
    return instance.put(`profile/photo`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  saveProfile(profile:profileType) {
    return instance.put(`profile/`, profile)
  },
};


export const securityAPI = { getCaptchaUrl() { return instance.get(`security/get-captcha-url`)} };