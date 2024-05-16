import classes from "./LoginLinkTab.module.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const LoginLinkTab = () => {

    const navigate = useNavigate();

    const goMainPageHandler = () => {
        navigate('/');
    };
    const goSignupPageHandler = () => {
        navigate('/signup')
    };
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
                onClick={goSignupPageHandler}
                whileHover={{ color:'#2F6087' }} 
                className={classes.sign_up_link}>회원가입</motion.p>
            <p className={classes.dash}>|</p>
            <motion.p 
                onClick={goFindPasswordPageHandler}
                whileHover={{ color:'#2F6087' }} 
                className={classes.password_link}>비밀번호 찾기</motion.p>
        </div>
    )
};

export default LoginLinkTab;