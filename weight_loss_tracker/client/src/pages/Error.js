import React from "react";
import Header from "../components/Header";

const Error = () => {
  return (
    <div>
      <Header />
      <div className="d-flex align-items-center justify-content-center mt-5">
        <h3>Sorry! we couldn't find that page.</h3>
      </div>
    </div>
  );
};

export default Error;