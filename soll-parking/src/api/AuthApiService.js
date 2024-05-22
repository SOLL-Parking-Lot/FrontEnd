import axios from "axios";

// Rest API 요청
const apiClient = axios.create(
    {
        baseURL : 'http://localhost:5011/auth'
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


export const emailValidation = ({email}) => {
    return apiClient.post(`/validation/${email}`,null, {

    });
};
