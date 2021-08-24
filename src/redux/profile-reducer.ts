import {PhotosType, PostType, ProfileType} from "../types/types";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {profileAPI} from "../api/profile-api";
import {ResultCodeEnum} from "../api/api";


let initialState = {
    posts: [
        {id: 1, message: 'Where is my money, nigga?!', likesCount: 2},
        {id: 2, message: 'Trololo!', likesCount: 10},
        {id: 3, message: 'Just wanna say Hi=)', likesCount: 1}
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: ''
}

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type) {
        case 'SN/PROFILE/ADD_POST':
            const newPost: PostType = {id: state.posts.length + 1, message: action.newPostText, likesCount: 0};
            return {...state, posts: [...state.posts, newPost]};
        case 'SN/PROFILE/DELETE_POST':
            return {...state, posts: state.posts.filter((p) => p.id !== action.postId)};
        case 'SN/PROFILE/SET_PROFILE':
            return {...state, profile: action.payload};
        case 'SN/PROFILE/SET_STATUS':
            return {...state, status: action.status};
        case 'SN/PROFILE/SET_PHOTO':
            return {...state, profile: {...state.profile, photos: action.payload} as ProfileType};
        default:
            return state;
    }
}

export const actions = {
    addPost: (newPostText: string) => ({type: 'SN/PROFILE/ADD_POST', newPostText} as const),
    deletePost: (postId: number) => ({type: 'SN/PROFILE/DELETE_POST', postId} as const),
    setProfile: (profile: ProfileType) => ({type: 'SN/PROFILE/SET_PROFILE', payload: profile} as const),
    setStatus: (status: string) => ({type: 'SN/PROFILE/SET_STATUS', status} as const),
    setPhoto: (photos: PhotosType) => ({type: 'SN/PROFILE/SET_PHOTO', payload: photos} as const)
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getStatus(userId);
    dispatch(actions.setStatus(data));
};

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    const data = await profileAPI.updateStatus(status);
    if(data.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.setStatus(status));
    }
};

export const getProfile = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getProfile(userId);
    dispatch(actions.setProfile(data));
};

export const updateProfile = (profile: ProfileType): ThunkType => async  (dispatch, getState) => {
    const userId = getState().auth.id;
    const data = await profileAPI.updateProfile(profile);
    if(data.resultCode === ResultCodeEnum.Success) {
        if(userId) {
            await dispatch(getProfile(userId));
        } else {
            throw new Error("UserId can't be null.")
        }
    } else {
        await Promise.reject(data.messages[0]);
    }
};

export const updatePhoto = (file: File): ThunkType => async (dispatch) => {
    const data = await profileAPI.updatePhoto(file);
    if(data.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.setPhoto(data.data.photos));
    }
};

export default profileReducer;

export type InitialStateType = typeof initialState;

type ActionsTypes = InferActionsTypes<typeof actions>;

type ThunkType = BaseThunkType<ActionsTypes>;