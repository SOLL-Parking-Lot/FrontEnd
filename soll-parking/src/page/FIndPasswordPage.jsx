import classes from "./LoginPage.module.css";
import logoImage from "../image/logo.png";
import React from "react";
import FindPasswordInput from "../components/FindPasswordPageComponents/FindPasswordInput";

const FindPasswordPage = () => {
    return (
        <React.Fragment>
            <div className={classes.header}>
                <img className={classes.logo_image} src={logoImage} alt='logo-image'/>
                <h4>비밀번호 찾기</h4>
            </div>
            <div className={classes.section}>
                <div className={classes.input_container}>
                    <FindPasswordInput />
                </div>
            </div>
        </React.Fragment>
    )
};

export default FindPasswordPage;