import axios from "axios";

// Rest API 요청
const apiClient = axios.create({
    baseURL: "http://ec2-52-79-59-207.ap-northeast-2.compute.amazonaws.com:5011/bookmark",
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

export const getBookMark = (type, parkingId) => {
    const accessToken = localStorage.getItem("accessToken");
    const grantType = "Bearer";

    return apiClient.get(
        `/is-bookmark`,
        {
            withCredentials: true,
            params: { type, parkingId },
            headers: { Authorization: `${grantType} ${accessToken}` },
        }
    );
};
;