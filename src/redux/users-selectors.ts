import {AppStateType} from "./redux-store";

export const selectUsers = (state: AppStateType) => {
    return state.users.users;
};

export const selectTotalUsersCount = (state: AppStateType) => {
    return state.users.totalUsersCount;
};

export const selectCurrentPage = (state: AppStateType) => {
    return state.users.currentPage;
};

export const selectPageSize = (state: AppStateType) => {
    return state.users.pageSize;
};

export const selectIsFetching = (state: AppStateType) => {
    return state.users.isFetching;
};

export const selectFollowingInProgress = (state: AppStateType) => {
    return state.users.followingInProgress;
};

export const selectFilter = (state: AppStateType) => {
    return state.users.filter;
};