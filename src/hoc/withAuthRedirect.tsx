import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";
import {Redirect} from "react-router-dom";

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
});

type StatePropsType = ReturnType<typeof mapStateToProps>;

type DispatchPropsType = {};

type PropsType = StatePropsType & DispatchPropsType;

export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {
    const RedirectComponent: React.FC<PropsType> = (props) => {
        const {isAuth, ...restProps} = props;
        if(!isAuth) return <Redirect to={'/login'} />
        return (
            <WrappedComponent {...restProps as WCP} />
        )

    }

    return connect<StatePropsType, DispatchPropsType, WCP, AppStateType>(mapStateToProps, {})(RedirectComponent);

}