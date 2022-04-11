import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Button } from "primereact/button";
import { getAreas, deleteArea } from "../../service/areaServices";
import { Link } from "react-router-dom";
import BtnDelete from "../../components/confirmation/BtnDelete";
import MsjToast from "../../components/confirmation/MsjToast";

const Area = () => {
  const [areas, setAreas] = useState([]);
  const [filters1, setFilters1] = useState(null);
  const [loading1, setLoading1] = useState(true);
  const [expandedRows, setExpandedRows] = useState(null);

  const [show, setShow] = useState({
    active: false,
    severity: "error",
    message: "",
  });

  const initFilters1 = () => {
    setFilters1({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      nombre: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
    });
  };

  useEffect(() => {
    loadItems();
    initFilters1();
  }, []); // eslint-disable-next-line

  const loadItems = async () => {
    setLoading1(true);
    const response = await getAreas();
    if (!response.error) setAreas(response);
    setLoading1(false);
  };

  const deleteItem = async (confirmation) => {
    const { item } = { ...confirmation };
    const res = await deleteArea(item);
    if (res.error) {
      setShow({
        ...show,
        active: true,
        message: res.errorMessage,
      });
    } else {
      loadItems();
    }
  };

  const verifiedBodyTemplate = (rowData) => {
    return (
      <>
        <Link to={`area-edit/${rowData.idArea}`}>
          <Button icon="pi pi-clone" style={{ marginRight: ".5em" }} />
        </Link>

        <BtnDelete item={rowData.idArea} onConfirmation={deleteItem} />
      </>
    );
  };

  const linkTextTemplate = (data) => {
    console.log(data);

    return (
      <Link
        to={`sector-edit/${data.idSector}`}
        className="btn btn-primary bt-sm"
      >
        {data.nombre}
      </Link>
    );
  };

  const rowExpansionTemplate = (data) => {
    console.log(data);
    return (
      <div className="orders-subtable">
        <div className="grid ">
          <div className="col-6">
            <h5>Sectores</h5>
          </div>
          <div className="col-6 text-right ">
            <Link to={`sector-create/${data.idArea}`}>
              <Button
                icon="pi pi-plus"
                className="p-button-success mr-1 mb-1"
              />
            </Link>
          </div>
        </div>
        <DataTable value={data.sectores} responsiveLayout="scroll">
          <Column
            field="nombre"
            header="nombre"
            body={linkTextTemplate}
          ></Column>
          <Column field="tamano" header="tamano"></Column>
          <Column field="numeroSector" header="numeroSector"></Column>
        </DataTable>
      </div>
    );
  };

  return (
    <div className="grid table-demo">
      <div className="col-12">
        <div className="card">
          <div className="grid ">
            <div className="col-6">
              <MsjToast show={show} setShow={setShow} />
              <h5>Areas</h5>
            </div>
            <div className="col-6 text-right ">
              <Link to="area-create" className="btn btn-primary">
                <Button
                  icon="pi pi-plus"
                  label="Nuevo Registro"
                  className="mr-2 mb-2"
                />
              </Link>
            </div>
          </div>

          <DataTable
            value={areas}
            paginator
            className="p-datatable-gridlines"
            showGridlines
            rows={10}
            dataKey="idArea"
            filters={filters1}
            filterDisplay="menu"
            loading={loading1}
            responsiveLayout="scroll"
            emptyMessage="No existen areas a mostrar."
            expandedRows={expandedRows}
            onRowToggle={(e) => setExpandedRows(e.data)}
            rowExpansionTemplate={rowExpansionTemplate}
          >
            <Column expander style={{ width: "3em" }} />
            <Column
              field="nombre"
              header="Nombre"
              filter
              filterPlaceholder="Buscar por nombre"
              style={{ minWidth: "12rem" }}
            />
            <Column header="Tipos de area " field="tiposAreas.nombre" />
            <Column header="Complejo" field="complejos.nombre" />
            <Column
              header=""
              bodyClassName="text-center"
              style={{ minWidth: "8rem" }}
              body={verifiedBodyTemplate}
            />
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default Area;