import React, { useState } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Checkbox } from "primereact/checkbox";

import "./cancha.css";
const hours = [
  {
    id: 1,
    hour: "8:00 - 9:00",
  },
  {
    id: 2,
    hour: "9:00 - 10:00",
  },
  {
    id: 3,
    hour: "10:00 - 12:00",
  },
  {
    id: 4,
    hour: "12:00 - 13:00",
  },
  {
    id: 5,
    hour: "13:00 - 14:00",
  },
  {
    id: 6,
    hour: "15:00 - 16:00",
  },
];

const SectorResevation = ({ isCompuesta }) => {
  const [selectedHours, setSelectedHours] = useState(null);

  return (
    <>
      {isCompuesta ? (
        <Cancha />
      ) : (
        <div className="mt-5">
          <DataTable
            value={hours}
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
          >
            <Column
              selectionMode="multiple"
              headerStyle={{ width: "3rem" }}
            ></Column>
            <Column
              field="hour"
              header="Rango de tiempos libres"
              sortable
              headerStyle={{ width: "80%", minWidth: "10rem" }}
            ></Column>
          </DataTable>{" "}
        </div>
      )}
    </>
  );
};

function Cancha() {
  let sectors = [
    { id: 1, name: "sector" },
    { id: 2, name: "sector" },
    { id: 3, name: "sector" },
    { id: 4, name: "sector" },
    { id: 5, name: "sector" },
    { id: 6, name: "sector" },
    { id: 7, name: "sector" },
    { id: 8, name: "sector" },
    { id: 9, name: "sector" },
    { id: 10, name: "sector" },
    { id: 11, name: "sector" },
    { id: 12, name: "sector" },
    { id: 13, name: "sector" },
    { id: 14, name: "sector" },
    { id: 15, name: "sector" },
    { id: 16, name: "sector" },
  ];
  const [selectedSector, setSelectedSector] = useState(sectors);
  const [checkedAll, setCheckedAll] = useState(false);

  const onSelectedItem = (sector, index) => {
    if (sector.selected === undefined || sector.selected === false) {
      sector.selected = true;
    } else {
      sector.selected = false;
    }
    setSelectedSector((values) =>
      values.map((value, i) => (i === index ? sector : value))
    );
  };

  const onSelectedAll = (event) => {
    const ch = event.target.checked;
    let update = [];
    for (let index = 0; index < selectedSector.length; index++) {
      const element = selectedSector[index];
      element.selected = ch;
      update.push(element);
    }
    setSelectedSector(update);
    setCheckedAll(ch);
  };

  return (
    <div>
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
            {selectedSector.map((sector, index) => (
              <div
                onClick={() => onSelectedItem(sector, index)}
                className={"sector " + (sector.selected && "sector-selected")}
                key={sector.id}
              >
                <div className="title">
                  {sector.name}
                  {sector.id}
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
