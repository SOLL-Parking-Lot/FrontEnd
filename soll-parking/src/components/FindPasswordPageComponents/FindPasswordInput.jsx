import React, { useState } from 'react';
import classes from "./FindPasswordInput.module.css";
import { motion, AnimatePresence } from 'framer-motion';
import { MdError } from "react-icons/md";
import FindPasswordLinkTab from './FindPasswordLinkTab';

const FindPasswordInput = () => {

    const [email,setEmail] = useState('');
    const [isValid,setIsValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const emailChangeHandler = (event) => {
        setIsValid(true);
        setEmail(event.target.value);
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
                <p className={classes.description}>
                    회원가입 때 사용하신 이메일을 입력해주세요 <br/>
                    해당 이메일로 초기화된 비밀번호를 확인해주세요.
                </p>
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
                    className={classes.submit_button}>이메일 전송
                </motion.button>
            </div>
            <FindPasswordLinkTab/>
        </div>
    );
};

export default FindPasswordInput;