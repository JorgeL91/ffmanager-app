import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import {
  deletePerfil,
  getPerfiles,
} from "../../service/profiles/profilesServices";
import { classNames } from "primereact/utils";
import ButtonsOption from "../../components/List/ButtonsActions";
import MsjToast from "../../components/confirmation/MsjToast";
import ListHeader from "../../components/List/ListHeader";

const Profiile = () => {
  const [profiles, setProfiles] = useState([]);
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
    const response = await getPerfiles();
    if (!response.error) setProfiles(response);
    setLoading1(false);
  };

  const deleteItem = async (confirmation) => {
    const { item } = { ...confirmation };

    const res = await deletePerfil(item);
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
          <MsjToast show={show} setShow={setShow} />
          <ListHeader title="Perfiles" toLink="profile-create" />

          <DataTable
            value={profiles}
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

            <Column
              field="esAdmin"
              header="Administrador"
              dataType="boolean"
              bodyClassName="text-center"
              style={{ minWidth: "8rem" }}
              body={(rowData) => checkBodyTemplate(rowData.esAdmin)}
            />
            <Column
              header=""
              bodyClassName="text-center"
              style={{ minWidth: "8rem" }}
              body={(rowData) => (
                <ButtonsOption
                  idItem={rowData.idPerfil}
                  deleteItem={deleteItem}
                  link="profile-edit"
                />
              )}
            />
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default Profiile;
