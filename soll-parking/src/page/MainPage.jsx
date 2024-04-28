import KakaoMap from "../components/MainPageComponents/KakaoMap";
import classes from "./MainPage.module.css";
import Search from "../components/MainPageComponents/Search";
import { useGeoLocation } from "../hooks/useGeoLocation";

const geolocationOptions = {
    enableHighAccuracy: true,
    timeout: 1000 * 10,
    maximumAge: 1000 * 3600 * 24,
}

const MainPage = () => {

    const { location } = useGeoLocation(geolocationOptions);
    return (
        <>
            <Search/>
            {location && <KakaoMap location={location}/>}
        </>

    );
};

export default MainPage;