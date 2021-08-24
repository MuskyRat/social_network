import {chatAPI, ChatMessageAPIType, StatusType} from "../api/chat-api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {v1} from 'uuid';
import {Dispatch} from "redux";

let initialState = {
    messages: null as null | ChatMessageType[],
    status: 'pending' as StatusType
}

const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType  => {
    switch(action.type) {
        case 'SN/CHAT/SET_MESSAGES':
            return {...state, messages: state.messages !== null
                    ? [...state.messages, ...action.newMessages.map((m) => ({...m, id: v1()}))].filter((m, index, array) => index >= (array.length - 20))
                    : [...action.newMessages.map((m) => ({...m, id: v1()}))].filter((m, index, array) => index >= (array.length - 20))};
        case 'SN/CHAT/SET_STATUS':
            return {...state, status: action.status};
        case 'SN/CHAT/DELETE_MESSAGES':
            return {...state, messages: null as null | ChatMessageType[]}
        default:
            return state;
    }
};

export const actions = {
    setMessages: (newMessages: ChatMessageAPIType[]) => ({type: 'SN/CHAT/SET_MESSAGES', newMessages} as const),
    deleteMessages: () => ({type: 'SN/CHAT/DELETE_MESSAGES'} as const),
    setStatus: (status: StatusType) => ({type: 'SN/CHAT/SET_STATUS', status} as const)
};

let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null;

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if(_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.setMessages(messages));
        };
    }
    return _newMessageHandler;
};

let _statusChangedHandler: ((status: StatusType) => void) | null = null;

const statusChangedHandlerCreator = (dispatch: Dispatch<any>) => {
    if(_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.setStatus(status));
        };
    }
    return _statusChangedHandler;
};

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start();
    chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch));
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch));
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch));
    chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch));
    chatAPI.stop();
    dispatch(actions.deleteMessages());
}

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message);
}

export default chatReducer;

export type ChatMessageType = ChatMessageAPIType & {id: string};

export type InitialStateType = typeof initialState;

type ActionsTypes = InferActionsTypes<typeof actions>;

type ThunkType = BaseThunkType<ActionsTypes>;