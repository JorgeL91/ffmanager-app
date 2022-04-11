import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Button } from "primereact/button";
import { getConplexes } from "../../service/complexServices";
import { Link } from "react-router-dom";

const Complex = () => {
  const [complexes, setComplexes] = useState([]);
  const [filters1, setFilters1] = useState(null);
  const [loading1, setLoading1] = useState(true);

  const initFilters1 = () => {
    setFilters1({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      nombre: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
    });
  };

  useEffect(async () => {
    setLoading1(true);
    const response = await getConplexes();
    if (!response.error) setComplexes(response);
    setLoading1(false);

    initFilters1();
  }, []); // eslint-disable-next-line

  const verifiedBodyTemplate = (rowData) => {
    return (
      <>
        <Link to={`complex-edit/${rowData.idDatosInstitucionDeportiva}`}>
          <Button icon="pi pi-clone" style={{ marginRight: ".5em" }} />
        </Link>
        {/* <Link to={`institutions-edit/${rowData.idDatosInstitucionDeportiva}`}>
          <Button icon="pi  pi-trash" className="p-button-danger" />
        </Link> */}

        <Button
          icon="pi  pi-trash"
          className="p-button-danger"
          // onClick={() =>
          //   setDisplayConfirmation({
          //     ...displayConfirmation,
          //     active: true,
          //     item: rowData,
          //   })
          // }
        />
      </>
    );
  };
  return (
    <div className="grid table-demo">
      <div className="col-12">
        <div className="card">
          <div className="grid ">
            <div className="col-6">
              <h5>Complejos</h5>
            </div>
            <div className="col-6 text-right ">
              <Link to="complex-create" className="btn btn-primary">
                <Button
                  icon="pi pi-plus"
                  label="Nuevo Registro"
                  className="mr-2 mb-2"
                />
              </Link>
            </div>
          </div>

          <DataTable
            value={complexes}
            paginator
            className="p-datatable-gridlines"
            showGridlines
            rows={10}
            dataKey="idComplejo"
            filters={filters1}
            filterDisplay="menu"
            loading={loading1}
            responsiveLayout="scroll"
            emptyMessage="No existen complejos a mostrar."
          >
            <Column
              field="nombre"
              header="Nombre"
              filter
              filterPlaceholder="Buscar por nombre"
              style={{ minWidth: "12rem" }}
            />
            <Column header="Direccion" field="direccion" />
            <Column header="Telefono" field="telefonoContacto" />
            <Column header="Intitucion" field="observation" />
            <Column
              header=""
              bodyClassName="text-center"
              style={{ minWidth: "8rem" }}
              body={verifiedBodyTemplate}
              // filter
              // filterElement={verifiedFilterTemplate}
            />
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default Complex;
