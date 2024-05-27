import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import classes from "./SearchPage.module.css";
import {
    getDetailParkingLot,
    getSearchParkingLot,
} from "../api/ParkingLotApiService";

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

    const goPlaceDetailPageHandler = (coordinate) => {
        if (coordinate) {
            const { latitude, longitude } = coordinate;
            let url = `?latitude=${latitude}&longitude=${longitude}`;
            navigate(`/detail${url}`);
        }
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
            <div className={classes.resultContainer}>
                {noResults ? (
                    <div className={classes.noResults}>
                        검색 결과가 없습니다.
                    </div>
                ) : (
                    result.map((item, index) => (
                        <div
                            className={classes.result}
                            key={`${item.id}-${index}`}
                            onClick={() =>
                                goPlaceDetailPageHandler(coordinates[index])
                            }
                        >
                            <div className={classes.placeName}>
                                {item.parkinglot_name}
                            </div>
                            <div className={classes.address}>
                                {item.address}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default SearchPage;
