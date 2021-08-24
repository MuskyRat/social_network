import React from "react";
import style from './Header.module.css';
import logo from '../../assets/logo.png';
import {useDispatch, useSelector} from "react-redux";
import {selectIsAuth, selectLogin} from "../../redux/auth-selectors";
import {logout} from "../../redux/auth-reducer";
import {NavLink, useHistory, useLocation} from "react-router-dom";


const Header: React.FC = () => {

    const isAuth = useSelector(selectIsAuth);

    const login = useSelector(selectLogin);

    const dispatch = useDispatch();

    const location = useLocation();

    const history = useHistory();

    const onLogout = async () => {
        const promise = await dispatch(logout());
        Promise.all([promise]).then(() => {history.push('/login')});
    };

    const onLogin = () => {
        history.push('login');
    };

    return (
        <div className={style.wrapper}>
            <div className={style.logo}>
                <NavLink to={'/profile'}><img src={logo} alt=""/></NavLink>
            </div>
            <div className={style.loginInfo}>
                {isAuth
                    ? <div className={style.logout}><span>{login}</span><button onClick={onLogout} >Logout</button></div>
                    : location.pathname !== '/login' && <div className={style.login}><button onClick={onLogin} >Login</button></div>}

            </div>
        </div>
    )
};

export default Header;