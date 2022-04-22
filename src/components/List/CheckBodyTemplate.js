import { classNames } from "primereact/utils";
import React from "react";

export default function CheckBodyTemplate({ check }) {
  return (
    <i
      className={classNames("pi", {
        "text-green-500 pi-check-circle": check,
        "text-pink-500 pi-times-circle": !check,
      })}
    ></i>
  );
}
