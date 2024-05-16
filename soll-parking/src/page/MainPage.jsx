import KakaoMap from "../components/MainPageComponents/KakaoMap";
import classes from "./MainPage.module.css";
import SearchTab from "../components/MainPageComponents/SearchTab";
import MainTab from "../components/MainPageComponents/MainTab";
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
            <SearchTab/>
            {location && <KakaoMap location={location}/>}
            <MainTab location={location}/>
        </>

    );
};

export default MainPage;