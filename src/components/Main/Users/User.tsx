import React from "react";
import {UserType} from "../../../types/types";
import style from './User.module.css';
import userPhoto from '../../../assets/userPhoto.png';
import {NavLink} from "react-router-dom";


type PropsType = {
    user: UserType
    follow: (userId: number) => void,
    unfollow: (userId: number) => void,
    followingInProgress: number[]
};

const User: React.FC<PropsType> = ({user, follow, unfollow, followingInProgress}) => {

    const path = '/profile/' + user.id;

    const followHandler = () => {
        follow(user.id);
    };

    const unfollowHandler = () => {
        unfollow(user.id);
    };

    return (
        <div className={style.wrapper}>
                <div className={style.description}>

                    <div className={style.img}>
                        <NavLink to={path}>
                            <img src={user.photos.small ? user.photos.small : userPhoto} alt=""/>
                        </NavLink>
                    </div>
                    <div className={style.info}>
                        <div className={style.name}>
                            <NavLink to={path}>
                                <b>Name</b>: {user.name}
                            </NavLink>
                        </div>
                        <div className={style.status}>
                            <NavLink to={path}>
                                <b>Status</b>: {user.status}
                            </NavLink>
                        </div>

                        <div className={style.button}>
                            {user.followed
                                ? <button onClick={unfollowHandler}
                                          disabled={followingInProgress.some((id) => id === user.id)}>Unfollow</button>
                                : <button onClick={followHandler}
                                          disabled={followingInProgress.some((id) => id === user.id)}>Follow</button>}
                        </div>
                    </div>

                </div>

        </div>
    )

};

export default User;