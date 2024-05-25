import React from "react";
import classes from "./Post.module.css";
import DaumPostcodeEmbed from "react-daum-postcode";

const Post = (props) => {
    const themeObj = {
        searchBgColor: "#0B65C8", 
        queryTextColor: "#FFFFFF",
     };
    
    return (
        <div className={classes.modal}>
            <DaumPostcodeEmbed
                theme={themeObj}
                className={classes.postModal}
                onComplete={props.onComplete} />
        </div>
    );
};

export default Post;