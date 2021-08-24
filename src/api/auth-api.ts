import {APIResponseType, instance, ResultCodeEnum, ResultCodeForCaptchaEnum} from "./api";


type LoginResponseDataType = {
    userId: number
}

type MeResponseDataType = {
    id: number,
    email: string,
    login: string
}

export const authAPI = {
    login (email: string, password: string, rememberMe: boolean, captcha: string | null = null) {
        return instance.post<APIResponseType<LoginResponseDataType, ResultCodeEnum | ResultCodeForCaptchaEnum>>('auth/login', {email, password, rememberMe, captcha}).then(res => res.data);
    },
    logout () {
        return instance.delete<APIResponseType>('auth/login').then(res => res.data);
    },
    me () {
        return instance.get<APIResponseType<MeResponseDataType>>('auth/me').then(res => res.data);
    }
}