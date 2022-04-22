import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import MsjToast from "../../components/confirmation/MsjToast";
import ActivityForm from "../../components/forms/ActivityForm";
import ButtonsActions from "../../components/List/ButtonsActions";
import ListHeader from "../../components/List/ListHeader";
import {
  deleteActivity,
  getActivities,
  postActivity,
  putActivity,
} from "../../service/general/activitiesServices";

const Activity = () => {
  let emptyActivity = {
    idActividad: 0,
    nombre: "",
    duracion: "",
    observaciones: "",
  };

  const [Activities, setActivities] = useState(null);
  const [ActivityDialog, setActivityDialog] = useState(false);
  const [Activity, setActivity] = useState(emptyActivity);
  const [selectedActivities, setSelectedActivities] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [show, setShow] = useState({
    active: false,
    severity: "error",
    message: "",
  });

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    const res = await getActivities();
    if (!res.error) setActivities(res);
  };

  const openNew = () => {
    setActivity(emptyActivity);
    setSubmitted(false);
    setActivityDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setActivityDialog(false);
  };

  const saveActivity = async (values) => {
    setSubmitted(true);
    let severity = "success";
    let message = "Actividad creado correctamente";

    if (Activity.idActividad !== 0) {
      const res = await putActivity(values);
      if (res.error) {
        severity = "error";
        message = res.errorMessage;
      } else {
        message = "Actividad editado correctamente";
      }
    } else {
      const res = await postActivity(values);
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
    setActivityDialog(false);
    setActivity(emptyActivity);
  };

  const editActivity = (Activity) => {
    setActivity({ ...Activity });
    setActivityDialog(true);
  };

  const deleteItem = async (confirmation) => {
    const { item } = { ...confirmation };
    let severity = "success";
    let message = "Actividad eliminado correctamente";
    const res = await deleteActivity(item);
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
          <ListHeader title="Actividades" toLink={openNew} />

          <DataTable
            value={Activities}
            selection={selectedActivities}
            onSelectionChange={(e) => setSelectedActivities(e.value)}
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Mostrando del {first} al {last} de {totalRecords} registros"
            globalFilter={globalFilter}
            emptyMessage="No hay Actividades registrados."
            header={header}
            responsiveLayout="scroll"
          >
            <Column
              field="nombre"
              header="Nombre"
              sortable
              headerStyle={{ width: "30%", minWidth: "10rem" }}
            ></Column>
            <Column
              field="duracion"
              header="Duracion"
              sortable
              headerStyle={{ width: "20%", minWidth: "10rem" }}
            ></Column>

            <Column
              field="observaciones"
              header="Observaciones"
              headerStyle={{ width: "30%", minWidth: "10rem" }}
            ></Column>

            <Column
              headerStyle={{ width: "20%", minWidth: "10rem" }}
              body={(rowData) => (
                <ButtonsActions
                  idItem={rowData.idActividad}
                  deleteItem={deleteItem}
                  link={editActivity}
                  item={rowData}
                />
              )}
            ></Column>
          </DataTable>

          <Dialog
            visible={ActivityDialog}
            style={{ width: "450px" }}
            header="Actividades"
            modal
            className="p-fluid"
            onHide={hideDialog}
          >
            <ActivityForm
              initialFormValue={Activity}
              onSubmit={saveActivity}
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

export default React.memo(Activity, comparisonFn);
