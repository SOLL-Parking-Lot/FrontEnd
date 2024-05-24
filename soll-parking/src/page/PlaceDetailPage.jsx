import React from "react";
import classes from "./PlaceDetailPage.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import PlaceName from "../components/PlaceDetailPageComponents/PlaceName";
import RoadView from "../components/PlaceDetailPageComponents/RoadView";
import PlaceDetailContent from "../components/PlaceDetailPageComponents/PlaceDetailContent";

const PlaceDetailPage = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const latitude = searchParams.get("latitude");
  const longitude = searchParams.get("longitude");
  const location = {
    latitude,
    longitude,
  };
  const params = new URLSearchParams({
    latitude: location.latitude,
    longitude: location.longitude,
  }).toString();

  const goAroundSearchPage = () => {
    navigate(`/around?${params}`);
  };

  return (
    <React.Fragment>
      <div className={classes.header}>
        <IoIosArrowBack
          className={classes.back_icon}
          onClick={goAroundSearchPage}
        />
        <PlaceName />
      </div>
      <div>
        <p className={classes.description}>
          마커를 움직여 주변 위치를 확인하세요!
        </p>
        <RoadView location={location} />
      </div>
      <PlaceDetailContent location={location} />
    </React.Fragment>
  );
};

export default PlaceDetailPage;
