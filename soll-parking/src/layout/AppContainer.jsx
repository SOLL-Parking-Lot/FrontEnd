import React, { useRef, useEffect, useState } from 'react';
import classes from "./AppContainer.module.css";

const AppContainer = (props) => {
    const containerRef = useRef(null);
    const [isOverflow, setIsOverflow] = useState(false);

    const updateOverflow = () => {
        if (containerRef.current) {
            const currentHeight = containerRef.current.scrollHeight;
            setIsOverflow(currentHeight > 820);
        }
    };

    useEffect(() => {
        updateOverflow();

        const observer = new MutationObserver(() => {
            updateOverflow();
        });

        if (containerRef.current) {
            observer.observe(containerRef.current, { childList: true, subtree: true });
        }

        window.addEventListener('resize', updateOverflow);

        return () => {
            if (containerRef.current) {
                observer.disconnect();
            }
            window.removeEventListener('resize', updateOverflow);
        };
    }, [props.children]);

    return (
        <div 
            ref={containerRef} 
            className={`${classes.container} ${isOverflow ? classes.overflow_container : ''}`}
        >
            {props.children}
        </div>
    );
};

export default AppContainer;