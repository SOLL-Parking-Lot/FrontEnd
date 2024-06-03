import React, { useState, useEffect } from "react";
import classes from "./PlaceDetailPage.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useSearchParams } from "react-router-dom";
import PlaceName from "../components/PlaceDetailPageComponents/PlaceName";
import RoadView from "../components/PlaceDetailPageComponents/RoadView";
import PlaceDetailContent from "../components/PlaceDetailPageComponents/PlaceDetailContent";
import { FaRegStar, FaStar } from "react-icons/fa";
import { getBookMark, addFavorite, deleteFavorite } from "../api/FavoriteApiService";
import SetTimeOutModal from "../layout/SetTimeOutModal";

const PlaceDetailPage = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [bookMark, setBookMark] = useState(false);
    const [favoriteId, setFavoriteId] = useState(null);
    const [searchParams] = useSearchParams();

    const [showCheckModal, setShowCheckModal] = useState(false);
    const [modalMessage,setModalMessage] = useState('');

    
    const latitude = searchParams.get("latitude");
    const longitude = searchParams.get("longitude");
    const location = { latitude, longitude };
    const parkingId = searchParams.get("parkingID");
    const parkingType = searchParams.get("type");

    const goAroundSearchPage = () => {
        navigate(-1);
    };

    const addBookMarkHandler = async () => {
        try {
            const response = await addFavorite(parkingType, parkingId);
            setBookMark(true);
            setFavoriteId(response.data);
            setShowCheckModal(true);
            setModalMessage("즐겨찾기에 추가하였습니다!");
        } catch (error) {
            console.error("Failed to add bookmark:", error);
        }
    };

    const deleteBookMarkHandler = async () => {
        try {
            await deleteFavorite(parkingType, favoriteId);
            setBookMark(false);
            setFavoriteId(null);
            setShowCheckModal(true);
            setModalMessage("즐겨찾기에 해제하였습니다!");
        } catch (error) {
            console.error("Failed to delete bookmark:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getBookMark(parkingType, parkingId);
                setFavoriteId(response.data);
                setBookMark(response.data !== '');
            } catch (error) {
                console.error("Error fetching bookmark:", error);
            }
        };

        fetchData();
    }, [bookMark, favoriteId]);

    return (
        <React.Fragment>
            <SetTimeOutModal message={modalMessage} showModal={showCheckModal} setShowModal={setShowCheckModal} />
            <div className={classes.header}>
                <IoIosArrowBack
                    className={classes.back_icon}
                    onClick={goAroundSearchPage}
                />
                <PlaceName title={title} />
                {bookMark ? (
                    <FaStar
                        className={classes.fillbookMarkIcon}
                        onClick={deleteBookMarkHandler}
                    />
                ) : (
                    <FaRegStar
                        className={classes.emptybookMarkIcon}
                        onClick={addBookMarkHandler}
                    />
                )}
            </div>
            <div>
                <p className={classes.description}>
                    마커를 움직여 주변 위치를 확인하세요!
                </p>
                <RoadView location={location} />
            </div>
            <PlaceDetailContent setTitle={setTitle} />
        </React.Fragment>
    );
};

export default PlaceDetailPage;