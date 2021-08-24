import React from "react";
import style from './App-Preloader.module.css';
import preloader from '../../assets/preloader.svg';

const AppPreloader: React.FC = () => {

    return (
        <div className={style.wrapper}>
            <img src={preloader} alt=""/>
        </div>
    )

};

export default AppPreloader;