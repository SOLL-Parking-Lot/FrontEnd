import React from 'react';
import classes from "./AroundSearch.module.css";
import { useNavigate } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosTime } from "react-icons/io";
import { MdAttachMoney } from "react-icons/md";
import { motion } from 'framer-motion';
import { IoArrowRedo } from "react-icons/io5";
import { MdNavigateNext } from "react-icons/md";

const naverMapURL = 'http://map.naver.com/index.nhn?';

const AroundNationalParking = (props) => {

    const navigate = useNavigate();
    let startTime;
    let endTime;

    const goPlaceDetailPage = (parkingInfo) => {

    };

    const goRouteDetailHandler = () => {
        const slng = props.location.longitude
        const slat = props.location.latitude

        const elng = props.item.parking.longitude
        const elat = props.item.parking.latitude
        const etext = props.item.parking.parking_lot_name
        let url = `${naverMapURL}slng=${slng}&slat=${slat}&stext=${'현재 위치'}&elng=${elng}&elat=${elat}&pathType=0&showMap=true&etext=${etext}&menu=route`;
        window.open(url,'_blank');
    };

    if(props){
        startTime = props.item.parking.weekday_start_time;
        endTime = props.item.parking.weekday_end_time;
        if (startTime.trim().length === 0){
            startTime="00:00";
        }
        if (startTime === "0"){
            startTime="00:00";
        }
        if (endTime === "0"){
            endTime="23:59";
        }
        if (endTime.trim().length === 0){
            endTime="23:59";
        }
    }
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
                    <h4 className={classes.placeName}># {props.item.parking.parking_lot_name}</h4>
                    <div className={classes.wrapper}>
                        <div className={classes.text}>
                            <p className={classes.address}><FaLocationDot style={{ marginRight : '5px'}}/>
                            <span>{props.item.parking.road_name_address.trim().length === 0 ? '주소 파악중입니다.' : props.item.parking.road_name_address}</span>
                            </p>
                            <p className={classes.phoneNumber}><FaPhoneAlt style={{ marginRight : '7px'}}/> <span>{props.item.parking.phone_number}</span></p>
                            <p className={classes.time}><IoIosTime style={{ marginRight : '7px'}}/> <span>{`${startTime} ~ ${endTime}`}</span></p>
                            <p className={classes.price}>
                                <MdAttachMoney style={{ marginRight : '7px'}}/> 
                                    <span>{props.item.parking.fee_info} 입니다.</span>
                                </p>
                        </div>
                        <div className={classes.button_container}>
                            <motion.button 
                                onClick={() => goPlaceDetailPage(props.item)}
                                whileHover={{ scale : 1.1 }}
                                className={classes.detail_button}>
                                    상세 정보 <MdNavigateNext style={{ marginLeft:'5px'}}/>
                            </motion.button>
                            <motion.button 
                                onClick={goRouteDetailHandler}
                                whileHover={{ scale : 1.1 }}
                                className={classes.route_button}>
                                    길찾기 <MdNavigateNext style={{ marginLeft:'5px'}}/>
                            </motion.button>
                        </div>
                    </div>
                </div>
                <div className={classes.capacity}>
                    <div className={classes.totalCapacity}># 전체 주차면 <br/> {props.item.parking.total_parking_space}면</div>
                    <div className={classes.dash}>|</div>
                    <div className={classes.currentCapacity}># 주차 가능면 <br/> <p className={classes.message}> 현재 데이터가 없습니다.</p></div>
                </div>
            </div>
        </React.Fragment>
    )
};

export default AroundNationalParking;