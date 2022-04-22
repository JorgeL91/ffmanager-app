import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { deleteUser, getUsers } from "../../service/profiles/usersServices";
import ButtonsOption from "../../components/List/ButtonsActions";
import MsjToast from "../../components/confirmation/MsjToast";
import ListHeader from "../../components/List/ListHeader";

const User = () => {
  const [users, setUsers] = useState([]);
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
    const response = await getUsers();
    if (!response.error) setUsers(response);
    setLoading1(false);
  };

  const deleteItem = async (confirmation) => {
    const { item } = { ...confirmation };

    const res = await deleteUser(item);
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

  return (
    <div className="grid table-demo">
      <div className="col-12">
        <div className="card">
          <MsjToast show={show} setShow={setShow} />
          <ListHeader title="Usuarios" toLink="user-create" />

          <DataTable
            value={users}
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
            <Column header="Usuario" field="usuario" />
            <Column header="Email" field="email" />
            <Column header="Pefil" field="perfiles.nombre" />

            <Column
              header=""
              bodyClassName="text-center"
              style={{ minWidth: "8rem" }}
              body={(rowData) => (
                <ButtonsOption
                  idItem={rowData.idUsuario}
                  deleteItem={deleteItem}
                  link="user-edit"
                />
              )}
            />
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default User;
