import {AppStateType} from "./redux-store";


export const selectDialogs = (state: AppStateType) => {
    return state.dialogs.dialogs;
};

export const selectMessages = (state: AppStateType) => {
    return state.dialogs.messages;
};