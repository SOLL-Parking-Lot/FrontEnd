import React from "react";
import classes from "./AroundSearchPage.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import AroundSearchList from "../components/AroundSearchPageComponents/AroundSearchList";
import { useSearchParams } from 'react-router-dom';

const AroundSearchPage = () => {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const latitude = searchParams.get('latitude');
    const longitude = searchParams.get('longitude');
    const location = {
        latitude,
        longitude
    }

    const goMainPageHandler = () => {
        navigate('/');
    };

    return (
        <React.Fragment>
            <div className={classes.header}>
                <IoIosArrowBack 
                    className={classes.back_icon}
                    onClick={goMainPageHandler}/>
                <h3># 주변탐색</h3>
            </div>
            <div className={classes.description_container}>
                <p className={classes.description}>
                    현재 위치 주변에 위치한 주차장입니다. <br/>
                    해당 주차장을 클릭하여 자세한 정보를 살펴보세요!
                </p>
            </div>
            {latitude && <AroundSearchList location={location}/>}
        </React.Fragment>
    )
};

export default AroundSearchPage;