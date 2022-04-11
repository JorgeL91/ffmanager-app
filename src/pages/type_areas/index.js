import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { deleteTypeArea, getTypeAreas } from "../../service/TypeAreaServices";
import { classNames } from "primereact/utils";
import BtnDelete from "../../components/confirmation/BtnDelete";

const TypeArea = () => {
  const [TypeAreas, setTypeAreas] = useState([]);
  const [filters1, setFilters1] = useState(null);
  const [loading1, setLoading1] = useState(true);

  const [displayConfirmation, setDisplayConfirmation] = useState({
    active: false,
    item: {},
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

  useEffect(async () => {
    loadItems();
    initFilters1();
  }, []); // eslint-disable-next-line

  const loadItems = async () => {
    setLoading1(true);
    const response = await getTypeAreas();
    setTypeAreas(response);
    setLoading1(false);
  };

  const verifiedBodyTemplate = (rowData) => {
    return (
      <>
        <Link to={`types-of-areas-edit/${rowData.idTipoArea}`}>
          <Button icon="pi pi-clone" style={{ marginRight: ".5em" }} />
        </Link>
        {/* <Link to={`TypeAreas-edit/${rowData.idDatosInstitucionDeportiva}`}>
          <Button icon="pi  pi-trash" className="p-button-danger" />
        </Link> */}
        {/* <BtnDelete /> */}
        <Button
          icon="pi  pi-trash"
          className="p-button-danger"
          onClick={() =>
            setDisplayConfirmation({
              ...displayConfirmation,
              active: true,
              item: rowData,
            })
          }
        />
      </>
    );
  };

  const confirmationDialogFooter = (
    <>
      <Button
        type="button"
        label="Cancelar"
        icon="pi pi-times"
        onClick={() =>
          setDisplayConfirmation({
            ...displayConfirmation,
            active: false,
          })
        }
        className="p-button-text"
      />
      <Button
        type="button"
        label="Aceptar"
        icon="pi pi-check"
        onClick={() => deleteItem()}
        className="p-button-text"
        autoFocus
      />
    </>
  );

  const deleteItem = async () => {
    const { item } = { ...displayConfirmation };
    const res = await deleteTypeArea(item);
    loadItems();
    setDisplayConfirmation({
      ...displayConfirmation,
      active: false,
    });
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
              // filter
              // filterElement={verifiedFilterTemplate}
            />
          </DataTable>
          <Dialog
            header="Confirmación"
            visible={displayConfirmation.active}
            onHide={() =>
              setDisplayConfirmation({
                ...displayConfirmation,
                active: false,
              })
            }
            style={{ width: "350px" }}
            modal
            footer={confirmationDialogFooter}
          >
            <div className="flex align-items-center justify-content-center">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              <span>¿Estas seguro que deseas realizar la eliminación?</span>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default TypeArea;
