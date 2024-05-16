import classes from "./SignLinkTab.module.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const SignupLinkTab = () => {
    
    const navigate = useNavigate();

    const goMainPageHandler = () => {
        navigate('/');
    };

    const goLoginPageHandler = () => {
        navigate('/login');
    }

    const goFindPasswordPageHandler = () => {
        navigate('/findPassword');
    };
    return (
        <div className={classes.link_container}>
            <motion.p
                onClick={goMainPageHandler}
                whileHover={{ color:'#2F6087' }} 
                className={classes.main_link}>메인화면</motion.p>
            <p className={classes.dash}>|</p>    
            <motion.p
                onClick={goLoginPageHandler}
                whileHover={{ color:'#2F6087' }} 
                className={classes.login_link}>로그인</motion.p>
            <p className={classes.dash}>|</p>
            <motion.p 
                onClick={goFindPasswordPageHandler}
                whileHover={{ color:'#2F6087' }} 
                className={classes.password_link}>비밀번호 찾기</motion.p>
        </div>
    )
};

export default SignupLinkTab;