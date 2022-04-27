import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import MsjToast from "../../components/confirmation/MsjToast";
import ButtonsActions from "../../components/List/ButtonsActions";
import ListHeader from "../../components/List/ListHeader";
import {
  deleteStatus,
  getStatus,
  postStatus,
  putStatus,
} from "../../service/general/statusServices";
import StatusForm from "../../components/forms/StatusForm";
import CheckBodyTemplate from "../../components/List/CheckBodyTemplate";
import SearchTable from "../../components/List/SearchTable";

const Status = () => {
  let emptyItem = {
    idEstado: 0,
    nombre: "",
    permiteUsar: false,
    observaciones: "",
  };

  const [Items, setItems] = useState(null);
  const [ItemDialog, setItemDialog] = useState(false);
  const [Item, setItem] = useState(emptyItem);
  const [selectedItems, setSelectedItems] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [loading, setLoading] = useState(true);

  const [show, setShow] = useState({
    active: false,
    severity: "error",
    message: "",
  });

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    setLoading(true);
    const res = await getStatus();
    if (!res.error) setItems(res);
    setLoading(false);
  };

  const openNew = () => {
    setItem(emptyItem);
    setSubmitted(false);
    setItemDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setItemDialog(false);
  };

  const saveItem = async (values) => {
    setSubmitted(true);
    let severity = "success";
    let message = "Estado creado correctamente";

    if (Item.idEstado !== 0) {
      const res = await putStatus(values);
      if (res.error) {
        severity = "error";
        message = res.errorMessage;
      } else {
        message = "Estado editado correctamente";
      }
    } else {
      const res = await postStatus(values);
      if (res.error) {
        severity = "error";
        message = res.errorMessage;
      }
    }
    setShow({
      ...show,
      active: true,
      message,
      severity,
    });
    setSubmitted(false);
    getItems();
    setItemDialog(false);
    setItem(emptyItem);
  };

  const editItem = (Item) => {
    setItem({ ...Item });
    setItemDialog(true);
  };

  const deleteItem = async (confirmation) => {
    const { item } = { ...confirmation };
    let severity = "success";
    let message = "Estado eliminado correctamente";
    const res = await deleteStatus(item);
    if (res.error) {
      message = res.errorMessage;
      severity = "error";
    } else {
      getItems();
    }
    setShow({
      ...show,
      severity: severity,
      active: true,
      message: message,
    });
  };

  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <MsjToast show={show} setShow={setShow} />
          <ListHeader title="Estados" toLink={openNew} />

          <DataTable
            value={Items}
            selection={selectedItems}
            onSelectionChange={(e) => setSelectedItems(e.value)}
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Mostrando del {first} al {last} de {totalRecords} registros"
            globalFilter={globalFilter}
            emptyMessage="No hay Estados registrados."
            header={<SearchTable filter={setGlobalFilter} />}
            responsiveLayout="scroll"
            loading={loading}
          >
            <Column
              field="nombre"
              header="Nombre"
              sortable
              headerStyle={{ width: "30%", minWidth: "10rem" }}
            ></Column>

            <Column
              field="permiteUsar"
              header="Permite Usar"
              headerStyle={{ width: "10%", minWidth: "10rem" }}
              body={(rowData) => (
                <CheckBodyTemplate check={rowData.permiteUsar} />
              )}
            ></Column>
            <Column
              field="observaciones"
              header="Observaciones"
              headerStyle={{ width: "40%", minWidth: "10rem" }}
            ></Column>

            <Column
              body={(rowData) => (
                <ButtonsActions
                  idItem={rowData.idEstado}
                  deleteItem={deleteItem}
                  link={editItem}
                  item={rowData}
                />
              )}
              headerStyle={{ width: "20%", minWidth: "10rem" }}
            ></Column>
          </DataTable>

          <Dialog
            visible={ItemDialog}
            style={{ width: "450px" }}
            header="Estados"
            modal
            className="p-fluid"
            onHide={hideDialog}
          >
            <StatusForm
              initialFormValue={Item}
              onSubmit={saveItem}
              loading={submitted}
              onCancel={hideDialog}
            />
          </Dialog>
        </div>
      </div>
    </div>
  );
};

const comparisonFn = function (prevProps, nextProps) {
  return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(Status, comparisonFn);
