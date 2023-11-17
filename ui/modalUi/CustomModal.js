import React from "react";
import { PortalWithState } from "react-portal";
import styles from "./CustomModal.module.css";

const CustomModal = (props) => {
  return (
    <PortalWithState closeOnOutsideClick closeOnEsc >
      {({ openPortal, closePortal, isOpen, portal }) => (
        <>
          <button className={props.className?props.className:'btn btn-primary'} onClick={openPortal}>
            {props.title}
          </button>
          {portal(
                <div className={`${styles.overlay} border shadow`}>
                  <h1 className="text-dark">{props.title}</h1>
                  <hr/>

                    {props.children}
                </div>
          )}
        </>
      )}
    </PortalWithState>

  );
};

export default CustomModal;
