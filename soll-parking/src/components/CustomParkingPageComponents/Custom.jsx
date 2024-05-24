import React from "react";
import classes from "./Custom.module.css";
import { motion } from "framer-motion";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import { MdDescription } from "react-icons/md";
import { GiCancel } from "react-icons/gi";

const Custom = (props) => {

    const deleteCustomLotHandler = () => {
        props.onDelete(props.item.id);
    };

    return (
        <React.Fragment>
            <div 
                className={classes.container}>
                <div className={classes.header_container}>
                    <div className={classes.text}>
                        <motion.span
                                whileHover={{ color : 'red'}}
                                className={classes.cancel_icon}
                                onClick={deleteCustomLotHandler}
                                >
                                <GiCancel /> 
                        </motion.span>
                        <div className={classes.placeName_container}>
                            <h4 className={classes.placeName}>{props.item.parking_lot_name}</h4>
                        </div>
                        <p className={classes.address}><FaLocationDot style={{ marginRight : '3px'}}/> <span>{props.item.address}</span></p>
                        <p className={classes.phoneNumber}><FaPhoneAlt style={{ marginRight : '3px'}}/> <span>{props.item.phone_number ? props.item.phone_number : '등록된 번호가 없습니다.'}</span></p>
                        <p className={classes.fee_type}><MdAttachMoney style={{ marginRight : '3px'}}/> <span>{props.item.fee_type ? props.item.fee_type : '등록된 요금정보가 없습니다.'}</span></p>
                        <p className={classes.custom_info}><MdDescription style={{ marginRight : '5px'}}/> 주차장 추가 정보</p>
                        <p className={classes.description}>
                            {props.item.custom_info ? props.item.custom_info : '등록된 추가정보가 없습니다.'}
                        </p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};

export default Custom;