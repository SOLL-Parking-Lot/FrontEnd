import React, { useState, useEffect } from "react";
import classes from "./SetTimeOutModal.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import ReactDom from 'react-dom';

const SetTimeOutModal = ({ message, showModal, setShowModal }) => {

    const [isVisible, setIsVisible] = useState(showModal);
    const portalElement = document.getElementById('setTimeoutModal');

    useEffect(() => {
      setIsVisible(showModal);
    }, [showModal]);
  
    useEffect(() => {
      if (isVisible) {
        const timeoutId = setTimeout(() => {
          setShowModal(false);
        }, 1000);
  
        return () => clearTimeout(timeoutId);
      }
    }, [isVisible, setShowModal]);
  
    return (
      <React.Fragment> 
        {ReactDom.createPortal( 
          <AnimatePresence>
            {isVisible && (
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className={classes.modal_container}
              >
                <p><FaCheckCircle style={{ marginBottom : '3px'}}/> {message}</p>
              </motion.div>
            )}
          </AnimatePresence>,portalElement)}
      </React.Fragment>
     
    );
};

export default SetTimeOutModal;