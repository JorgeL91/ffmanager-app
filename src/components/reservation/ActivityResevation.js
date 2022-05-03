import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import React, { useState, useEffect } from "react";
import { getActivities } from "../../service/general/activitiesServices";

const ActivityResevation = () => {
  const [activities, setActivities] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [selectedActivities, setSelecteActivities] = useState(null);

  const [show, setShow] = useState({
    active: false,
    severity: "error",
    message: "",
  });

  useEffect(() => {
    getMaterialData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getMaterialData = async () => {
    const res = await getActivities();
    if (!res.error) setActivities(res);
  };

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <span className="block mt-2 md:mt-0 p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Buscar..."
        />
      </span>
    </div>
  );

  return (
    <div className="mt-5">
      <DataTable
        value={activities}
        selection={selectedActivities}
        onSelectionChange={(e) => setSelecteActivities(e.value)}
        dataKey="idActividad"
        responsiveLayout="scroll"
        header={header}
        globalFilter={globalFilter}
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "3em" }}
        ></Column>
        <Column field="nombre" header="Nombre"></Column>
        <Column field="duracion" header="Duracion"></Column>
        <Column field="observaciones" header="Observaciones"></Column>
      </DataTable>
    </div>
  );
};

export default ActivityResevation;
