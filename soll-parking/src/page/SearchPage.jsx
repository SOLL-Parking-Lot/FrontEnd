import classes from "./SearchPage.module.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {

    const [text,setText] = useState('');
    const navigate = useNavigate();

    const textChangeHandler = (event) => {
        setText(event.target.value);
    };

    const goMainPageHandler = () => {
        navigate('/');
    };

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <FaArrowLeftLong onClick={goMainPageHandler}/>
                <input type="text" 
                    className={classes.search_input}
                    value={text} 
                    onChange={textChangeHandler}
                    placeholder="목적지 또는 주소 검색"/>
            </div>
        </div>
    );
};

export default SearchPage;