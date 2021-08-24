import React, {useEffect, useState} from "react";
import style from './ProfileStatus.module.css'

type PropsType = {
    status: string,
    updateStatus: (status: string) => void,
    isOwner: boolean
}

const ProfileStatus: React.FC<PropsType> = ({status, updateStatus, isOwner}) => {

    const [editMode, setEditMode] = useState(false);

    const [localStatus, setLocalStatus] = useState(status);

    useEffect(() => {
        setLocalStatus(status);
    }, [status]);

    const onNewMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalStatus(e.target.value);
    };

    const activateEditMode = () => {
        isOwner && setEditMode(true);
    };

    const deactivateEditMode = () => {
        updateStatus(localStatus);
        setEditMode(false);
    };

    return (
        <div className={style.wrapper}>
            {editMode
                ? <div className={style.input}><input type="text" value={localStatus} onChange={onNewMessageChange} onBlur={deactivateEditMode} autoFocus={true} maxLength={300}/></div>
                : <div className={style.span}><span title={'Double click to change status'} onDoubleClick={activateEditMode}>{status || "this user hasn't uploaded any status yet"}</span></div>}
        </div>
    )

};

export default ProfileStatus;