import React from "react";
import spinnerImg from "../../assets/Loading_icon.gif";

const Spinner = () => {
  return (
    <>
      <img
        src={spinnerImg}
        alt='spinner'
        className='d-block m-auto'
        style={{ width: "200px" }}
      />
    </>
  );
};

export default Spinner;
