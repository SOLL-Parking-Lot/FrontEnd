import React from "react";

const loginContext = React.createContext({
    nickname : '',
    email : '',
    loginUser : (nickname,email) => {},
});

export default loginContext;