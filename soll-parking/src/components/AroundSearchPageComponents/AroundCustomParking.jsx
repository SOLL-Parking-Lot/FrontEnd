import classes from "./AroundSearch.module.css";
import React from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import { motion } from 'framer-motion';
import { IoArrowRedo } from "react-icons/io5";
import { MdNavigateNext } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { MdDescription } from "react-icons/md";

const naverMapURL = 'http://map.naver.com/index.nhn?';

const AroundCustomParking = (props) => {

    const goRouteDetailHandler = () => {
        const slng = props.location.longitude
        const slat = props.location.latitude

        const elng = props.item.parking.longitude
        const elat = props.item.parking.latitude
        const etext = props.item.parking.parking_lot_name
        let url = `${naverMapURL}slng=${slng}&slat=${slat}&stext=${'현재 위치'}&elng=${elng}&elat=${elat}&pathType=0&showMap=true&etext=${etext}&menu=route`;
        window.open(url,'_blank');
    };

    return (
        <React.Fragment>
            <div 
                className={classes.container}>
                <div className={classes.traffic_container}>
                    <div className={classes.traffic_time}>
                        <p className={classes.car_time}>차량 소요 시간 <IoArrowRedo className={classes.arrow}/> {props.item.route ? `${props.item.route.car_total_time}분` : 'NaN'}</p>
                        <p className={classes.road_time}>도보 소요 시간 <IoArrowRedo className={classes.arrow}/> {props.item.route ? `${props.item.route.road_total_time}분` : 'NaN'}</p>
                    </div>
                    <div className={classes.traffic_info}>
                        <p className={classes.car_price}>예상 요금 <IoArrowRedo className={classes.arrow}/> {props.item.route ? `${props.item.route.total_fare}원` : 'NaN'}</p>
                        <p className={classes.distance}>거리 <IoArrowRedo className={classes.arrow}/>{props.item.route ? `${props.item.route.distance}` : 'NaN'}</p>
                    </div>
                </div>
                <div className={classes.header_container}>
                    <p className={classes.headaer_my}>
                        <FaCheck style={{ marginRight : '5px'}}/> 내 등록 주차장
                    </p>
                    <h4 className={classes.placeName}># {props.item.parking.parking_lot_name}</h4>
                    <div className={classes.wrapper}>
                        <div className={classes.text_my}>
                            <p className={classes.address}><FaLocationDot style={{ marginRight : '5px'}}/>
                                <span>{props.item.parking.address}</span>
                            </p>
                            <p className={classes.phoneNumber}><FaPhoneAlt style={{ marginRight : '7px'}}/> <span>{props.item.parking.phone_number ? props.item.parking.phone_number : '등록된 번호가 없습니다.' }</span></p>
                            <p className={classes.price}>
                                <MdAttachMoney style={{ marginRight : '7px'}}/> 
                                    <span>{props.item.parking.fee_type} 입니다.</span>
                            </p>
                            <p className={classes.custom_info}><MdDescription style={{ marginRight : '5px'}}/> 주차장 추가 정보</p>
                            <p className={classes.description}>
                                {props.item.custom_info ? props.item.custom_info : '등록된 추가정보가 없습니다.'}
                            </p>
                        </div>
                    </div>
                    <div className={classes.button_container_my}>
                            <motion.button 
                                onClick={goRouteDetailHandler}
                                whileHover={{ scale : 1.1 }}
                                className={classes.route_button_my}>
                                    길찾기 <MdNavigateNext style={{ marginLeft:'5px'}}/>
                            </motion.button>
                        </div>
                </div>
            </div>
        </React.Fragment>
    )
};

export default AroundCustomParking