import axios from "axios";

// Rest API 요청
const apiClient = axios.create(
    {
        baseURL : 'http://ec2-52-79-59-207.ap-northeast-2.compute.amazonaws.com:5011/auth'
    }
)

export const login = (authRequest) => {
    return apiClient.post('/sign-in',authRequest);
}

export const logout = () => {
    const accessToken = localStorage.getItem('accessToken');
    const grantType = 'Bearer';
    
    return apiClient.post('/sign-out',null,{
        withCredentials: true,
        headers: { Authorization: `${grantType} ${accessToken}` },
    });
};


export const signup = (signUpRequest) => {
    return apiClient.post('/sign-up',signUpRequest);
};


export const emailValidation = (email) => {
    return apiClient.get(`/validation/${email}`);
};

export const sendEmail = (email) => {
    return apiClient.post(`/verify-code`,null,{
        params : {
            email,
        },
    });
};

export const verifyCode = (email,code) => {
    return apiClient.post(`/verify`, {
        email,code
    });
};

export const editPassword = (email,new_password) => {
    return apiClient.post(`/password`, {
        email,new_password
    });
};

