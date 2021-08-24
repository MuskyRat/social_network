import React from "react";
import style from './Preloader.module.css';
import preloader from '../../assets/preloader.svg';

const Preloader: React.FC = () => {

    return (
        <div className={style.wrapper}>
            <img src={preloader} alt=""/>
        </div>
    )

};

export default Preloader;