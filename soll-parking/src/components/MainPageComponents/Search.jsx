import React from "react";
import classes from "./Search.module.css";
import { CiSearch } from "react-icons/ci";

const Search = () => {

    return (
        <div className={classes.container}>
            <input type='text' name='place'
            placeholder="목적지 및 주소 검색"
            className={classes.input} />
            <CiSearch className={classes.search_icon}/>
        </div>
    );
};

export default Search;