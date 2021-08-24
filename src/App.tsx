import React from 'react';
import style from './App.module.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, HashRouter, Redirect, Route, Switch} from "react-router-dom";
import ERROR404 from "./components/Main/ERROR404/ERROR404";
import {connect, Provider} from "react-redux";
import store, {AppStateType} from "./redux/redux-store";
import Login from "./components/Main/Login/Login";
import {initializeApp} from "./redux/app-reducer";
import {selectInitialized} from "./redux/app-selectors";
import AppPreloader from "./common/App-Preloader/App-Preloader";
import Profile from './components/Main/Profile/Profile';
import Header from "./components/Header/Header";
import {withSuspense} from "./hoc/withSuspense";

const LazyDialogs = React.lazy(() => import('./components/Main/Dialogs/Dialogs'));
const LazyUsers = React.lazy(() => import('./components/Main/Users/Users'));
const LazyChat = React.lazy(() => import('./components/Main/Chat/Chat'));

const SuspendedLazyDialogs = withSuspense(LazyDialogs);
const SuspendedLazyUsers = withSuspense(LazyUsers);
const SuspendedLazyChat = withSuspense(LazyChat);

class App extends React.Component<PropsType> {

    catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        alert('Some error occurred')
    }

    componentDidMount() {
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
        this.props.initializeApp();
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }


    render () {
        if(!this.props.initialized) return (
                            <AppPreloader />
        )
        return (
            <div className={style.App}>
                <header className={style.header}><Header /></header>
                <nav className={style.nav}><Navbar /></nav>
                <main className={style.main}>
                    <div className={style.wrapper}>
                        <Switch>
                            <Redirect exact from='/' to='/profile' />
                            <Route path={'/profile/:userId?'} render={() => <Profile />} />
                            <Route path={'/dialogs'} render={() => <SuspendedLazyDialogs />} />
                            <Route path={'/users'} render={() => <SuspendedLazyUsers />} />
                            <Route path={'/chat'} render={() => <SuspendedLazyChat />}/>
                            <Route path={'/login'} render={() => <Login />}/>
                            <Route path={'*'} render={() => <ERROR404 />}/>
                        </Switch>
                    </div>
                </main>

            </div>
        );
    }

}

const mapStateToProps = (state: AppStateType) => ({
    initialized: selectInitialized(state)
})

const AppContainer = connect<StatePropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {initializeApp})(App)

type StatePropsType = ReturnType<typeof mapStateToProps>

type DispatchPropsType = {
    initializeApp: () => void
};

type PropsType = StatePropsType & DispatchPropsType;

const AppContainer2: React.FC = () => {
    return (
        <HashRouter>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </HashRouter>
    )
}

export default AppContainer2;
