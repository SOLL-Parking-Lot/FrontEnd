import React, { useState, useEffect } from "react";
import classes from "./FavoriteList.module.css";
import Favorite from "./Favorite";
import { RiErrorWarningFill } from "react-icons/ri";
import { motion } from "framer-motion";

const demoInitialData = [
    {
        id : 1,
        placeName : '서울랜드',
        address : '경기도 과천시 막계동 33',
        totalCapacity : '1256',
        currentParkingCapacity : '381',
        phoneNumber : '02-371-3753'
    },
    {
        id : 2,
        placeName : '화서역파크푸르지오 아파트',
        address : '경기도 수원시 대평로 27',
        totalCapacity : '876',
        phoneNumber : '031-245-9266'
    },
    {
        id : 3,
        placeName : '서울랜드',
        address : '경기도 과천시 막계동 33',
        totalCapacity : '14',
        currentParkingCapacity : '2',
        phoneNumber : '010-2880-9266'
    },
    {
        id : 4,
        placeName : '서울랜드',
        address : '경기도 과천시 막계동 33',
        totalCapacity : '14',
        currentParkingCapacity : '2',
        phoneNumber : '010-2880-9266'
    }
]

const FavoriteList = (props) => {

    const [favoriteList,setFavoriteList] = useState([]);

    useEffect(() => {
        // props.memberId와 Rest api를 통해 백앤드에서 가져옴
        // 현재는 demo data
        setFavoriteList(demoInitialData);
    },[]);

    const animationVariants = {
        initial: { opacity: 0, x: -50 },
        animate: { opacity: 1, x: 0,},
    };
    
    return (
        <React.Fragment>
            <p className={classes.count}>총 {favoriteList.length}건 등록</p>
            {favoriteList.length === 0 && <p className={classes.message}><RiErrorWarningFill style={{ marginRight:'5px'}}/> 아직 등록된 즐겨찾기가 없습니다.</p>}
            <div className={classes.list_container}>
                <motion.ul
                        variants={animationVariants}
                        initial="initial"
                        animate="animate"
                        className={classes.favorite_list}
                    >
                    {favoriteList.map(item => {
                        return (
                            <motion.li 
                                className={classes.item}
                                key={item.id}>
                                <Favorite item={item}/>
                            </motion.li>
                        )
                    })}
                </motion.ul>
            </div>
        </React.Fragment>

    )
};

export default FavoriteList;