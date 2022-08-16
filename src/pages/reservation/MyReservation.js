import React, { useState } from "react";
import MsjToast from "../../components/confirmation/MsjToast";
import moment from "moment";
import {
  deleteReservation,
  getReservationXUser,
} from "../../service/reserva/reservaService";
import DateBookingForm from "../../components/reservation/DateBookingForm";
import useToken from "../../hooks/useToken";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import SearchTable from "../../components/List/SearchTable";
import BtnDelete from "../../components/confirmation/BtnDelete";

const MyReservation = () => {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);

  const [show, setShow] = useState({
    active: false,
    severity: "error",
    message: "",
  });

  const { token } = useToken();
  const { isAdmin, idUsuario } = token;

  const getItems = async (startDate, endDate) => {
    setLoading(true);
    const res = await getReservationXUser(
      startDate,
      endDate,
      isAdmin ? 0 : idUsuario
    );
    setLoading(false);
    if (!res.error) {
      setAreas(Object.values(res)[0]);
    } else {
      // setShow({
      //   severity: "error",
      //   active: true,
      //   message: res.errorMessage,
      // });
    }
  };

  const dateBodyTemplate = (date) => {
    return moment(date).format("YYYY-MM-DD HH:mm");
  };

  // const countBodyTemplate = (list) => {
  //   return list.length;
  // };

  const cancelReservation = async (confirmation) => {
    const { item } = { ...confirmation };
    let severity = "success";
    let message = "Reserva Cancelada correctamente";
    const res = await deleteReservation(item);
    if (res.error) {
      message = res.errorMessage;
      severity = "error";
    } else {
      window.location.reload(false);
    }
    setShow({
      ...show,
      severity: severity,
      active: true,
      message: message,
    });
  };

  return (
    <>
      <MsjToast show={show} setShow={setShow} />
      <DateBookingForm
        getItems={getItems}
        loading={loading}
        setShow={setShow}
      />
      <DataTable
        value={areas}
        dataKey="id"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        className="datatable-responsive"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Mostrando del {first} al {last} de {totalRecords} registros"
        globalFilter={globalFilter}
        emptyMessage="No hay Reservas registrados."
        header={<SearchTable filter={setGlobalFilter} />}
        responsiveLayout="scroll"
        loading={loading}
      >
        <Column
          field="fechaDesde"
          header="Fecha Desde"
          sortable
          headerStyle={{ width: "30%", minWidth: "10rem" }}
          body={(rowData) => dateBodyTemplate(rowData.fechaDesde)}
        ></Column>

        <Column
          field="fechaHasta"
          header="Fecha Hasta"
          sortable
          headerStyle={{ width: "20%", minWidth: "10rem" }}
          body={(rowData) => dateBodyTemplate(rowData.fechaHasta)}
        ></Column>

        {/* <Column
          header="Actividades"
          headerStyle={{ width: "10%", minWidth: "10rem" }}
          body={(rowData) => countBodyTemplate(rowData.actividadesDeReserva)}
        ></Column>

        <Column
          header="Materiales"
          headerStyle={{ width: "10%", minWidth: "10rem" }}
          body={(rowData) => countBodyTemplate(rowData.materialesDeReserva)}
        ></Column> */}
        <Column
          field="usuarios.usuario"
          header="Usuario"
          headerStyle={{ width: "20%", minWidth: "10rem" }}
        ></Column>
        <Column
          body={(rowData) => (
            <BtnDelete
              item={rowData.idReserva}
              onConfirmation={cancelReservation}
            />
          )}
          headerStyle={{ width: "20%", minWidth: "10rem" }}
        ></Column>
      </DataTable>
    </>
  );
};

export default MyReservation;
