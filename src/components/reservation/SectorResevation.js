import React, { useState } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

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

const SectorResevation = () => {
  const [selectedHours, setSelectedHours] = useState(null);

  return (
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
      </DataTable>
    </div>
  );
};

export default SectorResevation;
