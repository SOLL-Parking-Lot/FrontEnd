import classes from "./SignupInput.module.css";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SignupLinkTab from "./SignLinkTab";
import { MdError } from "react-icons/md";
import { signup } from "../../api/AuthApiService";
import { emailValidation } from "../../api/AuthApiService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const SignupInput = () => {

    const [nickName,setNickName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [passwordCheck,setPasswordCheck] = useState('');
    const [isValid,setIsValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const nickNameChangeHandler = (event) => {
        setIsValid(true);
        setNickName(event.target.value);
    };

    const emailChangeHandler = (event) => {
        setIsValid(true);
        setEmail(event.target.value);
    };

    const passwordChangeHandler = (event) => {
        setIsValid(true);
        setPassword(event.target.value);
    };
    const passwordCheckChangeHandler = (event) => {
        setIsValid(true);
        setPasswordCheck(event.target.value);
    };
    const submitHandler = async (event) => {
        event.preventDefault();

        // email valid expression
        // @ , . 포함 확인
        // .뒤에 2~3개의 문자 필요
        let regex = new RegExp('[a-z0-9]+@[a-z]+\[a-z].[a-z]{2,3}');

        // 8~15자, 영문알파벳 1개 포함,하나의 숫자 포함, 하나의 특수문자 포함
        let passRegex = new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{8,15}$');
        if (nickName.trim().length === 0){
            setIsValid(false);
            setErrorMessage("닉네임을 입력해주세요.");
            return;
        }
        if (nickName.trim().length > 6){
            setIsValid(false);
            setErrorMessage("닉네임은 6자리까지만 입력해주세요.");
            return;
        }
        if (!regex.test(email)){
            setErrorMessage("유효하지 않은 이메일입니다.");
            setIsValid(false);
            return;
        }
        if (!passRegex.test(password)){
            setIsValid(false);
            setErrorMessage(`비밀번호는 영문,숫자,특수문자를 하나씩 포함해주세요.(8~15자)`);
            return;
        }
        if (password !== passwordCheck){
            setIsValid(false);
            setErrorMessage("비밀번호가 동일하지 않습니다.");
            return;
        }
        signup({
            nickname : nickName,
            email,password
        })
        .then(response => {
           return response.data
        }).then(
            responseData => {
                Swal.fire({
                    icon: 'success',                        
                    title: '회원가입 완료',         
                    html: '회원가입에 성공하셨습니다. <br> 로그인 페이지로 이동합니다.'
                });
                navigate('/login');
            }
        )
        .catch(error => {
            if (error.response && error.response.status === 403) {
                setIsValid(false);
                setErrorMessage("회원가입에 실패하였습니다. 다시 시도해주세요.");
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
                placeholder='Nickname'
                className={classes.nickname_input}
                value={nickName} 
                type='text' 
                onChange={nickNameChangeHandler}></input>
            </div>
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
            <div className={classes.input_wrapper}>
                <input 
                placeholder='Password Check'
                className={classes.password_check_input}
                value={passwordCheck} 
                type='password' 
                onChange={passwordCheckChangeHandler}></input>
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
                    className={classes.submit_button}>회원가입
                </motion.button>
            </div>
            <SignupLinkTab/>
        </div>
    );
};

export default SignupInput;