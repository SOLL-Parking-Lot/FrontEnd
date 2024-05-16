import React, { useReducer } from "react";
import loginContext from './login-context';

const defaultLoginUser = {
    id : 0,
    nickname : '',
    email : '',
    password : '',
}

const loginReducer = (state,action) => {

    if (action.type === "LOGIN"){
        return {
            ...state,
            id : action.id,
            nickname : action.nickname,
            email : action.email,
            password : action.password
        }
    }
    if (action.type === "LOGOUT"){
        return defaultLoginUser;
    }
    return defaultLoginUser;
}

const LoginProvider = (props) => {

    const [userState, dispatchUserAction] = useReducer(loginReducer,defaultLoginUser);

    const loginHandler = ({memberId,nickname,email,password}) => {
        dispatchUserAction({
            type : 'LOGIN',
            id : memberId,
            nickname : nickname,
            email : email,
            password : password
        })
    };
    const logoutHandler = ({email,password}) => {
        dispatchUserAction({
            type : 'LOGOUT',
            email : email,
            password : password
        })
    };

    const userContext = {
        id : userState.id,
        nickname : userState.nickname,
        email : userState.email,
        password : userState.password,
        loginUser : loginHandler,
        logoutUser : logoutHandler,
    }

    return (
        <loginContext.Provider value={userContext}>
            {props.children}
        </loginContext.Provider>
    );
}

export default LoginProvider;