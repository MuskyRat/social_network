import React from "react";
import style from './Dialogs.module.css';
import {compose} from "redux";
import {AppStateType} from "../../../redux/redux-store";
import {selectDialogs, selectMessages} from "../../../redux/dialogs-selectors";
import {actions} from "../../../redux/dialogs-reducer";
import {connect} from "react-redux";
import Dialog from "./Dialog";
import Message from "./Message";
import DialogsForm from "./DialogsForm";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";


const Dialogs: React.FC<PropsType> = ({dialogs, messages, addMessage}) => {

    const messageElements = messages.map((m) => <Message key={m.id} message={m} />)

    const dialogElements = dialogs.map((d) => <Dialog key={d.id} dialog={d} />)

    return (
        <div className={style.wrapper}>
            <div className={style.content}>
                <div className={style.dialogs}>
                    {dialogElements}
                </div>
                <div className={style.messages}>
                    <div className={style.messages2}>
                        {messageElements}
                    </div>
                    <DialogsForm addMessage={addMessage} />
                </div>
            </div>
            <div className={style.form}>

            </div>
        </div>
    )
};

const mapStateToProps = (state: AppStateType) => ({
    dialogs: selectDialogs(state),
    messages: selectMessages(state)
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {...actions}),
    withAuthRedirect
)(Dialogs);

type StatePropsType = ReturnType<typeof mapStateToProps>;

type DispatchPropsType = {
    addMessage: (newMessageBody: string) => void
}

type PropsType = StatePropsType & DispatchPropsType