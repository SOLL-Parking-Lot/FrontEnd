import classes from "./LoginPage.module.css";
import logoImage from "../image/logo.png";
import React from "react";
import LoginInput from "../components/LoginPageComponents/LoginInput";

const LoginPage = () => {

    return (
        <React.Fragment>
            <div className={classes.header}>
                <img className={classes.logo_image} src={logoImage} alt='logo-image'/>
                <h4>로그인</h4>
            </div>
            <div className={classes.section}>
                <div className={classes.input_container}>
                    <LoginInput />
                </div>
            </div>
        </React.Fragment>
    )
};

export default LoginPage;