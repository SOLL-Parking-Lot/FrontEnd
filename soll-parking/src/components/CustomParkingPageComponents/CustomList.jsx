import React, { useState, useEffect, useContext } from 'react'
import classes from "./CustomList.module.css";
import { getCustomParkingList, deleteCutsomParkingLot } from '../../api/CustomParkingApiService';
import SetTimeOutModal from '../../layout/SetTimeOutModal';
import { RiErrorWarningFill } from "react-icons/ri";
import Custom from './Custom';
import { motion } from 'framer-motion';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import loginContext from '../../store/login-context';

const CustomList = () => {

    const [customList,setCustomList] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [showCheckModal, setShowCheckModal] = useState(false);
    const [modalMessage,setModalMessage] = useState('');

    const navigate = useNavigate();
    const loginCtx = useContext(loginContext);

    const animationVariants = {
        initial: { opacity: 0, x: -50 },
        animate: { opacity: 1, x: 0,},
    };

    const fetchCustomListData = async () => {
        try{
            setIsLoading(true);
            const customResponse = await getCustomParkingList();
            const customResponseData = await customResponse.data;
            setCustomList(customResponseData);
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

    const deleteCustomParking = async (id) => {
        try{
            const deleteResponse = await deleteCutsomParkingLot(id);
            const deleteResponseData = await deleteResponse.data;
            if (deleteResponseData){
                setShowCheckModal(true);
                setModalMessage("커스텀 목록에서 삭제합니다.");
            }else{
                setShowCheckModal(true);
                setModalMessage("다시 시도해주세요.");
            }
            fetchCustomListData();
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
        fetchCustomListData();
    },[])

    return (
        <React.Fragment>
            <p className={classes.count}>총 {customList.length}건 등록</p>
            <SetTimeOutModal message={modalMessage} showModal={showCheckModal} setShowModal={setShowCheckModal} />
            {customList.length === 0 && !isLoading && <p className={classes.message}><RiErrorWarningFill style={{ marginRight:'5px'}}/> 아직 등록된 주차장이 없습니다.</p>}
            <div className={classes.list_container}>
                <motion.ul
                        variants={animationVariants}
                        initial="initial"
                        animate="animate"
                        className={classes.custom_list}
                    >
                    {customList.map(item => {
                        return (
                            <motion.li 
                                className={classes.item}
                                key={item.id}>
                                <Custom 
                                    onDelete={deleteCustomParking}
                                    item={item}/>
                            </motion.li>
                        )
                    })}
                </motion.ul>
            </div>
        </React.Fragment>
    );
};

export default CustomList;