import axios from "axios";

// Rest API 요청
const apiClient = axios.create(
    {
        baseURL : 'http://localhost:8080/auth'
    }
)

export const login = ({ email, password }) => {
    return apiClient.post('/sign-in',null, {
        params : {
            email : email,
            password : password
        }
    });
}

export const logout = ({}) => {
    return apiClient.post('/sign-out',null, {
    });
};


export const signup = ({}) => {
    return apiClient.post('/sign-up',null, {

    });
};

export const emailValidation = ({email}) => {
    return apiClient.post(`/validation/${email}`,null, {

    });
};
