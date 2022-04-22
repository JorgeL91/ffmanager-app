import { Button } from "primereact/button";
import React from "react";
import { Link } from "react-router-dom";

export default function ListHeader({ title, toLink }) {
  return (
    <div className="grid ">
      <div className="col-6">
        <h5>{title}</h5>
      </div>
      <div className="col-6 text-right ">
        {typeof toLink === "string" ? (
          <Link to={toLink} className="btn btn-primary">
            <Button
              icon="pi pi-plus"
              label="Nuevo Registro"
              className="mr-2 mb-2"
            />
          </Link>
        ) : (
          <Button
            icon="pi pi-plus"
            label="Nuevo Registro"
            className="mr-2 mb-2"
            onClick={toLink}
          />
        )}
      </div>
    </div>
  );
}
