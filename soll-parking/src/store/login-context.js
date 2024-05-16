import React from "react";

const loginContext = React.createContext({
    memberId : 0,
    nickname : '',
    email : '',
    password : '',
    loginUser : (memberId,nickname,email,password) => {},
    logoutUser : (email,password) => {},
});

export default loginContext;