import React from "react";
import styles from "./PageLoading.module.css";

const PageLoading = () => {
  return (
    <div className={`${styles.outerContainer}`}>
      <span className={`${styles.loadinSpinner}`}></span>
      <span className={`${styles.loadingText}`}>loading ... </span>
    </div>
  );
};

export default PageLoading;
