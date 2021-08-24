import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {getAuthUserData} from "./auth-reducer";


let initialState = {
    initialized: false
}

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type) {
        case 'SN/APP/INITIALIZE_APP':
            return {...state, ...action.payload};
        default:
            return state;
    }
}

export const actions = {
    initializeApp: () => ({type: 'SN/APP/INITIALIZE_APP', payload: {initialized: true}} as const)
}

export const initializeApp = (): ThunkType => async (dispatch) => {
    const promise = await dispatch(getAuthUserData());
    Promise.all([promise]).then(() => dispatch(actions.initializeApp()));
}

export default appReducer;

export type InitialStateType = typeof initialState;

type ActionsTypes = InferActionsTypes<typeof actions>;

type ThunkType = BaseThunkType<ActionsTypes>;