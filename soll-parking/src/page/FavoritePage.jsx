import React, { useContext } from "react";
import classes from "./FavoritePage.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import loginContext from "../store/login-context";
import FavoriteList from "../components/FavoritePageComponents/FavoriteList";

const FavoritePage = () => {

    const navigate = useNavigate();
    const loginCtx = useContext(loginContext);

    const goMainPageHandler = () => {
        navigate('/');
    };

    return (
        <React.Fragment>
            <div className={classes.header}>
                <IoIosArrowBack 
                    className={classes.back_icon}
                    onClick={goMainPageHandler}/>
                <h3># 즐겨찾기</h3>
            </div>
            <div className={classes.description_container}>
                <p className={classes.description}>
                    {loginCtx.nickname}님이 등록하신 즐겨찾기 목록입니다. <br/>
                    해당 주차장을 클릭하여 자세한 정보를 살펴보세요!
                </p>
            </div>
            {loginCtx.id && <FavoriteList memberId={loginCtx.id}/>}
        </React.Fragment>

    )

};

export default FavoritePage;