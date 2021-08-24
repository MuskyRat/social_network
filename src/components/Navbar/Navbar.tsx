import React from 'react';
import style from './Navbar.module.css';
import {NavLink} from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <div className={style.wrapper}>
            <div className={style.item}>
                <NavLink to={'/profile'} activeClassName={style.active} >Profile</NavLink>
            </div>
            {/*<div className={style.item}>*/}
            {/*    <NavLink to={'/dialogs'} activeClassName={style.active}>Dialogs</NavLink>*/}
            {/*</div>*/}
            <div className={style.item}>
                <NavLink to={'/users'} activeClassName={style.active} >Users</NavLink>
            </div>
            <div className={style.item}>
                <NavLink to={'/chat'} activeClassName={style.active} >Chat</NavLink>
            </div>
        </div>
    )
};


export default Navbar