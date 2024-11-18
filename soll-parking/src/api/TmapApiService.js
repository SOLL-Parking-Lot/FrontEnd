import axios from "axios";

// Rest API 요청
const apiClient = axios.create(
    {
        baseURL : 'http://ec2-52-79-59-207.ap-northeast-2.compute.amazonaws.com:5011/api/tmap'
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