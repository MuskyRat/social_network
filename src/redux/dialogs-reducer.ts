import {DialogType, MessageType} from "../types/types";
import {BaseThunkType, InferActionsTypes} from "./redux-store";


let initialState = {
    dialogs: [
        {id: 1, userName: 'User_1', img: null},
        {id: 2, userName: 'User_2', img: null},
        {id: 3, userName: 'User_3', img: null}
    ] as DialogType[],
    messages: [
        {id: 1, message: 'Are you going to the party tonight?', dir: 'in'},
        {id: 2, message: 'The party is gonna be really cool!', dir: 'in'},
        {id: 3, message: 'I am thinking whether to go or not', dir: 'out'}
    ] as MessageType[],
}

const dialogsReducer = (state = initialState, action: ActionsTypes) => {
    switch(action.type) {
        case 'SN/DIALOGS/ADD_MESSAGE':
            const newMessage: MessageType = {id: state.messages.length + 1, message: action.newMessageBody, dir: 'out'};
            return {...state, messages: [...state.messages, newMessage]};
        default:
            return state;
    }
};

export const actions = {
    addMessage: (newMessageBody: string) => ({type: 'SN/DIALOGS/ADD_MESSAGE', newMessageBody} as const)
};

export default dialogsReducer;

export type InitialStateType = typeof initialState;

type ActionsTypes = InferActionsTypes<typeof actions>;

type ThunkType = BaseThunkType<ActionsTypes>;