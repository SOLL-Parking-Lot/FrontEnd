import React, { useState, useContext } from 'react';
import classes from "./LoginInput.module.css";
import { motion, AnimatePresence } from 'framer-motion';
import LoginLinkTab from './LoginLinkTab';
import { MdError } from "react-icons/md";
import { login } from '../../api/AuthApiService';
import loginContext from '../../store/login-context';
import { useNavigate } from 'react-router-dom';
import base64 from 'base-64';

const LoginInput = () => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [isValid,setIsValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const loginCtx = useContext(loginContext);
    const navigate = useNavigate();

    const emailChangeHandler = (event) => {
        setIsValid(true);
        setEmail(event.target.value);
    };
    const passwordChangeHandler = (event) => {
        setIsValid(true);
        setPassword(event.target.value);
    };
    const submitHandler = async (event) => {
        event.preventDefault();
        // email valid expression
        // @ , . 포함 확인
        // .뒤에 2~3개의 문자 필요
        let regex = new RegExp('[a-z0-9]+@[a-z]+\[a-z].[a-z]{2,3}');
        if (!regex.test(email)){
            setErrorMessage("유효하지 않은 이메일입니다.");
            setIsValid(false);
            return;
        }

        if (email.length === 0 || password.length === 0){
            if (email.length === 0){
                setErrorMessage("이메일을 입력해주세요.");
            }else{
                setErrorMessage("비밀번호를 입력해주세요.");
            }
            setIsValid(false);
            return;
        }

        login({ email, password })
        .then(response => {
           return response.data
        }).then(
            responseData => {
                const accessToken = responseData.access_token;
                const payload = accessToken.substring(accessToken.indexOf('.') + 1, accessToken.lastIndexOf('.'));
                const decodePayload = base64.decode(payload);
                const jsonToken = JSON.parse(decodePayload);

                const nickname = jsonToken.nickname;
                const email = jsonToken.sub;

                localStorage.setItem("accessToken",accessToken);
                loginCtx.loginUser({
                    nickname,email
                });
                navigate('/');
            }
        )
        .catch(error => {
            if (error.response && error.response.status === 403) {
                setIsValid(false);
                setErrorMessage("로그인하신 회원정보가 없습니다.");
                return;
            } else {
                setIsValid(false);
                setErrorMessage("잠시 후에 다시 시도해주세요.");
            }
        });
    }

    const messageVariants = {
        initial : { opacity : 0, y : -30},
        animate : { opacity : 1, y : 0},
        exit : {opacity : 0, y : 50}
    }

    return (
        <div className={classes.input_container}>
            <div className={classes.input_wrapper}>
                <input 
                placeholder='Email'
                className={classes.email_input}
                value={email} 
                type='text' 
                onChange={emailChangeHandler}></input>
            </div>
            <div className={classes.input_wrapper}>
                <input 
                    placeholder='Password'
                    className={classes.password_input}
                    value={password} 
                    type='password' 
                    onChange={passwordChangeHandler}></input>
            </div>
            <AnimatePresence>
                {!isValid && 
                    <motion.p className={classes.error_message}
                        variants={messageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        key={errorMessage}
                    ><MdError style={{ marginRight : '5px'}}/> <span>{errorMessage}</span></motion.p>
                }
            </AnimatePresence>
            <div className={classes.button_container}>
                <motion.button 
                    onClick={submitHandler}
                    type='submit'
                    whileHover={{ backgroundColor :'#2F6087', color:'white'}}
                    className={classes.submit_button}>로그인
                </motion.button>
            </div>
            <LoginLinkTab/>
        </div>
    );
};


export default LoginInput;