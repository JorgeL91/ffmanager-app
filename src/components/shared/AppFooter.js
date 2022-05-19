import React from "react";
import config from "../../config/config";

export const AppFooter = (props) => {
  return (
    <div className="layout-footer">
      <img
        src={
          props.layoutColorMode === "light"
            ? "assets/layout/images/logo.png"
            : "assets/layout/images/logo.png"
        }
        alt="Logo"
        height="20"
        className="mr-2"
      />
      by
      <span className="font-medium ml-2">{config.namePage}</span>
    </div>
  );
};
