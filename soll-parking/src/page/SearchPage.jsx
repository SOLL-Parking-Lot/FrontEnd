import React, { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import classes from "./SearchPage.module.css";

const SearchPage = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [result, setResult] = useState([]);

  const getResult = async (query) => {
    try {
      let reqOption = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await fetch(`/api/placeName?query=${query}`, reqOption);
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const textChangeHandler = (event) => {
    const inputValue = event.target.value;
    setText(inputValue);
  };

  const textKeyDownHandler = (event) => {
    if (event.key === "Enter") {
      getResult(text);
    }
  };

  const searchHandler = () => {
    getResult(text);
  };

  const goMainPageHandler = () => {
    navigate("/");
  };
  const goPlaceDetailPageHandler = (location) => {
    if (location) {
      const { latitude, longitude } = location;
      let url = `?latitude=${latitude}&longitude=${longitude}`;
      navigate(`/detail${url}`);
    }
  };

  //test용
  const demoInitialData = [
    {
      id: 1,
      placeName: "서울랜드",
      address: "경기도 과천시 막계동 33",
      totalCapacity: "14",
      currentParkingCapacity: "2",
      phoneNumber: "010-2880-9266",
      open: "02:00 ~ 24:00",
      price: "7000",
      location: { latitude: 37.4372231, longitude: 127.0246975 },
    },
    {
      id: 2,
      placeName: "서울랜드",
      address: "경기도 과천시 막계동 33",
      totalCapacity: "14",
      phoneNumber: "010-2880-9266",
      open: "02:00 ~ 24:00",
      price: "6500",
      location: { latitude: 37.2113408, longitude: 126.976 },
    },
    {
      id: 3,
      placeName: "서울랜드",
      address: "경기도 과천시 막계동 33",
      totalCapacity: "14",
      currentParkingCapacity: "2",
      phoneNumber: "010-2880-9266",
      open: "02:00 ~ 24:00",
      price: "10000",
      location: { latitude: 37.2113408, longitude: 126.976 },
    },
    {
      id: 4,
      placeName: "서울랜드",
      address: "경기도 과천시 막계동 33",
      totalCapacity: "14",
      currentParkingCapacity: "2",
      phoneNumber: "010-2880-9266",
      open: "02:00 ~ 24:00",
      price: "9000",
      location: { latitude: 37.2113408, longitude: 126.976 },
    },
  ];

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <IoIosArrowBack
          className={classes.back_icon}
          onClick={goMainPageHandler}
        />
        <input
          type="text"
          className={classes.search_input}
          value={text}
          onChange={textChangeHandler}
          onKeyDown={textKeyDownHandler}
          placeholder="목적지 또는 주소 검색"
        />

        <div className={classes.icon_box}>
          <CiSearch onClick={searchHandler} className={classes.search_icon} />
        </div>
      </div>
      <div className={classes.resultContainer}>
        {/*백엔드와 연결하면 demoInitialData대신 result를 넣으면 됨 */}
        {demoInitialData.map((item, index) => (
          <div
            className={classes.result}
            key={index}
            onClick={() => goPlaceDetailPageHandler(item.location)}
          >
            <div className={classes.placeName}>{item.placeName}</div>
            <div className={classes.address}>{item.address}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
