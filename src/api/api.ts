import axios from 'axios';
import {UserType} from "../types/types";

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'ec2e9a15-4537-4157-b59b-05bf7fc797c2'
    },
    withCredentials: true
});

export type APIResponseType<D = {}, RC = ResultCodeEnum> = {
    resultCode: RC
    messages: Array<string>,
    data: D
}

export type GetUsersResponseType = {
    items: UserType[],
    totalCount: number,
    error: string | null
}

export enum ResultCodeEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}