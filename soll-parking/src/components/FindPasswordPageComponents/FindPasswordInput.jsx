import React, { useState } from 'react';
import classes from "./FindPasswordInput.module.css";
import { motion, AnimatePresence } from 'framer-motion';
import { MdError } from "react-icons/md";
import FindPasswordLinkTab from './FindPasswordLinkTab';
import { sendEmail, verifyCode, editPassword } from '../../api/AuthApiService';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

const FindPasswordInput = () => {

    const navigate = useNavigate();

    const [email,setEmail] = useState('');
    const [code,setCode] = useState('');

    const [isValid,setIsValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const [isEmailSend,setIsEmailSend] = useState(false);
    const [sentEmail,setSentEmail] = useState('');
    
    const [isValidVerify,setIsValidVerify] = useState(false);
    const [password,setPassword] = useState('');
    const [passwordCheck,setPasswordCheck] = useState('');

    const passwordChangeHandler = (event) => {
        setIsValid(true);
        setPassword(event.target.value);
    };
    const passwordCheckChangeHandler = (event) => {
        setIsValid(true);
        setPasswordCheck(event.target.value);
    };

    const emailChangeHandler = (event) => {
        setIsValid(true);
        setEmail(event.target.value);
    };

    const codeChangeHandler = (event) => {
        setIsValid(true);
        setCode(event.target.value);
    }
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
        try{
            const emailResponse = await sendEmail(email);
            const emailResponseData = await emailResponse.data;
            setSentEmail(email);
            if (emailResponseData){
                setIsEmailSend(true);
            }
        }catch(error){
            console.log(error);
            setErrorMessage("이메일 전송 실패입니다. 다시 시도해주세요.");
            setIsValid(false);
            return;
        }
    }

    const verifyHandler = async (event) => {
        event.preventDefault();
        try {
            const verifyResponse = await verifyCode(sentEmail,code.trim());
            const verifyResponseData = await verifyResponse.data;
            if (verifyResponseData){
                setIsValidVerify(true);
            }else{
                setErrorMessage("인증번호와 일치하지 않습니다.");
                setIsValid(false);
                return;
            }
        }catch(error){
            setErrorMessage("일시적 오류입니다. 다시 시도해주세요.");
            setIsValid(false);
            return;
        }

    };

    const editPasswordHandler = async (event) => {
        event.preventDefault();
         // 8~15자, 영문알파벳 1개 포함,하나의 숫자 포함, 하나의 특수문자 포함
         let passRegex = new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{8,15}$');
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
        try{
            const editResponse = await editPassword(sentEmail,password);
            const editResponseData = await editResponse.data;
            if (editResponseData){
                Swal.fire({
                    icon: 'success',                        
                    title: '비밀번호 변경 완료',         
                    html: '비밀번호를 변경하였습니다.. <br> 로그인 페이지로 이동합니다.'
                });
                navigate('/login');
            }else{
                setIsValid(false);
                setErrorMessage("일시적 오류입니다. 다시 시도해주세요.");
                return; 
            }
        }catch(error){
            setIsValid(false);
            setIsEmailSend(false);
            setIsValidVerify(false);
            setErrorMessage("일시적 오류입니다. 다시 시도해주세요.");
            return; 
        }
    };

    const messageVariants = {
        initial : { opacity : 0, y : -30},
        animate : { opacity : 1, y : 0},
        exit : {opacity : 0, y : 50}
    }

    return (
        <React.Fragment>
        {!isValidVerify && (
            <div className={classes.input_container}>
                {!isEmailSend && (
                    <React.Fragment>
                        <div className={classes.input_wrapper}>
                            <input 
                            placeholder='Email'
                            className={classes.email_input}
                            value={email} 
                            type='text' 
                            onChange={emailChangeHandler}></input>
                            <p className={classes.description}>
                                회원가입 때 사용하신 이메일을 입력해주세요 <br/>
                                해당 이메일로 인증번호를 확인해주세요.
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
                    </React.Fragment>
                )}
                {isEmailSend && (
                    <React.Fragment>
                        <div className={classes.input_wrapper}>
                            <input 
                            placeholder='인증번호'
                            className={classes.code_input}
                            value={code} 
                            type='text' 
                            onChange={codeChangeHandler}></input>
                            <p className={classes.description}>
                                이메일이 전송되었습니다. <br/>
                                해당 이메일로 인증번호를 확인해주세요.
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
                                onClick={verifyHandler}
                                type='submit'
                                whileHover={{ backgroundColor :'#2F6087', color:'white'}}
                                className={classes.submit_button}>인증번호 확인
                            </motion.button>
                        </div>
                    </React.Fragment>
                )}
            </div>
        )}
        {isValidVerify && (
            <React.Fragment>
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
                <p className={classes.description}>
                    사용하실 새로운 비밀번호를 입력해주세요.
                </p>
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
                        onClick={editPasswordHandler}
                        type='submit'
                        whileHover={{ backgroundColor :'#2F6087', color:'white'}}
                        className={classes.submit_button}> 비밀번호 변경
                    </motion.button>
                </div>
            </React.Fragment>
        )}
        <FindPasswordLinkTab/>
        </React.Fragment>
       
    );
};

export default FindPasswordInput;