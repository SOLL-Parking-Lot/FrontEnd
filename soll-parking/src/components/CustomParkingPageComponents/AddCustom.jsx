import React, { useState } from "react";
import classes from "./AddCustom.module.css";
import { motion, AnimatePresence } from 'framer-motion';
import { MdError } from "react-icons/md";
import { addCustomParkingLot } from "../../api/CustomParkingApiService";
import Swal from "sweetalert2";

const AddCustom = () => {

    const [parkingName,setParkingName] = useState('');
    const [customInfo,setCustomInfo] = useState('');
    const [address,setAddress] = useState('');
    const [phoneNumber,setPhoneNumber] = useState('');
    const [feeType,setFeeType] = useState('');

    const [isValid,setIsValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const parkingNameChangeHandler = (event) => {
        setIsValid(true);
        setParkingName(event.target.value);
    };

    const customInfoChangeHandler = (event) => {
        setIsValid(true);
        setCustomInfo(event.target.value);
    };

    const addressChangeHandler = (event) => {
        setIsValid(true);
        setAddress(event.target.value);
    };
    const phoneNumberChangeHandler = (event) => {
        setIsValid(true);
        setPhoneNumber(event.target.value);
    };
    const feeTypeChangeHandler = (event) => {
        setIsValid(true);
        setFeeType(event.target.value);
    };

    const messageVariants = {
        initial : { opacity : 0, y : -30},
        animate : { opacity : 1, y : 0},
        exit : {opacity : 0, y : 50}
    }

    const submitHandler = async (event) => {
        event.preventDefault();

        if (parkingName.trim().length === 0){
            setIsValid(false);
            setErrorMessage("주차장명은 필수항목입니다.");
            return;
        }
        if (address.trim().length === 0){
            setIsValid(false);
            setErrorMessage("주차장 주소는 필수항목입니다.");
            return;
        }
        const response = await addCustomParkingLot({
            parkingLotName : parkingName,
            customInfo : customInfo,
            address : address,
            phoneNumber : phoneNumber,
            feeType : feeType
        });
        // const responseData = await response.data;
        // console.log(responseData);
    };

    return (
        <div className={classes.input_container}>
            <div className={classes.input_wrapper}>
                <input 
                placeholder='주차장 이름'
                className={classes.parking_input}
                value={parkingName} 
                type='text' 
                onChange={parkingNameChangeHandler}></input>
            </div>
            <div className={classes.input_wrapper}>
                <input 
                placeholder='주차장 정보'
                className={classes.info_input}
                value={customInfo} 
                type='text' 
                onChange={customInfoChangeHandler}></input>
            </div>
            <div className={classes.input_wrapper}>
                <input 
                    placeholder='주차장 주소'
                    className={classes.address_input}
                    value={address} 
                    type='text' 
                    onChange={addressChangeHandler}></input>
            </div>
            <div className={classes.input_wrapper}>
                <input 
                placeholder='주차장 번호'
                className={classes.phoneNumber_input}
                value={phoneNumber} 
                type='text' 
                onChange={phoneNumberChangeHandler}></input>
            </div>
            <div className={classes.input_wrapper}>
                <input 
                placeholder='요금 정보'
                className={classes.feeType_input}
                value={feeType} 
                type='text' 
                onChange={feeTypeChangeHandler}></input>
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
                    className={classes.submit_button}> 주차장 추가
                </motion.button>
            </div>
        </div>
    );

};

export default AddCustom;