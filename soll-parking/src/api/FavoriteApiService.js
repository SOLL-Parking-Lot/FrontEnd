import axios from "axios";

// Rest API 요청
const apiClient = axios.create({
    baseURL: "http://localhost:5011/parking-lot/bookmark",
});

export const getFavoriteList = () => {
    const accessToken = localStorage.getItem("accessToken");
    const grantType = "Bearer";
    return apiClient.get(``, {
        withCredentials: true,
        headers: { Authorization: `${grantType} ${accessToken}` },
    });
};

export const addFavorite = (type,parkingId) => {
    const accessToken = localStorage.getItem("accessToken");
    const grantType = "Bearer";
    return apiClient.post(``, null, {
        params: { parkingId, type },
        withCredentials: true,
        headers: { Authorization: `${grantType} ${accessToken}` },
    });
};

export const deleteFavorite = (type, favoriteId) => {
    const accessToken = localStorage.getItem("accessToken");
    const grantType = "Bearer";
    return apiClient.delete(``, {
        params: { type, favoriteId },
        withCredentials: true,
        headers: { Authorization: `${grantType} ${accessToken}` },
    });
};





