import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { deleteTypeArea, getTypeAreas } from "../../service/TypeAreaServices";
import { classNames } from "primereact/utils";
import BtnDelete from "../../components/confirmation/BtnDelete";

const TypeArea = () => {
  const [TypeAreas, setTypeAreas] = useState([]);
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
    loadItems();
    initFilters1();
  }, []); // eslint-disable-next-line

  const loadItems = async () => {
    setLoading1(true);
    const response = await getTypeAreas();
    if (!response.error) setTypeAreas(response);
    setLoading1(false);
  };

  const verifiedBodyTemplate = (rowData) => {
    return (
      <>
        <Link to={`types-of-areas-edit/${rowData.idTipoArea}`}>
          <Button icon="pi pi-clone" style={{ marginRight: ".5em" }} />
        </Link>

        <BtnDelete rowData={rowData} onConfirmation={deleteItem} />
      </>
    );
  };

  const deleteItem = async (confirmation) => {
    const { item } = { ...confirmation };
    const res = await deleteTypeArea(item);
    loadItems();
  };

  const checkBodyTemplate = (verified) => {
    return (
      <i
        className={classNames("pi", {
          "text-green-500 pi-check-circle": verified,
          "text-pink-500 pi-times-circle": !verified,
        })}
      ></i>
    );
  };

  return (
    <div className="grid table-demo">
      <div className="col-12">
        <div className="card">
          <div className="grid ">
            <div className="col-6">
              <h5>Tipo de areas</h5>
            </div>
            <div className="col-6 text-right ">
              <Link to="types-of-areas-create" className="btn btn-success">
                <Button
                  icon="pi pi-plus"
                  label="Nuevo Registro"
                  className="mr-2 mb-2"
                />
              </Link>
            </div>
          </div>

          <DataTable
            value={TypeAreas}
            paginator
            className="p-datatable-gridlines"
            showGridlines
            rows={10}
            dataKey="idTipoArea"
            filters={filters1}
            filterDisplay="menu"
            loading={loading1}
            responsiveLayout="scroll"
            emptyMessage="No existen datos."
          >
            <Column
              field="nombre"
              header="Nombre"
              filter
              filterPlaceholder="Buscar por nombre"
              style={{ minWidth: "12rem" }}
            />
            <Column header="Direccion" field="descripcion" />
            <Column header="Observaciones" field="observaciones" />
            <Column
              field="esCompuesta"
              header="Compuesta"
              dataType="boolean"
              bodyClassName="text-center"
              style={{ minWidth: "8rem" }}
              body={(rowData) => checkBodyTemplate(rowData.esCompuesta)}
            />
            <Column
              field="esTechada"
              header="Techada"
              dataType="boolean"
              bodyClassName="text-center"
              style={{ minWidth: "8rem" }}
              body={(rowData) => checkBodyTemplate(rowData.esTechada)}
            />
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

export default TypeArea;
