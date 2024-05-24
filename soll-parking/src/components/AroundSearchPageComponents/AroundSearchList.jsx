import React, { useEffect, useState } from 'react';
import classes from "./AroundSearchList.module.css";
import { RiErrorWarningFill } from "react-icons/ri";
import { motion } from "framer-motion";
import { getAroundParkingLot } from '../../api/ParkingLotApiService';
import LoadingModal from '../../layout/LoadingModal';
import AroundNationalParking from './AroundNationalParking';
import AroundSeoulParking from './AroundSeoulParking';
import AroundCustomParking from './AroundCustomParking';

const AroundSearchList = (props) => {

    const [aroundParkingLotList,setAroundParkingLotList] = useState([]);
    const [isLoading,setIsLoading] = useState(true);

    useEffect(() => {
        const getAroundParkingList = async () => {
            setIsLoading(true);
            const parkingResponse = await getAroundParkingLot(props.location);
            const parkingResponseData = await parkingResponse.data;
            setAroundParkingLotList(parkingResponseData);
            setIsLoading(false);
        };
        getAroundParkingList();
    },[]);
    const animationVariants = {
        initial: { opacity: 0, x: -50 },
        animate: { opacity: 1, x: 0,},
    };

    return (
        <React.Fragment>
<<<<<<< HEAD
            {!isLoading && (
                <>
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

                                if (item.type === "National"){
                                    return (
                                        <motion.li
                                            className={classes.item}
                                            key={item.parking.id}>
                                            <AroundNationalParking
                                                location={props.location}
                                                item={item}
                                            />
                                        </motion.li>
                                    )
                                }
                                else if (item.type === "Seoul"){
                                    return (
                                        <motion.li className={classes.item}
                                            key={item.parking.id}
                                        >
                                            <AroundSeoulParking
                                                item={item}
                                                location={props.location}
                                            />
                                        </motion.li>
                                    )
                                }
                                else if (item.type === "Custom"){
                                    return (
                                        <motion.li 
                                            key={item.parking.id}
                                            className={classes.item}>
                                                <AroundCustomParking 
                                                    location={props.location}
                                                    item={item}/>
                                        </motion.li>
                                    )
                                }
                                
                            })}
                        </motion.ul>
                    </div>
                </>
            )}
            {isLoading && <LoadingModal/>}
=======
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
>>>>>>> 5d634bfd2e0a3e6cfe6f6fe6ac8582c3fe804386
        </React.Fragment>

    )
};

export default AroundSearchList;