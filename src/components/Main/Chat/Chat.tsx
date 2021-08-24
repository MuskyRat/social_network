import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import style from './Chat.module.css';
import {selectMessages, selectStatus} from "../../../redux/chat-selectors";
import {ChatMessageType, sendMessage, startMessagesListening, stopMessagesListening} from "../../../redux/chat-reducer";
import userPhoto from '../../../assets/userPhoto.png';
import {NavLink} from "react-router-dom";
import {compose} from "redux";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import classNames from 'classnames';
import Picker, {IEmojiData} from 'emoji-picker-react';
import Preloader from "../../../common/Preloader/Preloader";

const Chat: React.FC = () => {

    const status = useSelector(selectStatus);

    const dispatch = useDispatch();

    const messages = useSelector(selectMessages);

    useEffect(() => {
        dispatch(startMessagesListening());
        return () => {
            dispatch(stopMessagesListening());
        }
    }, []);

    if(!messages) return <Preloader />

    return (
        <div className={style.wrapper}>
            {status === 'error' && <div className={style.error}>Some error occurred. Please Refresh the page.</div>}
            <Messages />
            <AddChatMessageForm />
        </div>
    )
};

const Messages: React.FC = () => {

    const messages = useSelector(selectMessages);

    const [autoScroll, setAutoScroll] = useState(true);

    let messagesAnchorRef = useRef<HTMLDivElement>(null);

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        let event = e.currentTarget;
        if(Math.abs(event.scrollHeight - event.scrollTop - event.clientHeight) < 300) {
            !autoScroll && setAutoScroll(true);
        } else {
            autoScroll && setAutoScroll(false);
        }
    };

    useEffect(() => {
        if(autoScroll) {messagesAnchorRef.current?.scrollIntoView({behavior: 'auto'})}
    }, [messages])

    return (
        <div className={style.messagesWrapper}>
            <div className={style.messages} onScroll={scrollHandler}>
                {messages && messages.map((m) => <Message key={m.id} message={m} />)}
                <div ref={messagesAnchorRef}></div>
            </div>
        </div>
    )

};

const Message: React.FC<{message: ChatMessageType}> = React.memo(({message}) => {
    console.log('Message<<<<<<')
    return (
        <div className={style.message}>
            <div className={style.info}>
                <NavLink to={'/profile/' + message.userId}><img src={message.photo ? message.photo : userPhoto} alt=""/> <b>{message.userName}</b></NavLink>
            </div>
            <div className={style.text}>
                {message.message}
            </div>
        </div>
    )

});

export default compose<React.ComponentType>(
    withAuthRedirect
)(Chat);

const AddChatMessageForm: React.FC = () => {

    const [message, setMessage] = useState('');

    const dispatch = useDispatch();

    const status = useSelector(selectStatus)

    const onSendMessage = () => {
        if(!message) {
            return;
        } else {
            dispatch(sendMessage(message));
            setMessage('');
        }
    };

    const onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.currentTarget.value);
    };

    const onKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if(e.ctrlKey && e.code === 'Enter') {
            onSendMessage();
        }
    }

    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const onEmojiButtonClick = () => {
        if(!showEmojiPicker) {
            setShowEmojiPicker(true);
        } else {
            setShowEmojiPicker(false)
        }
    };

    const [chosenEmoji, setChosenEmoji] = useState<IEmojiData | null>(null);

    const onEmojiClick = (event: React.MouseEvent<Element, MouseEvent>, emojiObject: IEmojiData) => {
        setChosenEmoji(emojiObject);
    };

    useEffect(() => {
        if(chosenEmoji !== null) {
            setMessage(message+chosenEmoji.emoji);
        }
    }, [chosenEmoji]);

    return (
        <div className={style.formWrapper}>
            <div className={style.textarea}>
                <textarea value={message} onChange={onMessageChange} placeholder={'Enter your message...'} onKeyPress={onKeyPress}></textarea>
                <div className={style.emoji}>
                    <div className={style.emojiEyes}></div>
                    <div className={style.emojiSmiley}></div>
                    <button  onClick={onEmojiButtonClick} className={classNames(style.emojiButton, {[style.emojiButtonPressed]: showEmojiPicker})}></button>
                </div>
            </div>
            <div className={style.button}>
                <button disabled={status !== 'ready'} onClick={onSendMessage}>Send</button>
            </div>
            {showEmojiPicker &&
                <div className={style.emojiPicker} ><Picker onEmojiClick={onEmojiClick} /></div>
            }
        </div>
    )

};