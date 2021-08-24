import {AppStateType} from "./redux-store";


export const selectUserId = (state: AppStateType) => {
    return state.auth.id;
}

export const selectLogin = (state: AppStateType) => {
    return state.auth.login;
}

export const selectEmail = (state: AppStateType) => {
    return state.auth.email;
}

export const selectIsAuth = (state: AppStateType) => {
    return state.auth.isAuth;
}

export const selectCaptchaUrl = (state: AppStateType) => {
    return state.auth.captchaUrl;
}

export const selectErrorMessage = (state: AppStateType) => {
    return state.auth.errorMessage;
}