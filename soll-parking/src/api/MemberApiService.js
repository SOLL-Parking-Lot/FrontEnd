import axios from "axios";

// Rest API 요청
const apiClient = axios.create(
    {
        baseURL : 'http://localhost:8080'
    }
)

// Example Code
export const login = ({ email, password }) => {
    return apiClient.post('/login',null, {
        params : {
            email : email,
            password : password
        }
    });
}
