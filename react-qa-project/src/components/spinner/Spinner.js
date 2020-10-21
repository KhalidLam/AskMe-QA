import React from "react";

const Spinner = () => (
  <div className='d-flex justify-content-center w-auto mt-4 '>
    <div
      className='spinner-border text-primary'
      style={{ width: "3rem", height: "3rem" }}
      role='status'
    >
      <span className='sr-only'>Loading...</span>
    </div>
  </div>
);

export default Spinner;
