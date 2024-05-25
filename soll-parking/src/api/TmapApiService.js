import axios from "axios";

// Rest API 요청
const apiClient = axios.create(
    {
        baseURL : 'http://localhost:5011/api/tmap'
    }
)

export const getCoordinateByAddress = (address) => {
    const accessToken = localStorage.getItem('accessToken');
    const grantType = 'Bearer';

    return apiClient.get(`/coordinates/${address}`,{
        withCredentials: true,
        headers: { Authorization: `${grantType} ${accessToken}` },
    });
}