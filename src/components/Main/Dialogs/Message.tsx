import React from "react";
import style from './Message.module.css';
import {MessageType} from "../../../types/types";
import classNames from "classnames";

type PropsType = {
    message: MessageType
}

const Message: React.FC<PropsType> = ({message}) => {

    const className = classNames(style.message, {[style.in]: message.dir === 'in', [style.out]: message.dir === 'out'});

    return (
        <div className={className}>
            {message.message}
        </div>
    )

};

export default Message;