import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import MsjToast from "../../components/confirmation/MsjToast";
import ButtonsActions from "../../components/List/ButtonsActions";
import ListHeader from "../../components/List/ListHeader";
import CheckBodyTemplate from "../../components/List/CheckBodyTemplate";
import {
  deletePerfil,
  getPerfiles,
  postPerfil,
  putPerfil,
} from "../../service/profiles/profilesServices";
import ProfileForm from "../../components/forms/ProfileForm";

const Status = () => {
  let emptyItem = {
    idPerfil: 0,
    nombre: "",
    esAdmin: false,
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
    const res = await getPerfiles();
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
    let message = "Perfil creado correctamente";

    if (Item.idPerfil !== 0) {
      const res = await putPerfil(values);
      if (res.error) {
        severity = "error";
        message = res.errorMessage;
      } else {
        message = "Perfil editado correctamente";
      }
    } else {
      const res = await postPerfil(values);
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
    let message = "Perfil eliminado correctamente";
    const res = await deletePerfil(item);
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
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <MsjToast show={show} setShow={setShow} />
          <ListHeader title="Perfiles" toLink={openNew} />

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
            emptyMessage="No hay Perfiles registrados."
            header={header}
            responsiveLayout="scroll"
            loading={loading}
          >
            <Column
              field="nombre"
              header="Nombre"
              sortable
              headerStyle={{ width: "60%", minWidth: "10rem" }}
            ></Column>

            <Column
              field="esAdmin"
              header="Es Admin"
              headerStyle={{ width: "20%", minWidth: "10rem" }}
              body={(rowData) => <CheckBodyTemplate check={rowData.esAdmin} />}
            ></Column>

            <Column
              body={(rowData) => (
                <ButtonsActions
                  idItem={rowData.idPerfil}
                  deleteItem={deleteItem}
                  link="profile-edit"
                  // item={rowData}
                />
              )}
              headerStyle={{ width: "20%", minWidth: "10rem" }}
            ></Column>
          </DataTable>
          {/* 
          <ButtonsOption
                  idItem={rowData.idUsuario}
                  deleteItem={deleteItem}
                  link="user-edit"
                /> */}

          <Dialog
            visible={ItemDialog}
            style={{ width: "450px" }}
            header="Perfiles"
            modal
            className="p-fluid"
            onHide={hideDialog}
          >
            <ProfileForm
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
