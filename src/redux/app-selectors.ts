import {AppStateType} from "./redux-store";


export const selectInitialized = (state: AppStateType) => {
    return state.app.initialized;
}