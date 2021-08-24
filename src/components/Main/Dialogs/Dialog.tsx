import React from "react";
import style from './Dialog.module.css';
import {DialogType} from "../../../types/types";
import { NavLink } from "react-router-dom";
import userPhoto from '../../../assets/userPhoto.png';

type PropsType = {
    dialog: DialogType
}

const Dialog: React.FC<PropsType> = ({dialog}) => {

    const path = '/dialogs/' + dialog.id;

    return (
        <div className={style.wrapper}>
            <NavLink to={path} activeClassName={style.active}>
                <div className={style.container}>
                    <div className={style.img}><img src={dialog.img ? dialog.img : userPhoto} alt=""/></div>
                    <div className={style.name}>{dialog.userName}</div>
                </div>
            </NavLink>
        </div>
    )

};

export default Dialog;