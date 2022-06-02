import React from "react";
import config from "../../config/config";
import logo from "../../assets/images/logoFooter.png";

export const AppFooter = (props) => {
  return (
    <div className="layout-footer">
      <img src={logo} alt="Logo" height="40" className="mr-2" />

      <span className="font-medium ml-2">{config.namePage}</span>
    </div>
  );
};
