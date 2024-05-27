import React, { useEffect, useState } from "react";
import { TiArrowDownThick } from "react-icons/ti";
import classes from "./PlaceDetailContent.module.css";
import { motion } from "framer-motion";

const PlaceDetailContent = (props) => {
  // 초기 데이터 설정
  const demoInitialData = {
    weekdayStartTime: "00",
    weekdayEndTime: "24",
    weekendStartTime: "00",
    weekendEndTime: "24",
    holidayStartTime: "06",
    holidayEndTime: "24",
    basicFee: "500",
    basicTime: "10분",
    saturdayFeeType: "무료",
    holidayFeeType: "유료",
    phoneNumber: "010-0000-0000",
    totalParkingSpace: 120,
    parkingType: "공영",
  };

  const [detailData, setDetailData] = useState({});


  const animationVariants = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
  };

  return (
    <React.Fragment>
      <motion.ul
        variants={animationVariants}
        initial="initial"
        animate="animate"
        className={classes.detailContent}
      >
        <motion.li className={classes.subContainer} key="address">
          <p className={classes.subTitle}>
            주소
            <TiArrowDownThick className={classes.arrow} />
          </p>
          <ul className={classes.contentContainer}>
            <li className={classes.subContent}>경기도 과천시 막계동 33</li>
          </ul>
        </motion.li>

        <motion.li className={classes.subContainer} key="operating-hours">
          <p className={classes.subTitle}>
            운영시간
            <TiArrowDownThick className={classes.arrow} />
          </p>
          <ul className={classes.contentContainer}>
            <li className={classes.subContent}>{`평일 : ${
              detailData.weekdayStartTime
            }~${detailData.weekdayEndTime}`}</li>
            <li className={classes.subContent}>{`주말 : ${
              detailData.weekendStartTime
            }~${detailData.weekendEndTime}`}</li>
            <li className={classes.subContent}>{`공휴일 : ${
              detailData.holidayStartTime
            }~${detailData.holidayEndTime}`}</li>
          </ul>
        </motion.li>

        <motion.li className={classes.subContainer} key="price-and-tickets">
          <p className={classes.subTitle}>
            가격 및 이용권
            <TiArrowDownThick className={classes.arrow} />
          </p>
          <ul className={classes.contentContainer}>
            <div className={classes.leftContentContainer}>
              <li className={classes.subContent}>{`기본 주차 요금 :`}</li>
              <li className={classes.subContent}>{`토요일 요금 구분명 :`}</li>
              <li className={classes.subContent}>{`공휴일 요금 구분명 :`}</li>
            </div>
            <div className={classes.rightContentContainer}>
              <li
                className={classes.subContent}
              >{`${detailData.basicTime}당 ${detailData.basicFee}원`}</li>
              <li className={classes.subContent}>{`${detailData.saturdayFeeType}`}</li>
              <li className={classes.subContent}>{`${detailData.holidayFeeType}`}</li>
            </div>
          </ul>
        </motion.li>

        <motion.li className={classes.subContainer} key="parking-info">
          <p className={classes.subTitle}>
            주차장 정보
            <TiArrowDownThick className={classes.arrow} />
          </p>
          <ul className={classes.contentContainer}>
            <div className={classes.leftContentContainer}>
              <li className={classes.subContent}>{`전화번호 :`}</li>
              <li className={classes.subContent}>{`총 주차 구획 수 :`}</li>
              <li className={classes.subContent}>{`주차장 구분 : `}</li>
            </div>
            <div className={classes.rightContentContainer}>
              <li className={classes.subContent}>{`${detailData.phoneNumber}`}</li>
              <li className={classes.subContent}>{`${detailData.totalParkingSpace}`}</li>
              <li className={classes.subContent}>{`${detailData.parkingType}`}</li>
            </div>
          </ul>
        </motion.li>
      </motion.ul>
    </React.Fragment>
  );
};

export default PlaceDetailContent;
