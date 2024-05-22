import React from "react";
import classes from './LoadingModal.module.css';
import SpinnerImage from '../image/Spinner.gif';

const LoadingModal = () => {
    return (
        <div className={classes.loading_container}>
            <div className={classes.container}>
                <div className={classes.container_text_box}>
                    <h1 className={classes.h1_text_bar}> SOLL </h1>
                    <p> 데이터를 처리중입니다. <br/>잠시만 기다려주세요. </p>
                    <img src={SpinnerImage} alt="loading"/>
                </div>
            </div>
        </div>
    )
};

export default LoadingModal;