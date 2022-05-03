import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getMaterials } from "../../service/general/materialsServices";
import { InputText } from "primereact/inputtext";
import MsjToast from "../confirmation/MsjToast";

const MaterialResevation = () => {
  const [materials, setMaterials] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [show, setShow] = useState({
    active: false,
    severity: "error",
    message: "",
  });

  useEffect(() => {
    getMaterialData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getMaterialData = async () => {
    const res = await getMaterials();
    res.forEach((element) => {
      element.count = 0;
    });
    if (!res.error) setMaterials(res);
  };

  const columns = [
    { field: "nombre", header: "Nombre" },
    { field: "stock", header: "Stock" },
    { field: "count", header: "Cantidad" },
    { field: "maximoPorDia", header: "Maximo por dia" },
    { field: "observaciones", header: "Observaciones" },
  ];
  const cellEditor = (options) => {
    //return textEditor(options);
    if (options.field !== "count") {
      return options.value;
    } else {
      return textEditor(options);
    }
  };

  const textEditor = (options) => {
    return (
      <InputText
        className="w-100"
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };

  const onCellEditComplete = (e) => {
    let { rowData, newValue, field, originalEvent: event } = e;

    if (newValue) {
      if (newValue > rowData.stock) {
        setShow({
          ...show,
          active: true,
          message: "El valor no puede ser mayor al stock",
        });
        return;
      } else if (newValue > rowData.maximoPorDia) {
        setShow({
          ...show,
          active: true,
          message: "El valor no puede ser mayot al maximo por dia",
        });
        return;
      } else {
        rowData[field] = newValue;
      }
    } else {
      event.preventDefault();
    }
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
      <MsjToast show={show} setShow={setShow} />

      <DataTable
        value={materials}
        editMode="cell"
        className="editable-cells-table"
        responsiveLayout="scroll"
        header={header}
        globalFilter={globalFilter}
      >
        {columns.map(({ field, header }) => {
          return (
            <Column
              key={field}
              field={field}
              header={header}
              style={{ width: "25%" }}
              // body={field === "price" && priceBodyTemplate}
              editor={(options) => cellEditor(options)}
              onCellEditComplete={onCellEditComplete}
            />
          );
        })}
      </DataTable>
    </div>
  );
};

export default MaterialResevation;
