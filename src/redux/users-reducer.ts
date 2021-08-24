import {UserType} from "../types/types";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {updateObjectInArray} from "../utils/object-handlers";
import {usersAPI} from "../api/users-api";
import {Dispatch} from "redux";
import {APIResponseType, ResultCodeEnum} from "../api/api";


let initialState = {
    users: [] as Array<UserType>,
    totalUsersCount: 0,
    currentPage: 1,
    pageSize: 15,
    isFetching: false,
    followingInProgress: [] as Array<number>,
    filter: {
        term: '',
        friend: null as null | boolean
    }
}

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type) {
        case 'SN/USERS/FOLLOW':
            return {...state, users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})};
        case 'SN/USERS/UNFOLLOW':
            return {...state, users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})};
        case 'SN/USERS/SET_USERS':
            return {...state, users: action.users};
        case 'SN/USERS/SET_TOTAL_USERS_COUNT':
            return {...state, totalUsersCount: action.totalUsersCount};
        case 'SN/USERS/SET_CURRENT_PAGE':
            return {...state, currentPage: action.currentPage};
        case 'SN/USERS/TOGGLE_IS_FETCHING':
            return {...state, isFetching: action.isFetching};
        case 'SN/USERS/TOGGLE_FOLLOWING_IN_PROGRESS':
            return {...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter((userId) => userId !== action.userId)};
        case 'SN/USERS/SET_FILTER':
            return {...state, filter: action.payload}
        default:
            return state;
    }
};

export const actions = {
    follow: (userId: number) => ({type: 'SN/USERS/FOLLOW', userId} as const),
    unfollow: (userId: number) => ({type: 'SN/USERS/UNFOLLOW', userId} as const),
    setUsers: (users: UserType[]) => ({type: 'SN/USERS/SET_USERS', users} as const),
    setTotalUsersCount: (totalUsersCount: number) => ({type: 'SN/USERS/SET_TOTAL_USERS_COUNT', totalUsersCount} as const),
    setCurrentPage: (currentPage: number) => ({type: 'SN/USERS/SET_CURRENT_PAGE', currentPage} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'SN/USERS/TOGGLE_IS_FETCHING', isFetching} as const),
    toggleFollowingInProgress: (isFetching: boolean, userId: number) => ({type: 'SN/USERS/TOGGLE_FOLLOWING_IN_PROGRESS', isFetching, userId} as const),
    setFilter: (filter: FilterType) => ({type: 'SN/USERS/SET_FILTER', payload: filter} as const)
};

export const requestUsers = (count: number, page: number, filter: FilterType): ThunkType => async (dispatch) => {
    dispatch(actions.toggleIsFetching(true));
    dispatch(actions.setCurrentPage(page));
    dispatch(actions.setFilter(filter));

    const data = await usersAPI.getUsers(count, page, filter.term, filter.friend);
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUsersCount(data.totalCount));
    dispatch(actions.toggleIsFetching(false));
}

const _followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>, userId: number, APIMethod: (userId: number) => Promise<APIResponseType>, actionCreator: (userId: number) => ActionsTypes) => {
    dispatch(actions.toggleFollowingInProgress(true, userId));
    const data = await APIMethod(userId);
    if(data.resultCode === ResultCodeEnum.Success) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleFollowingInProgress(false, userId));
};

export const follow = (userId: number): ThunkType => async (dispatch) => {
    await _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.follow);
};

export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    await _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollow);
};

export type InitialStateType = typeof initialState;

export type FilterType = typeof initialState.filter;

type ActionsTypes = InferActionsTypes<typeof actions>;

type ThunkType = BaseThunkType<ActionsTypes>;

export default usersReducer;