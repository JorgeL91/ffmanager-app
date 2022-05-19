import React, { useState } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";

import "./cancha.css";

const SectorResevation = ({
  isCompuesta,
  sectors,
  setSectors,
  getListHours,
  getNewsSectores,
  selectedHours,
  setSelectedHours,
}) => {
  const isRowSelectable = (event) => {
    const data = event.data;
    return data.status === "libre";
  };
  return (
    <>
      {isCompuesta === "true" ? (
        <Cancha
          sectors={sectors}
          setSectors={setSectors}
          getListHours={getListHours}
          getNewsSectores={getNewsSectores}
          btnHours={selectedHours}
          setBtnHours={setSelectedHours}
        />
      ) : (
        <div className="mt-5">
          <DataTable
            value={sectors}
            selection={selectedHours}
            onSelectionChange={(e) => setSelectedHours(e.value)}
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Mostrando del {first} al {last} de {totalRecords} registros"
            emptyMessage="Disponibilidad no encontrada."
            responsiveLayout="scroll"
            isDataSelectable={isRowSelectable}
          >
            <Column
              selectionMode="multiple"
              headerStyle={{ width: "3rem" }}
            ></Column>
            <Column
              field="hour"
              header="Rango de tiempos libres"
              sortable
              headerStyle={{ width: "60%", minWidth: "10rem" }}
            ></Column>
            <Column
              field="status"
              header="Estado"
              sortable
              headerStyle={{ width: "20%", minWidth: "10rem" }}
            ></Column>
          </DataTable>{" "}
        </div>
      )}
    </>
  );
};

function Cancha({
  sectors,
  setSectors,
  getListHours,
  getNewsSectores,
  btnHours,
  setBtnHours,
}) {
  const [checkedAll, setCheckedAll] = useState(false);

  const hours = getListHours();

  const onSelectedItem = (sector, index) => {
    if (!sector.disponible) {
      return;
    }
    if (sector.selected === undefined || sector.selected === false) {
      sector.selected = true;
    } else {
      sector.selected = false;
    }
    setSectors((values) =>
      values.map((value, i) => (i === index ? sector : value))
    );
  };

  const onSelectedAll = (event) => {
    const ch = event.target.checked;
    let update = [];
    for (let index = 0; index < sectors.length; index++) {
      const element = sectors[index];
      element.selected = ch;
      update.push(element);
    }
    setSectors(update);
    setCheckedAll(ch);
  };

  const onButton = (item, key) => {
    getNewsSectores(item);
    setBtnHours(key);
  };

  return (
    <div>
      <div className="col-12 my-3">
        {hours.length > 1 &&
          hours.map((item, key) => (
            <Button
              type="button"
              onClick={() => onButton(item, key)}
              className="mx-2 btn-hour-reservation"
              key={key}
              disabled={btnHours === key}
            >
              {item}
            </Button>
          ))}
      </div>
      <div className="col-12 my-3">
        <Checkbox
          inputId="cb1"
          value="New York"
          onChange={onSelectedAll}
          checked={checkedAll}
        ></Checkbox>
        <label htmlFor="cb1" className="p-checkbox-label mx-2">
          Seleccionar todos los Sectores
        </label>
      </div>
      <div className="routate-cancha ">
        <div className="bg-cancha ">
          <div className="container-cancha">
            {sectors.map((sector, index) => (
              <div
                onClick={() => onSelectedItem(sector, index)}
                className={
                  "sector " + (sector.selected && "sector-selected ")
                  // +(sector.idEstado && " sector-disabled ")
                  // (sector.numeroSector === 16 && " sector-reserved ")
                }
                style={
                  !sector.disponible ? { backgroundColor: sector.color } : {}
                }
                key={sector.idSector}
              >
                <div className="title">
                  {sector.nombre}
                  <br />
                  {sector.usuarioReserva}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SectorResevation;
