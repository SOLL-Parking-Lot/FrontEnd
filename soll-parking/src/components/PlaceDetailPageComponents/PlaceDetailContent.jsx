import React, { useEffect, useState } from "react";
import { TiArrowDownThick } from "react-icons/ti";
import classes from "./PlaceDetailContent.module.css";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { getDetailParkingLot, getCurrentParkingLot } from "../../api/ParkingLotApiService";

const PlaceDetailContent = ({setTitle}) => {
    const [searchParams] = useSearchParams();
    const [detailData, setDetailData] = useState(null);
    const parkingID = searchParams.get("parkingID");
    const parkingType = searchParams.get("type");

    let weekday_start_time;
    let weekday_end_time;
    let weekend_start_time;
    let weekend_end_time;
    let holiday_start_time;
    let holiday_end_time;

    const fetchPlaceHour = (detailData) => {
        weekday_start_time = detailData.weekday_start_time;
        weekday_end_time = detailData.weekday_end_time;

        weekend_start_time = detailData.weekend_start_time;
        weekend_end_time = detailData.weekend_end_time;

        holiday_start_time = detailData.holiday_start_time;
        holiday_end_time = detailData.holiday_end_time;

        if (weekday_start_time.trim().length === 0){
            detailData.weekday_start_time="00:00";
        }
        if (weekday_start_time ===  "0:00" || weekday_start_time ===  "0"){
            detailData.weekday_start_time="00:00";
        }
        if (weekday_end_time ===  "0:00" || weekday_end_time ===  "0"){
            detailData.weekday_end_time="23:59";
        }
        if (weekday_end_time.trim().length === 0){
            detailData.weekday_end_time="23:59";
        }


        if (weekend_start_time.trim().length === 0){
            detailData. weekend_start_time="00:00";
        }
        if (weekend_start_time === "0:00" || weekend_start_time ===  "0"){
            detailData.weekend_start_time="00:00";
        }
        if (weekend_end_time === "0:00" || weekend_end_time ===  "0"){
            detailData.weekend_end_time="23:59";
        }
        if (weekend_end_time.trim().length === 0){
            detailData.weekend_end_time="23:59";
        }


        if (holiday_start_time.trim().length === 0){
            detailData.holiday_start_time="00:00";
        }
        if (holiday_start_time ===  "0:00" || holiday_start_time ===  "0"){
            detailData.holiday_start_time="00:00";
        }
        if (holiday_end_time ===  "0:00" || holiday_end_time ===  "0"){
            detailData.holiday_end_time="23:59";
        }
        if (holiday_end_time.trim().length === 0){
            detailData.holiday_end_time="23:59";
        }
        return detailData;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const detail = await getDetailParkingLot(parkingID, parkingType);
                if (parkingType === "Seoul"){
                    const currentResponse = await getCurrentParkingLot(detail.data.address);
                    const currentResponseData = await currentResponse.data;
                    detail.data = {
                        ...detail.data, capacity : currentResponseData.current_capacity
                    }
                }
                setDetailData(fetchPlaceHour(detail.data));
                setTitle(detail.data.parking_lot_name)
            } catch (error) {
                console.error("Failed to fetch detail parking lot data:", error);
            }
        };
        fetchData();
    }, [parkingID, parkingType]);

    const animationVariants = {
        initial: { opacity: 0, x: -50 },
        animate: { opacity: 1, x: 0 },
    };

    if (!detailData) {
        return <div>Loading...</div>;
    }

    return (
        <React.Fragment>
            <motion.div
                variants={animationVariants}
                initial="initial"
                animate="animate"
                className={classes.detailContent}
            >
                <motion.div className={classes.subContainer}>
                    <p className={classes.subTitle}>
                        주소 <TiArrowDownThick className={classes.arrow} />
                    </p>
                    <div className={classes.contentContainer}>
                        <div className={classes.subContent}>
                            {detailData.address}
                        </div>
                    </div>
                </motion.div>

                <motion.div className={classes.subContainer}>
                    <p className={classes.subTitle}>
                        운영시간
                        <TiArrowDownThick className={classes.arrow} />
                    </p>
                    <div className={classes.contentContainer}>
                        <div className={classes.subContent}>{`평일  ${detailData.weekday_start_time}~${detailData.weekday_end_time}`}</div>
                        <div className={classes.subContent}>{`주말  ${detailData.weekend_start_time}~${detailData.weekend_end_time}`}</div>
                        <div className={classes.subContent}>{`공휴일  ${detailData.holiday_start_time}~${detailData.holiday_end_time}`}</div>
                    </div>
                </motion.div>

                <motion.div className={classes.subContainer}>
                    <p className={classes.subTitle}>
                        가격 및 이용권
                        <TiArrowDownThick className={classes.arrow} />
                    </p>
                    <div className={classes.contentContainer}>
                        <div className={classes.leftContentContainer}>
                            <div className={classes.subContent}>{`기본 주차 요금 `}</div>
                            <div className={classes.subContent}>{`토요일 요금 구분명 `}</div>
                            <div className={classes.subContent}>{`공휴일 요금 구분명 `}</div>
                        </div>
                        <div className={classes.rightContentContainer}>
                            <div className={classes.subContent}>
                                {detailData.basic_time === 0 ? "아직 정보가 없습니다" : `${detailData.basic_time}분당 ${detailData.basic_fee}원`}
                            </div>
                            <div className={classes.subContent}>{detailData.saturday_fee_type}</div>
                            <div className={classes.subContent}>{detailData.holiday_fee_type}</div>
                        </div>
                    </div>
                </motion.div>

                <motion.div className={classes.subContainer}>
                    <p className={classes.subTitle}>
                        주차장 정보
                        <TiArrowDownThick className={classes.arrow} />
                    </p>
                    <div className={classes.contentContainer}>
                        <div className={classes.leftContentContainer}>
                            <div className={classes.subContent}>{`전화번호 `}</div>
                            <div className={classes.subContent}>{`총 주차 구획 수 `}</div>
                            {parkingType === "Seoul" && <div className={classes.subContent}>{`현재 주차 구획 수`}</div>} 
                            <div className={classes.subContent}>{`주차장 이름  `}</div>
                        </div>
                        <div className={classes.rightContentContainer}>
                            <div className={classes.subContent}>{detailData.phone_number}</div>
                            <div className={classes.subContent}>{detailData.total_parking_space}대</div>
                            {parkingType === "Seoul" &&  <div className={classes.subContent}>{detailData.capacity}대</div>} 
                            <div className={classes.subContent}>{detailData.parking_lot_name}</div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </React.Fragment>
    );
};

export default PlaceDetailContent;