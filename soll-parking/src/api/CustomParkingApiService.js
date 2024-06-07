import axios from "axios";

// Rest API 요청
const apiClient = axios.create(
    {
        baseURL : 'http://ec2-52-79-59-207.ap-northeast-2.compute.amazonaws.com:5011/custom'
    }
)

export const getCustomParkingList = () => {
    const accessToken = localStorage.getItem('accessToken');
    const grantType = 'Bearer';

    return apiClient.get('',{
        withCredentials: true,
        headers: { Authorization: `${grantType} ${accessToken}` },
    });
}

export const addCustomParkingLot = (customParkingRequest) => {
    console.log(customParkingRequest);

    const accessToken = localStorage.getItem('accessToken');
    const grantType = 'Bearer';

    return apiClient.post('',customParkingRequest,{
        withCredentials: true,
        headers: { Authorization: `${grantType} ${accessToken}` },
    });
}

export const deleteCutsomParkingLot = (id) => {
    const accessToken = localStorage.getItem('accessToken');
    const grantType = 'Bearer';

    return apiClient.delete(`/${id}`,{
        withCredentials: true,
        headers: { Authorization: `${grantType} ${accessToken}` },
    });
};