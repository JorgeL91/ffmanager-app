import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { getAreas, deleteArea } from "../../service/areaServices";
import { Link } from "react-router-dom";
import ButtonsOption from "../../components/List/ButtonsActions";
import MsjToast from "../../components/confirmation/MsjToast";
import ListHeader from "../../components/List/ListHeader";
import SearchTable from "../../components/List/SearchTable";

const Area = () => {
  const [areas, setAreas] = useState([]);
  const [loading1, setLoading1] = useState(true);
  const [expandedRows, setExpandedRows] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);

  const [show, setShow] = useState({
    active: false,
    severity: "error",
    message: "",
  });

  useEffect(() => {
    loadItems();
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

  const linkTextTemplate = (data) => {
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
          <MsjToast show={show} setShow={setShow} />
          <ListHeader title="Areas" toLink="area-create" />

          <DataTable
            value={areas}
            paginator
            className="p-datatable-gridlines"
            showGridlines
            rows={10}
            dataKey="idArea"
            loading={loading1}
            responsiveLayout="scroll"
            emptyMessage="No existen areas a mostrar."
            expandedRows={expandedRows}
            onRowToggle={(e) => setExpandedRows(e.data)}
            rowExpansionTemplate={rowExpansionTemplate}
            globalFilter={globalFilter}
            header={<SearchTable filter={setGlobalFilter} />}
          >
            <Column expander style={{ width: "3em" }} />
            <Column
              field="nombre"
              header="Nombre"
              style={{ minWidth: "12rem" }}
            />
            <Column header="Tipos de area " field="tiposAreas.nombre" />
            <Column header="Complejo" field="complejos.nombre" />
            <Column
              header=""
              bodyClassName="text-center"
              style={{ minWidth: "8rem" }}
              body={(rowData) => (
                <ButtonsOption
                  idItem={rowData.idArea}
                  deleteItem={deleteItem}
                  link="area-edit"
                />
              )}
            />
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default Area;
