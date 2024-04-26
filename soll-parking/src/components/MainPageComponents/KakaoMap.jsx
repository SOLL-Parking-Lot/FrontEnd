import React,{ useEffect, useState } from "react";
import classes from "./KakaoMap.module.css";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";
import parkingImage from "../../image/placeholder.png";
import "./PlaceMarkOverlay.css";

const { kakao } = window;

// dummy data
const positions = [
    {
        title: '세종로공영주차장', 
        latlng: new kakao.maps.LatLng(37.57342557,126.97593773)
    },
    {
        title: '센터포인트광화문빌딩 주차장', 
        latlng: new kakao.maps.LatLng(37.57306447, 126.97432677)
    },
    {
        title: '대한민국역사박물관 주차장', 
        latlng: new kakao.maps.LatLng(37.57398110, 126.97793753)
    },
    {
        title: '적선동노외관광버스 주차장',
        latlng: new kakao.maps.LatLng(37.57461984, 126.97399343)
    }
];

const KakaoMap = () => {

    const [ kakaoMap, setKakaoMap ] = useState();

    const mouseOverHandler = (customOverlay,map) => {
        return function() {
            customOverlay.setMap(map);
        };
    };

    const mouseOutHandler = (customOverlay) => {
        return function() {
            customOverlay.setMap(null);
        };
    }
    
    useEffect(() => {
        const container = document.getElementById('map');
        const options = {
            center : new kakao.maps.LatLng(37.57340269,126.97588429),
            level : 3
        };
        const map = new kakao.maps.Map(container,options); 
        const markerPosition  = new kakao.maps.LatLng(37.57340269,126.97588429); 

        for (var i = 0; i < positions.length; i ++) {
    
            var imageSize = new kakao.maps.Size(39, 39); 
            var markerImage = new kakao.maps.MarkerImage(parkingImage, imageSize); 
            var marker = new kakao.maps.Marker({
                map: map, 
                position: positions[i].latlng, 
                title : positions[i].title, 
                image : markerImage 
            });
            var content = `
            <div class="customoverlay">
                <a>
                <span class="title">${positions[i].title}</span>
                </a>
            </div>`;
            var customOverlay = new kakao.maps.CustomOverlay({
                position: positions[i].latlng, 
                content: content,
                yAnchor: 1 
            });
            kakao.maps.event.addListener(marker,'click', mouseOverHandler(customOverlay,map));
            // kakao.maps.event.addListener(marker,'mouseout', mouseOutHandler(customOverlay,map));
            marker.setMap(map);  
        }
        const centerMarker = new kakao.maps.Marker({
            position: markerPosition
        });
        centerMarker.setMap(map);
        setKakaoMap(map);
    },[]);

    const zoomInHandler = () => {
        kakaoMap.setLevel(kakaoMap.getLevel() - 1,{animate: true});
    };

    const zoomOutHandler = () => {
        kakaoMap.setLevel(kakaoMap.getLevel() + 1,{animate: true});
    };

    return (
        <div id='map' className={classes.container}> 
            <div className={classes.button_container}>
                <div className={classes.plus_box} onClick={zoomInHandler}>
                    <FaPlus/>
                </div> 
                <div className={classes.minus_box} onClick={zoomOutHandler}>
                    <FaMinus/>
                </div>
            </div>
        </div>
    )
};

export default KakaoMap;