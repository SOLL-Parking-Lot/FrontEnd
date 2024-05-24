import axios from "axios";

// Rest API 요청
const apiClient = axios.create(
    {
        baseURL : 'http://localhost:5011/parking-lot'
    }
)

export const getAroundParkingLot = (location) => {
    const accessToken = localStorage.getItem('accessToken');
    const grantType = 'Bearer';

    return apiClient.post('/around',location,{
        withCredentials: true,
        headers: { Authorization: `${grantType} ${accessToken}` },
    });
}

export const getParkingLotByLevel = (location,level) => {
    const accessToken = localStorage.getItem('accessToken');
    const grantType = 'Bearer';

    return apiClient.post(`/around/${level}`,location,{
        withCredentials: true,
        headers: { Authorization: `${grantType} ${accessToken}` },
    });
}