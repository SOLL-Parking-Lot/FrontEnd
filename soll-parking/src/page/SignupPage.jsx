import classes from "./SignupPage.module.css";
import logoImage from "../image/logo.png";
import React from "react";
import SignupInput from "../components/SignupPageComponents/SignupInput";

const SignupPage = () => {
    return (
        <React.Fragment>
            <div className={classes.header}>
                <img className={classes.logo_image} src={logoImage} alt='logo-image'/>
                <h4>회원가입</h4>
            </div>
            <div className={classes.section}>
                <div className={classes.input_container}>
                    <SignupInput />
                </div>
            </div>
        </React.Fragment>
    )
};

export default SignupPage;