import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {authAPI} from "../api/auth-api";
import {ResultCodeEnum, ResultCodeForCaptchaEnum} from "../api/api";
import {securityAPI} from "../api/security-api";


let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null,
    errorMessage: null as string | null
};

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type) {
        case 'SN/AUTH/SET_AUTH_USER_DATA':
            return {...state, ...action.payload };
        case 'SN/AUTH/SET_CAPTCHA_URL':
            return {...state, captchaUrl: action.captchaUrl};
        case 'SN/AUTH/SET_ERROR_MESSAGE':
            return {...state, errorMessage: action.errorMessage};
        case 'SN/AUTH/DELETE_CAPTCHA_URL':
            return {...state, captchaUrl: null}
        default:
            return state;
    }
}

export const actions = {
    setAuthUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({type: 'SN/AUTH/SET_AUTH_USER_DATA', payload: {id, email, login, isAuth}} as const),
    setCaptchaUrl: (captchaUrl: string) => ({type: 'SN/AUTH/SET_CAPTCHA_URL', captchaUrl} as const),
    setErrorMessage: (errorMessage: string | null) => ({type: 'SN/AUTH/SET_ERROR_MESSAGE', errorMessage} as const),
    deleteCaptchaUrl: () => ({type: 'SN/AUTH/DELETE_CAPTCHA_URL'} as const)
};

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    const data = await authAPI.me();
    const userData = data.data
    if(data.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.setAuthUserData(userData.id, userData.email, userData.login, true))
    }
};

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch, getState) => {
    const errorMessage = getState().auth.errorMessage;
    const captchaUrl = getState().auth.captchaUrl;
    errorMessage && dispatch(actions.setErrorMessage(null));
    const data = await authAPI.login(email, password, rememberMe, captcha);
    if(data.resultCode === ResultCodeEnum.Success) {
        await dispatch(getAuthUserData());
        captchaUrl && dispatch(actions.deleteCaptchaUrl());
    } else if(data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
        await dispatch(getCaptchaUrl());
        dispatch(actions.setErrorMessage('Incorrect e-mail or password. Captcha is required.'))
    }  else if(data.resultCode === ResultCodeEnum.Error) {
        dispatch(actions.setErrorMessage('Incorrect e-mail or password.'));
    }
};

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl();
    dispatch(actions.setCaptchaUrl(data.url));
};

export const logout = (): ThunkType => async (dispatch) => {
    const data = await authAPI.logout();
    if(data.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false));
    }
}

export type InitialStateType = typeof initialState;

type ActionsTypes = InferActionsTypes<typeof actions>;

type ThunkType = BaseThunkType<ActionsTypes>;

export default authReducer;