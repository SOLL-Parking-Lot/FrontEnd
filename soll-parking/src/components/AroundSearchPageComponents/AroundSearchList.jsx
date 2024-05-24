import React, { useEffect, useState, useContext } from 'react';
import classes from "./AroundSearchList.module.css";
import { RiErrorWarningFill } from "react-icons/ri";
import { motion } from "framer-motion";
import { getAroundParkingLot } from '../../api/ParkingLotApiService';
import LoadingModal from '../../layout/LoadingModal';
import AroundNationalParking from './AroundNationalParking';
import AroundSeoulParking from './AroundSeoulParking';
import AroundCustomParking from './AroundCustomParking';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import loginContext from '../../store/login-context';

const AroundSearchList = (props) => {

    const [aroundParkingLotList,setAroundParkingLotList] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const navigate = useNavigate();
    const loginCtx = useContext(loginContext);

    useEffect(() => {
        const getAroundParkingList = async () => {
           
            try {
                setIsLoading(true);
                const parkingResponse = await getAroundParkingLot(props.location);
                const parkingResponseData = await parkingResponse.data;
                setAroundParkingLotList(parkingResponseData);
                setIsLoading(false);
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
           
        };
        getAroundParkingList();
    },[]);
    const animationVariants = {
        initial: { opacity: 0, x: -50 },
        animate: { opacity: 1, x: 0,},
    };

    return (
        <React.Fragment>
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
        </React.Fragment>

    )
};

export default AroundSearchList;