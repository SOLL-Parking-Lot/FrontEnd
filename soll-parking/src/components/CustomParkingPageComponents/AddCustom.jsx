import React, { useState, useContext } from "react";
import classes from "./AddCustom.module.css";
import { motion, AnimatePresence } from 'framer-motion';
import { MdError } from "react-icons/md";
import { addCustomParkingLot } from "../../api/CustomParkingApiService";
import SetTimeOutModal from "../../layout/SetTimeOutModal";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import loginContext from '../../store/login-context';

const AddCustom = () => {

    const [parkingName,setParkingName] = useState('');
    const [customInfo,setCustomInfo] = useState('');
    const [address,setAddress] = useState('');
    const [phoneNumber,setPhoneNumber] = useState('');
    const [feeType,setFeeType] = useState('');
    const [showCheckModal, setShowCheckModal] = useState(false);
    const [modalMessage,setModalMessage] = useState('');
    
    const [isSaving,setIsSaving] = useState(false);
    const [isValid,setIsValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
    const loginCtx = useContext(loginContext);

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
        try{
            setIsSaving(true);
            const response = await addCustomParkingLot({
                parkingLotName : parkingName,
                customInfo : customInfo,
                address : address,
                phoneNumber : phoneNumber,
                feeType : feeType
            });
            const responseData = await response.data;
            setIsSaving(false);
            if (responseData){
                setShowCheckModal(true);
                setModalMessage("주차장을 추가하였습니다!");
            }else{
                setShowCheckModal(true);
                setModalMessage("다시 시도해주세요.");
            }
        }catch(error){
            Swal.fire({
                icon: 'warning',                        
                title: '로그인 만료',         
                html: `로그인이 만료되었습니다.<br> 다시 로그인 해주세요.`
            });
            loginCtx.logoutUser();
            localStorage.removeItem("accessToken");
            navigate('/login');
        }
       
        setParkingName('');
        setAddress('');
        setCustomInfo('');
        setFeeType('');
        setPhoneNumber('');
    };

    return (
        <React.Fragment>
             <SetTimeOutModal message={modalMessage} showModal={showCheckModal} setShowModal={setShowCheckModal} />
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
                    <textarea 
                    placeholder='주차장 정보'
                    className={classes.info_input}
                    value={customInfo} 
                    type='text' 
                    onChange={customInfoChangeHandler}></textarea>
                </div>
                <div className={classes.input_wrapper}>
                    <input 
                        placeholder='주차장 주소'
                        className={classes.address_input}
                        value={address} 
                        type='text' 
                        onChange={addressChangeHandler}></input>
                    <p className={classes.address_warning}><MdError style={{ marginRight : '3px'}}/> 주차장명은 정확한 도로명 주소를 입력해주세요.</p>
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
                        disabled={isSaving}
                        onClick={submitHandler}
                        type='submit'
                        whileHover={{ backgroundColor :'#2F6087', color:'white'}}
                        className={classes.submit_button}> {isSaving ? '저장 중...' : '주차장 추가'}
                    </motion.button>
                </div>
            </div>
        </React.Fragment>
    );

};

export default AddCustom;