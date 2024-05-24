import React,{ useEffect, useState, useRef } from "react";
import classes from "./KakaoMap.module.css";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";
import parkingImage from "../../image/placeholder.png";
import "./PlaceMarkOverlay.css";
import { getParkingLotByLevel } from "../../api/ParkingLotApiService";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import { useNavigate } from "react-router-dom";
import LoadingModal from "../../layout/LoadingModal";

const { kakao } = window;

const KakaoMap = (props) => {

    const mapRef = useRef(kakao.maps.Map);
    const defaultLevel = 5
    const [level, setLevel] = useState(defaultLevel);
    const [aroundParkingList,setAroundParkingList] = useState([]);
    const [openIndices, setOpenIndices] = useState([]); 
    const [isLoading,setIsLoading] = useState(true);

    const toggleOverlay = (index) => {
        if (openIndices.includes(index)) {
          setOpenIndices(openIndices.filter(i => i !== index));
        } else {
          setOpenIndices([...openIndices, index]);
        }
    };

    const handleLevel = (type) => {
        const map = mapRef.current
        if (!map) return
    
        if (type === "increase") {
          map.setLevel(map.getLevel() + 1)
          setLevel(map.getLevel())
        } else {
            map.setLevel(map.getLevel() - 1)
            setLevel(map.getLevel())
        }
    }

    const goDetailPlaceHandler = (parkingInfo) => {
        console.log(parkingInfo);
    };
    
    useEffect(() => {
        const getAroundParkingList = async () => {
            setIsLoading(true);
            const parkingResponse = await getParkingLotByLevel(props.location,level);
            const parkingResponseData = await parkingResponse.data;
            console.log(parkingResponseData);
            setAroundParkingList(parkingResponseData);
            setIsLoading(false);
        };
        getAroundParkingList();
    },[props.location, level]);

    return (
        <React.Fragment>
            {!isLoading && (
                    <Map
                        id="map"
                        className={classes.container}
                        center={{
                            lat: props.location.latitude,
                            lng: props.location.longitude,
                        }}
                    
                        level={level}
                        zoomable={true}
                        ref={mapRef}>
                            <MapMarker
                                position={{
                                lat: props.location.latitude,
                                lng: props.location.longitude,
                                }}
                            />
                           {aroundParkingList.map((parkingData, index) => (
                                <React.Fragment key={index}>
                                <MapMarker
                                    position={{
                                        lat: parkingData.parking.latitude,
                                        lng: parkingData.parking.longitude,
                                    }}
                                    image={{
                                        src: parkingImage,
                                        size: {
                                            width: 39,
                                            height: 39,
                                        },
                                    }}
                                    clickable={true}
                                    onClick={() => toggleOverlay(index)}
                                />
                                {openIndices.includes(index) && (
                                    <CustomOverlayMap
                                    position={{
                                        lat: parkingData.parking.latitude,
                                        lng: parkingData.parking.longitude,
                                    }}
                                    >
                                    <div className="customoverlay">
                                        <div onClick={() => toggleOverlay(index)} className='close'>X</div>
                                        <p onClick={() => goDetailPlaceHandler(parkingData)}>
                                        <span className="title">{parkingData.parking.parking_lot_name}</span>
                                        <span className="capacity">{parkingData.currentParking ? `${parkingData.currentParking.current_capacity}대 주차가능합니다.` : '데이터를 준비중입니다.'}</span>
                                        </p>
                                    </div>
                                    </CustomOverlayMap>
                                )}
                                </React.Fragment>
                            ))}
                    <div className={classes.button_container}>
                        <div className={classes.plus_box} onClick={() => handleLevel("decrease")}>
                            <FaPlus/>
                        </div> 
                        <div className={classes.minus_box} onClick={() => handleLevel("increase")}>
                            <FaMinus/>
                        </div>
                    </div>
                </Map>
            )}
            {isLoading && <LoadingModal/>}
        </React.Fragment>
    )
};

export default KakaoMap;