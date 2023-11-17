import React from "react";

const CustomButton = (props) => {
  const alertHandler = () => {
    alert("تابعی برای این دکمه یافت نشد");
  };
  return (
    <button
      className={props.variant ? `btn btn-${props.variant}` : "btn btn-dark"}
      onClick={props.click?props.click:alertHandler }
      type={props.type?props.type:'button'}
    >
      {props.children ? props.children : 'دکمه اختصاصی'}
    </button>
  );
};

export default CustomButton;
