import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import classes from "./SearchPage.module.css";
import {
    getDetailParkingLot,
    getSearchParkingLot,
} from "../api/ParkingLotApiService";
import { AnimatePresence, motion } from "framer-motion";

const SearchPage = () => {
    const navigate = useNavigate();
    const [text, setText] = useState("");
    const [result, setResult] = useState([]);
    const [coordinates, setCoordinates] = useState([]);
    const [noResults, setNoResults] = useState(false);

    const getResult = async (keyword) => {
        try {
            const response = await getSearchParkingLot(keyword);
            const searchResult = response.data;

            if (Array.isArray(searchResult) && searchResult.length > 0) {
                setNoResults(false);
                setResult(searchResult);
                
                const coords = await Promise.all(
                    searchResult.map(async (item) => {
                        const detail = await getDetailParkingLot(
                            item.id,
                            item.type
                        );
                        return detail.data;
                    })
                );
                
                setCoordinates(coords);
            } else {
                setNoResults(true);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setNoResults(true);
        }
    };

    const textChangeHandler = (event) => {
        const inputValue = event.target.value;
        setResult([]);
        setNoResults(false);
        setText(inputValue);
    };

    const textKeyDownHandler = (event) => {
        if (event.key === "Enter") {
            getResult(text);
        }
    };

    const searchHandler = () => {
        getResult(text);
    };

    const goMainPageHandler = () => {
        navigate('/');
    };

    const messageVariants = {
        initial : { opacity : 0, y : -30},
        animate : { opacity : 1, y : 0},
        exit : {opacity : 0, y : 50}
    }

    const goPlaceDetailPageHandler = (coordinate, index) => {
        const params = new URLSearchParams({
            latitude : coordinate.latitude,
            longitude : coordinate.longitude,
            parkingID :  result[index].id,
            type : result[index].type,
        }).toString();
        navigate(`/detail?${params}`);
        };
    

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <IoIosArrowBack
                    className={classes.back_icon}
                    onClick={goMainPageHandler}
                />
                <input
                    type="text"
                    className={classes.search_input}
                    value={text}
                    onChange={textChangeHandler}
                    onKeyDown={textKeyDownHandler}
                    placeholder="목적지 또는 주소 검색"
                />
                <div className={classes.icon_box}>
                    <CiSearch
                        onClick={searchHandler}
                        className={classes.search_icon}
                    />
                </div>
            </div>
            <AnimatePresence>
                {text.length === 0 && result.length === 0 && <motion.p  
                        variants={messageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"className={classes.message}>원하시는 주차장의 주소 혹은 주차장명을 입력해주세요!</motion.p>}
            </AnimatePresence>
            <div className={classes.resultContainer}>
                <AnimatePresence>
                    {noResults ? (
                        <motion.div 
                            variants={messageVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className={classes.noResults}>
                            검색 결과가 없습니다. <br/>
                            원하시는 주차장명 혹은 주소를 다시 입력해주세요.
                        </motion.div>
                    ) : (
                        result.map((item, index) => (
                            <motion.div
                                variants={messageVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className={classes.result}
                                key={`${item.id}-${index}`}
                                onClick={() =>
                                    goPlaceDetailPageHandler(coordinates[index],index)
                                }
                            >
                                <div className={classes.placeName}>
                                    {item.parkinglot_name}
                                </div>
                                <div className={classes.address}>
                                    {item.address}
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default SearchPage;