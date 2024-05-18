import React, { useEffect, useState } from 'react';
import classes from "./AroundSearchList.module.css";
import AroundSearch from './AroundSearch';
import { RiErrorWarningFill } from "react-icons/ri";
import { motion } from "framer-motion";

const demoInitialData = [
    {
        id : 1,
        placeName : '서울랜드',
        address : '경기도 과천시 막계동 33',
        totalCapacity : '14',
        currentParkingCapacity : '2',
        phoneNumber : '010-2880-9266',
        open : '02:00 ~ 24:00',
        price : '7000'
    },
    {
        id : 2,
        placeName : '서울랜드',
        address : '경기도 과천시 막계동 33',
        totalCapacity : '14',
        phoneNumber : '010-2880-9266',
        open : '02:00 ~ 24:00',
        price : '6500'
    },
    {
        id : 3,
        placeName : '서울랜드',
        address : '경기도 과천시 막계동 33',
        totalCapacity : '14',
        currentParkingCapacity : '2',
        phoneNumber : '010-2880-9266',
        open : '02:00 ~ 24:00',
        price : '10000'
    },
    {
        id : 4,
        placeName : '서울랜드',
        address : '경기도 과천시 막계동 33',
        totalCapacity : '14',
        currentParkingCapacity : '2',
        phoneNumber : '010-2880-9266',
        open : '02:00 ~ 24:00',
        price : '9000'
    }
]

const AroundSearchList = (props) => {

    const [aroundParkingLotList,setAroundParkingLotList] = useState([]);

    useEffect(() => {
        console.log(props.location);
        // props.location의 좌표로 Rest api를 통해 백앤드 근처 주차장 데이터 가져옴
        // 현재는 demo data
        setAroundParkingLotList(demoInitialData);
    },[]);
    const animationVariants = {
        initial: { opacity: 0, x: -50 },
        animate: { opacity: 1, x: 0,},
    };

    return (
        <React.Fragment>
            <p className={classes.count}>총 {aroundParkingLotList.length}개 존재 </p>
            {aroundParkingLotList.length === 0 && <p className={classes.message}><RiErrorWarningFill style={{ marginRight:'5px'}}/> 근처의 주차장이 없습니다.</p>}
            <div className={classes.list_container}>
                <motion.ul
                        variants={animationVariants}
                        initial="initial"
                        animate="animate"
                        className={classes.parking_list}
                    >
                    {aroundParkingLotList.map(item => {
                        return (
                            <motion.li 
                                className={classes.item}
                                key={item.id}>
                                <AroundSearch
                                    location={props.location} 
                                    item={item}/>
                            </motion.li>
                            
                        )
                    })}
                </motion.ul>
            </div>
        </React.Fragment>

    )
};

export default AroundSearchList;