import React from 'react'
import classes from "./Favorite.module.css";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import logoImage from "../../image/logo.png";

const SeoulFavorite = (props) => {

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
                        <h4 className={classes.placeName}>{props.item.parking.parking_lot_name}</h4>
                        <p className={classes.address}><FaLocationDot style={{ marginRight : '5px'}}/> <span>{props.item.parking.address.trim().length !== 0 ? props.item.parking.address : '주소 파악중입니다.'}</span></p>
                        <p className={classes.phoneNumber}><FaPhoneAlt style={{ marginRight : '7px'}}/> <span>{props.item.parking.phone_number}</span></p>
                    </div>
                    <div className={classes.logo}>
                        <img src={logoImage} alt='logo-mini-image' className={classes.logo_image}/>
                    </div>
                </div>
                <div className={classes.capacity}>
                    <div className={classes.totalCapacity}># 전체 주차면 <br/> {props.item.parking.total_parking_space}면</div>
                    <div className={classes.dash}>|</div>
                    <div className={classes.currentCapacity}># 주차 가능면 <br/> {`${props.item.currentParking.current_capacity}면`}</div>
                </div>
            </motion.div>
        </React.Fragment>
    )
};

export default SeoulFavorite;