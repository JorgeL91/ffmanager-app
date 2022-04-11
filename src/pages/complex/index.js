import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Button } from "primereact/button";
import { getConplexes, deleteConplex } from "../../service/complexServices";
import { Link } from "react-router-dom";
import BtnDelete from "../../components/confirmation/BtnDelete";
import MsjToast from "../../components/confirmation/MsjToast";

const Complex = () => {
  const [complexes, setComplexes] = useState([]);
  const [filters1, setFilters1] = useState(null);
  const [loading1, setLoading1] = useState(true);
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
    const response = await getConplexes();
    if (!response.error) setComplexes(response);
    setLoading1(false);
  };

  const deleteItem = async (confirmation) => {
    const { item } = { ...confirmation };
    const res = await deleteConplex(item);
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
        <Link to={`complex-edit/${rowData.idComplejo}`}>
          <Button icon="pi pi-clone" style={{ marginRight: ".5em" }} />
        </Link>

        <BtnDelete item={rowData.idComplejo} onConfirmation={deleteItem} />
      </>
    );
  };
  return (
    <div className="grid table-demo">
      <div className="col-12">
        <div className="card">
          <div className="grid ">
            <div className="col-6">
              <MsjToast show={show} setShow={setShow} />
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
