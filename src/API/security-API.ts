import {instance} from "./api";

type SecurityResponseType = {
    url: string;
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<SecurityResponseType>(`security/get-captcha-url`)
    }
};