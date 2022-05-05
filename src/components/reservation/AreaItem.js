import { Button } from "primereact/button";
import React from "react";
import { Link } from "react-router-dom";

const AreaItem = ({ area }) => {
  return (
    <div className="col-12 md:col-4">
      <div className="card m-3 border-1 surface-border">
        <div className="flex align-items-center justify-content-between">
          <div className="flex align-items-center">
            <i className="pi pi-tag mr-2" />
            <span className="font-semibold">{area.complejos.nombre}</span>
          </div>
        </div>
        <div className="text-center my-4">
          <div className="text-2xl font-bold">{area.nombre}</div>
          <div className="my-4">
            Quedan 8 sectores disponibles en el rango fecha/hora seleccionado
          </div>
        </div>
        {/* <div className="flex align-items-center justify-content-between">
          <span className="">594 Reservas este mes</span>
        </div> */}
        <div className="mt-2 p-fluid">
          <Link to={`generate-reservation/${area.idArea}`}>
            <Button
              icon="pi pi-external-link"
              label="Seleccionar Sectores"
              type="button"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AreaItem;
