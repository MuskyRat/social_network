
let subscribers = {
    'messages-received': [] as MessagesReceivedSubscriberType[],
    'status-changed': [] as StatusChangedSubscriberType[]
}

let ws: WebSocket | null = null;

const notifySubscribersAboutStatus = (status: StatusType) => {
    subscribers["status-changed"].forEach((s) => s(status));
};

const openHandler = () => {
    console.log('openHandler');
    notifySubscribersAboutStatus('ready');
};

const closeHandler = () => {
    notifySubscribersAboutStatus('pending')
    console.log('closeHandler')
    setTimeout(createChannel, 3000);
};

const errorHandler = () => {
    notifySubscribersAboutStatus('error');
    console.log('Refresh the page.');
};

const messageHandler = (e: MessageEvent) => {
    subscribers["messages-received"].forEach((s) => s(JSON.parse(e.data)));
};

const cleanUp = () => {
    ws?.removeEventListener('open', openHandler);
    ws?.removeEventListener('close', closeHandler);
    ws?.removeEventListener('error', errorHandler);
    ws?.removeEventListener('message', messageHandler);
};

const createChannel = () => {
    console.log('createChannel')
    cleanUp();
    ws?.close();
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    notifySubscribersAboutStatus('pending');
    ws.addEventListener('open', openHandler);
    ws.addEventListener('close', closeHandler);
    ws.addEventListener('error', errorHandler);
    ws.addEventListener('message', messageHandler);
    // debugger;
};

export const chatAPI = {
    start () {
        createChannel();
    },
    stop () {
        subscribers["messages-received"] = [];
        subscribers["status-changed"] = [];
        cleanUp();
        ws?.close();
    },
    subscribe (eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {

        // @ts-ignore
        subscribers[eventName].push(callback);
        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter((s) => s !== callback)
        }
    },
    unsubscribe (eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter((s) => s !== callback)
    },
    sendMessage (newMessage: string) {
        ws?.send(newMessage);
    }
}

type MessagesReceivedSubscriberType = (messages: ChatMessageAPIType[]) => void;

type StatusChangedSubscriberType = (status: StatusType) => void;

export type ChatMessageAPIType = {
    message: string,
    photo: string | null,
    userId: number,
    userName: string
};

export type StatusType = 'pending' | 'ready' | 'error';

type EventsNamesType = 'messages-received' | 'status-changed';