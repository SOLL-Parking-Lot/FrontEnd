import React, { useState, useEffect } from 'react'
import classes from "./CustomList.module.css";
import { getCustomParkingList, deleteCutsomParkingLot } from '../../api/CustomParkingApiService';
import Swal from "sweetalert2";
import LoadingModal from '../../layout/LoadingModal';

const CustomList = () => {

    const [customList,setCustomList] = useState([]);
    const [isLoading,setIsLoading] = useState(false);

    const fetchCustomListData = async () => {
        setIsLoading(true);
        const customResponse = await getCustomParkingList();
        const customResponseData = await customResponse.data;
        setTimeout( () => {
            setIsLoading(false);
        },1000)
        console.log(customList);
        setCustomList(customResponseData);
    };

    const deleteCustomParking = async (id) => {
        const deleteResponse = await deleteCutsomParkingLot(id);
        const deleteResponseData = await deleteResponse.data;
        if (deleteResponseData){
            Swal.fire({
                icon: 'success',                        
                title: '삭제 완료',         
                html: '해당 주차장을 삭제하였습니다.'
            });
        }else{
            Swal.fire({
                icon: 'error',                        
                title: '삭제 오류',         
                html: '일시적 오류입니다. <br> 다시 시도해주세요'
            });
        }
        fetchCustomListData();
    };
    useEffect(() => {
        fetchCustomListData();
    },[])

    return (
        <React.Fragment>
            {isLoading && <LoadingModal/>}
            {customList.length === 0 && <p className={classes.message}>아직 등록된 주차장이 없습니다.</p>}
            {customList.map(item => {
                return (
                    <li key={item.id}>
                        <p>{item.parking_lot_name}</p>
                        <button onClick={() => deleteCustomParking(item.id)}>삭제</button>
                    </li>
                )
            })};
        </React.Fragment>
    );
};

export default CustomList;