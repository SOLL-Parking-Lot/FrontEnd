import React, { useState, useEffect, useContext } from "react";
import classes from "./FavoriteList.module.css";
import { RiErrorWarningFill } from "react-icons/ri";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import loginContext from '../../store/login-context';
import NationalFavorite from "./NationalFavorite";
import SeoulFavorite from "./SeoulFavorite";
import { getFavoriteList, deleteFavorite } from "../../api/FavoriteApiService";
import SetTimeOutModal from '../../layout/SetTimeOutModal';
import { TiDeleteOutline } from "react-icons/ti";

const FavoriteList = () => {

    const [favoriteList,setFavoriteList] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [showCheckModal, setShowCheckModal] = useState(false);
    const [modalMessage,setModalMessage] = useState('');

    const navigate = useNavigate();
    const loginCtx = useContext(loginContext);

    const deleteFavoriteHandler = async (type, favoriteId) => {
        try{
            const deleteResponse = await deleteFavorite(type, favoriteId);
            const deleteResponseData = await deleteResponse.data;
            if (deleteResponseData){
                setShowCheckModal(true);
                setModalMessage("즐겨찾기 목록에서 삭제합니다.");
            }else{
                setShowCheckModal(true);
                setModalMessage("다시 시도해주세요.");
            }
            fetchFavoriteListData();
        }catch(error){
            console.log(error);
            Swal.fire({
                icon: 'warning',                        
                title: '로그인 만료',         
                html: `로그인이 만료되었습니다.<br> 다시 로그인 해주세요.`
            });
            loginCtx.logoutUser();
            localStorage.removeItem("accessToken");
            navigate('/login');
        }
       
    };

    const fetchFavoriteListData = async () => {
        try{
            setIsLoading(true);
            const favoriteResponse = await getFavoriteList();
            const favoriteResponseData = await favoriteResponse.data;
            console.log(favoriteResponseData);
            setFavoriteList(favoriteResponseData);
            setIsLoading(false);
        }catch(error){
            Swal.fire({
                icon: 'warning',                        
                title: '로그인 만료',         
                html: `로그인이 만료되었습니다.<br> 다시 로그인 해주세요.`
            });
            loginCtx.logoutUser();
            localStorage.removeItem("accessToken");
            navigate('/login');
        }
    };

    useEffect(() => {
        fetchFavoriteListData();
    },[]);

    const animationVariants = {
        initial: { opacity: 0, x: -50 },
        animate: { opacity: 1, x: 0,},
    };
    
    return (
        <React.Fragment>
            <SetTimeOutModal message={modalMessage} showModal={showCheckModal} setShowModal={setShowCheckModal} />
            <p className={classes.count}>총 {favoriteList.length}건 등록</p>
            {favoriteList.length === 0 && !isLoading && <p className={classes.message}><RiErrorWarningFill style={{ marginRight:'5px'}}/> 아직 등록된 즐겨찾기가 없습니다.</p>}
            {!isLoading && (
                 <div className={classes.list_container}>
                    <motion.ul
                            variants={animationVariants}
                            initial="initial"
                            animate="animate"
                            className={classes.favorite_list}
                        >
                        {favoriteList.map(item => {
                            if (item.type === "National"){
                                return (
                                    <div className={classes.container_wrapper} key={item.parking.id}>
                                            <motion.div
                                                className={classes.icon_wrapper}>
                                                <TiDeleteOutline 
                                                    className={classes.icon}
                                                    onClick={() => deleteFavoriteHandler("National",item.favoriteId)}/>
                                            </motion.div>
                                        <motion.li 
                                            className={classes.item}
                                            key={item.parking.id}>
                                            <NationalFavorite 
                                                item={item}/>
                                        </motion.li>
                                    </div>
                                    
                                )
                            }
                            else if (item.type === "Seoul"){
                                return (
                                    <div className={classes.container_wrapper} key={item.parking.id}>
                                        <motion.div
                                                className={classes.icon_wrapper}>
                                                <TiDeleteOutline 
                                                    className={classes.icon}
                                                    onClick={() => deleteFavoriteHandler("Seoul",item.favoriteId)}/>
                                        </motion.div>
                                        <motion.li 
                                            className={classes.item}
                                            key={item.parking.id}>
                                            <SeoulFavorite 
                                                item={item}/>
                                        </motion.li>
                                    </div>
                                )
                            }
                        })}
                    </motion.ul>
                </div>
            )}
        </React.Fragment>
    )
};

export default FavoriteList;