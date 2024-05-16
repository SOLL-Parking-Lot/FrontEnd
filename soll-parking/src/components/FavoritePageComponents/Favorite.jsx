import classes from "./Favorite.module.css";
import React from 'react';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import logoImage from "../../image/logo.png";

const Favorite = (props) => {

    const navigate = useNavigate();

    const goPlaceDetailPage = () => {

    };

    const itemVariants = { borderRadius : '8px' , backgroundColor : '#2F6087', color:'white'};
    
    return (
        <React.Fragment>
            <motion.div 
                whileHover={itemVariants}
                onClick={goPlaceDetailPage}
                className={classes.container}>
                <div className={classes.header_container}>
                    <div className={classes.text}>
                        <h4 className={classes.placeName}>{props.item.placeName}</h4>
                        <p className={classes.address}><FaLocationDot style={{ marginRight : '5px'}}/> <span>{props.item.address}</span></p>
                        <p className={classes.phoneNumber}><FaPhoneAlt style={{ marginRight : '7px'}}/> <span>{props.item.phoneNumber}</span></p>
                    </div>
                    <div className={classes.logo}>
                        <img src={logoImage} alt='logo-mini-image' className={classes.logo_image}/>
                    </div>
                </div>
                <div className={classes.capacity}>
                    <div className={classes.totalCapacity}># 전체 주차면 <br/> {props.item.totalCapacity}면</div>
                    <div className={classes.dash}>|</div>
                    <div className={classes.currentCapacity}># 주차 가능면 <br/> {props.item.currentParkingCapacity ? `${props.item.currentParkingCapacity}면` : <p className={classes.message}>현재 데이터가 없습니다.</p>}</div>
                </div>
            </motion.div>
        </React.Fragment>
    )
};

export default Favorite;