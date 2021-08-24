import {AppStateType} from "./redux-store";


export const selectPosts = (state: AppStateType) => {
    return state.profile.posts;
};

export const selectProfile = (state: AppStateType) => {
    return state.profile.profile;
};

export const selectStatus = (state: AppStateType) => {
    return state.profile.status;
};