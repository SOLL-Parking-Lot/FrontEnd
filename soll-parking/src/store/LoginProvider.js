import React, { useReducer } from "react";
import loginContext from './login-context';

const defaultLoginUser = {
    nickname : '',
    email : '',
}

const loginReducer = (state,action) => {

    if (action.type === "LOGIN"){
        return {
            ...state,
            nickname : action.nickname,
            email : action.email,
        }
    }
    if (action.type === "LOGOUT"){
        return defaultLoginUser;
    }
    return defaultLoginUser;
}

const LoginProvider = (props) => {

    const [userState, dispatchUserAction] = useReducer(loginReducer,defaultLoginUser);

    const loginHandler = ({nickname,email}) => {
        dispatchUserAction({
            type : 'LOGIN',
            nickname : nickname,
            email : email,
        })
    };
    const logoutHandler = ({email,password}) => {
        dispatchUserAction({
            type : 'LOGOUT',
        })
    };

    const userContext = {
        nickname : userState.nickname,
        email : userState.email,
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