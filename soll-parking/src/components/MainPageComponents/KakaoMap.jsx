import React,{ useEffect, useState, useRef, useContext } from "react";
import classes from "./KakaoMap.module.css";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";
import parkingImage from "../../image/placeholder.png";
import "./PlaceMarkOverlay.css";
import { getParkingLotByLevel } from "../../api/ParkingLotApiService";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import { useNavigate } from "react-router-dom";
import LoadingModal from "../../layout/LoadingModal";
import Swal from "sweetalert2";
import loginContext from '../../store/login-context';
import { ImExit } from "react-icons/im";
import { logout } from "../../api/AuthApiService";
import SetTimeOutModal from "../../layout/SetTimeOutModal";
import { motion } from "framer-motion";
import { BiCurrentLocation } from "react-icons/bi";
import { MdShareLocation } from "react-icons/md"
import Post from "./Post";
import Modal from "../../layout/Modal";
import { getCoordinateByAddress } from "../../api/TmapApiService";

const { kakao } = window;

const KakaoMap = (props) => {

    
    const mapRef = useRef(kakao.maps.Map);
    const defaultLevel = 5
    const [level, setLevel] = useState(defaultLevel);
    const [aroundParkingList,setAroundParkingList] = useState([]);
    const [openIndices, setOpenIndices] = useState([]); 
    const [isLoading,setIsLoading] = useState(true);
    const [postPopup,setPostPopup] = useState(false);

    const [showCheckModal, setShowCheckModal] = useState(false);
    const [modalMessage,setModalMessage] = useState('');

    const navigate = useNavigate();
    const loginCtx = useContext(loginContext);

    const toggleOverlay = (index) => {
        if (openIndices.includes(index)) {
          setOpenIndices(openIndices.filter(i => i !== index));
        } else {
          setOpenIndices([...openIndices, index]);
        }
    };

    const popupOverlay = () => {
        setPostPopup(true);
    };
    const popupDown = () => {
        setPostPopup(false);
    };

    const onComplete = async (data) =>{
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        popupDown();
        try{
            const coordinateResponse = await getCoordinateByAddress(fullAddress);
            const coordinateResponseData = await coordinateResponse.data;
            const latitude = coordinateResponseData.longitude;
            const longitude = coordinateResponseData.latitude;
            props.onSet({
                latitude,longitude
            })
        }catch(error){
            Swal.fire({
                icon: 'warning',                        
                title: '로그인 만료',         
                html: `로그인이 만료되었습니다.<br> 다시 로그인 해주세요.`
            });
            loginCtx.logoutUser();
            localStorage.removeItem("accessToken");
            navigate('/login');
        }
    }

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

    const goLogout = async () => {
        try{
            const logoutResponse = await logout();
            const logoutResponseData = await logoutResponse.data;
            if (logoutResponseData){
                loginCtx.logoutUser();
                localStorage.removeItem("accessToken");
                navigate('/login');
            }
        }catch(error){
            setShowCheckModal(true);
            setModalMessage("다시 시도해주세요!");
        }
    };

    const fetchCurrentLocation = () => {
        setShowCheckModal(true);
        setModalMessage("현재 위치로 이동하겠습니다.");
        props.onFetch();
    };

    const goDetailPlaceHandler = async (parkingInfo) => {
        if (parkingInfo.type === "Custom"){
            setShowCheckModal(true);
            setModalMessage("나의 등록 주차장 입니다.");
            return;
        }
        const params = new URLSearchParams({
            latitude : parkingInfo.parking.latitude,
            longitude : parkingInfo.parking.longitude,
            parking : parkingInfo.parking,
            type : parkingInfo.type
        }).toString();
        navigate(`/detail?${params}`);
    };
    
    useEffect(() => {
        const getAroundParkingList = async () => {
          
            try{
                setIsLoading(true);
                const parkingResponse = await getParkingLotByLevel(props.location,level);
                const parkingResponseData = await parkingResponse.data;
                
                setAroundParkingList(parkingResponseData);
                setIsLoading(false);
            }catch(error){
                Swal.fire({
                    icon: 'warning',                        
                    title: '로그인 만료',         
                    html: `로그인이 만료되었습니다.<br> 다시 로그인 해주세요.`
                });
                loginCtx.logoutUser();
                localStorage.removeItem("accessToken");
                navigate('/login');
            }
            
        };
        getAroundParkingList();
    },[props.location, level]);

    return (
        <React.Fragment>
            {postPopup && (
                    <Modal 
                        onClose={popupDown}>
                        <Post onComplete={onComplete}/>
                    </Modal>
                )
            }
            <SetTimeOutModal message={modalMessage} showModal={showCheckModal} setShowModal={setShowCheckModal} />
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
                    <div className={classes.side_bar_container}>
                        <motion.div 
                            whileHover={{ scale : 1.1 }}
                            onClick={fetchCurrentLocation}
                            className={classes.current_wrapper}>
                            <BiCurrentLocation className={classes.current_logo}/>
                        </motion.div>
                        <motion.div 
                            whileHover={{ scale : 1.1 }}
                            onClick={popupOverlay}
                            className={classes.search_wrapper}>
                            <MdShareLocation className={classes.search_logo}/>
                        </motion.div>
                        <motion.div 
                            whileHover={{ scale : 1.1 }}
                            onClick={goLogout}
                            className={classes.logout_wrapper}>
                            <ImExit className={classes.logout_logo}/>
                        </motion.div>
                    </div>
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