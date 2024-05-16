import classes from "./SearchPage.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

const SearchPage = () => {

    const [text,setText] = useState('');


    const navigate = useNavigate();
   
    const textChangeHandler = (event) => {
        const inputValue = event.target.value;
        setText(inputValue);
    };

    const searchAddressHandler = () => {

    };

    const goMainPageHandler = () => {
        navigate('/');
    };

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <IoIosArrowBack 
                    className={classes.back_icon}
                    onClick={goMainPageHandler}/>
                <input type="text" 
                    className={classes.search_input}
                    value={text} 
                    onChange={textChangeHandler}
                    placeholder="목적지 또는 주소 검색"/>
                <div className={classes.icon_box}>
                    <CiSearch 
                        onClick={searchAddressHandler}
                        className={classes.search_icon}/>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;