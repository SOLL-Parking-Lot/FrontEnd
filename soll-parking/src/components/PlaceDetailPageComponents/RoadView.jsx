import React, { useEffect, useState } from "react";
import classes from "./RoadView.module.css";
import SetTimeOutModal from "../../layout/SetTimeOutModal";

const RoadView = ({ location }) => {

  const [showCheckModal, setShowCheckModal] = useState(false);
  const [modalMessage,setModalMessage] = useState('');

  useEffect(() => {
    const { kakao } = window;

    const mapWrapper = document.getElementById("mapWrapper");
    if (!mapWrapper) {
      throw new Error('The mapWrapper with id "mapWrapper" is not found.');
    }

    const mapContainer = document.getElementById("map");
    const mapCenter = new kakao.maps.LatLng(
      location.latitude,
      location.longitude
    );
    const mapOption = {
      center: mapCenter,
      level: 3,
    };

    const map = new kakao.maps.Map(mapContainer, mapOption);
    map.addOverlayMapTypeId(kakao.maps.MapTypeId.ROADVIEW);

    const rvContainer = document.getElementById("roadview");
    const rv = new kakao.maps.Roadview(rvContainer);
    const rvClient = new kakao.maps.RoadviewClient();

    toggleRoadview(mapCenter);

    const markImage = new kakao.maps.MarkerImage(
      "https://t1.daumcdn.net/localimg/localimages/07/2018/pc/roadview_minimap_wk_2018.png",
      new kakao.maps.Size(26, 46),
      {
        spriteSize: new kakao.maps.Size(1666, 168),
        spriteOrigin: new kakao.maps.Point(705, 114),
        offset: new kakao.maps.Point(13, 46),
      }
    );

    const rvMarker = new kakao.maps.Marker({
      image: markImage,
      position: mapCenter,
      draggable: true,
      map: map,
    });

    kakao.maps.event.addListener(rvMarker, "dragend", function (mouseEvent) {
      const position = rvMarker.getPosition();
      toggleRoadview(position);
    });

    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      const position = mouseEvent.latLng;
      rvMarker.setPosition(position);
      toggleRoadview(position);
    });

    function toggleRoadview(position) {
      rvClient.getNearestPanoId(position, 50, function (panoId) {
        if (panoId === null) {
          rvContainer.style.display = "none";
          map.relayout();
          setShowCheckModal(true);
          setModalMessage("근처에 로드뷰가 지원되지 않습니다. 마커를 옮겨주세요.");
        } else {
          mapWrapper.style.width = "50%";
          map.relayout();
          rvContainer.style.display = "block";
          rv.setPanoId(panoId, position);
          rv.relayout();
        }
      });
    }
  }, []);

  return (
    <div className={classes.mapWrap}>
       <SetTimeOutModal message={modalMessage} showModal={showCheckModal} setShowModal={setShowCheckModal} />
      <div id="mapWrapper" className={classes.mapWrapper}>
        <div id="map" className={classes.map}></div>
      </div>
      <div id="rvWrapper" className={classes.rvWrapper}>
        <div id="roadview" className={classes.roadview}></div>
      </div>
    </div>
  );
};

export default RoadView;
