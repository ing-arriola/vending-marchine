import React from "react"
import loading from "./loading.svg"

const Loading = () => (
  <div className="spinner d-flex justify-content-center align-items-center ">
    <img src={loading} height="300"  alt="Loading" />
  </div>
);

export default Loading