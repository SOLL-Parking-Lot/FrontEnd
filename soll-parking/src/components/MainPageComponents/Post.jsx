import React from "react";
import DaumPostcodeEmbed from "react-daum-postcode";

const Post = (props) => {
    const themeObj = {
        searchBgColor: "#0B65C8", 
        queryTextColor: "#FFFFFF",
     };
    
    return (
        <div>
            <DaumPostcodeEmbed
                theme={themeObj}
                onComplete={props.onComplete} />
        </div>
    );
};

export default Post;