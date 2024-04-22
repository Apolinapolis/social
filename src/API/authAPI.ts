import {instance, ResponseType} from "./api";

type meResponseType = {
        id: number
        email: string
        login: string
}
type loginResponseType = {
        userId: number
}

export const authAPI = {
    me() {
        return instance.get<ResponseType<meResponseType>>(`auth/me`).then(res => res.data)
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: string | null = null) {
        return instance.post<ResponseType<loginResponseType>>(`auth/login`, {
            email,
            password,
            rememberMe,
            captcha
        }).then(res => res.data)
    },
    logout() {
        return instance.delete(`auth/login`);
    },
};