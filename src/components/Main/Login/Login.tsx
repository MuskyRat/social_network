import React from "react";
import style from './Login.module.css';
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {selectCaptchaUrl, selectErrorMessage, selectIsAuth} from "../../../redux/auth-selectors";
import { login } from "../../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import LoginForm from "./LoginForm";


const Login: React.FC<PropsType> = ({login, captchaUrl, isAuth, errorMessage}) => {

    if(isAuth) {return <Redirect to='/profile' />}

    return (
        <div className={style.wrapper}>
            <LoginForm isAuth={isAuth} login={login} captchaUrl={captchaUrl} errorMessage={errorMessage} />
        </div>
    )

}

const mapStateToProps = (state: AppStateType) => ({
    captchaUrl: selectCaptchaUrl(state),
    isAuth: selectIsAuth(state),
    errorMessage: selectErrorMessage(state)
})

export default connect<StatePropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {login})(Login);

type StatePropsType = ReturnType<typeof mapStateToProps>;

type DispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

type PropsType = StatePropsType & DispatchPropsType