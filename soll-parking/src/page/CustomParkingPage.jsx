import React, { useState, useContext } from 'react'
import classes from "./CustomParkingPage.module.css";
import AddCustom from '../components/CustomParkingPageComponents/AddCustom';
import CustomList from '../components/CustomParkingPageComponents/CustomList';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import loginContext from "../store/login-context";

const CustomParkingPage = () => {

    const [isType,setIsType] = useState(0);
    const loginCtx = useContext(loginContext);
    const navigate = useNavigate();

    const goMainPageHandler = () => {
        navigate('/');
    };

    const setListType = () => {
        setIsType(0);
    };

    const setAddType = () => {
        setIsType(1);
    };  

    return (
        <React.Fragment>
            <div className={classes.header}>
                <IoIosArrowBack 
                    className={classes.back_icon}
                    onClick={goMainPageHandler}/>
                <h3># Custom 주차장</h3>
            </div>
            <div className={classes.description_container}>
                <p className={classes.description}>
                    {loginCtx.nickname}님이 등록하신 Custom 주차장 목록입니다. <br/>
                    주차장을 등록하여 다른 사람에게도 공유해주세요!
                </p>
            </div>
            <div className={classes.link_container}>
                <motion.p 
                    className={`${classes.list} ${isType === 0 ? classes.active : ''}`}
                    whileHover={{ scale : 1.1 }}
                    onClick={setListType}>내 주차장</motion.p>
                <motion.p 
                    className={`${classes.add} ${isType === 1 ? classes.active : ''}`}
                    whileHover={{ scale : 1.1 }}
                    onClick={setAddType}>주차장 추가</motion.p>
            </div>
            {isType === 0 ? <CustomList/> : <AddCustom/>}
        </React.Fragment>
        
    );
    
};

export default CustomParkingPage;