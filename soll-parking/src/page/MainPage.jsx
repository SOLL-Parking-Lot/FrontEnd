import KakaoMap from "../components/MainPageComponents/KakaoMap";
import SearchTab from "../components/MainPageComponents/SearchTab";
import MainTab from "../components/MainPageComponents/MainTab";
import { useGeoLocation } from "../hooks/useGeoLocation";
import { useState, useEffect, useContext } from "react";
import loginContext from "../store/login-context";
import { useNavigate, useSearchParams } from "react-router-dom";

const geolocationOptions = {
    enableHighAccuracy: true,
    timeout: 1000 * 10,
    maximumAge: 1000 * 3600 * 24,
}

const MainPage = () => {

    const { location } = useGeoLocation(geolocationOptions);
    const [ currentLocation , setCurrentLocation] = useState(null);
    const [ searchParams ] = useSearchParams();

    const loginCtx = useContext(loginContext);
    const navigate = useNavigate();

    const fetchCurrentLocation = () => {
        setCurrentLocation(location);
    };
    const setCoordinates = (tmapLocation) => {
        setCurrentLocation(tmapLocation);
    };

    useEffect(() => {
        if (loginCtx.email.trim().length === 0 || loginCtx.nickname.trim().length === 0){
            navigate("/login");
            return;
        }
        if (searchParams.get("latitude")){
            setCurrentLocation({
                latitude : searchParams.get('latitude'),
                longitude : searchParams.get('longitude')
            })
            return;
        }
        if (location) {
            setCurrentLocation(location);
        }
    }, [location]);
    return (
        <>
            <SearchTab/>
            {currentLocation && <KakaoMap onSet={setCoordinates} onFetch={fetchCurrentLocation} location={currentLocation}/>}
            <MainTab location={currentLocation}/>
        </>
    );
};

export default MainPage;