import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { deleteUser, getUsers } from "../../service/profiles/usersServices";
import ButtonsOption from "../../components/List/ButtonsActions";
import MsjToast from "../../components/confirmation/MsjToast";
import ListHeader from "../../components/List/ListHeader";
import SearchTable from "../../components/List/SearchTable";

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading1, setLoading1] = useState(true);
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
            loading={loading1}
            responsiveLayout="scroll"
            emptyMessage="No existen datos."
            globalFilter={globalFilter}
            header={<SearchTable filter={setGlobalFilter} />}
          >
            <Column
              field="nombre"
              header="Nombre"
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
