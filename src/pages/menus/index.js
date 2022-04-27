import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { deleteMenu, getMenus } from "../../service/profiles/menusServices";
import CheckBodyTemplate from "../../components/List/CheckBodyTemplate";
import ButtonsOption from "../../components/List/ButtonsActions";
import MsjToast from "../../components/confirmation/MsjToast";
import ListHeader from "../../components/List/ListHeader";
import SearchTable from "../../components/List/SearchTable";

const Menu = () => {
  const [menus, setMenus] = useState([]);
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
    const response = await getMenus();
    if (!response.error) setMenus(response);
    setLoading1(false);
  };

  const deleteItem = async (confirmation) => {
    const { item } = { ...confirmation };

    const res = await deleteMenu(item);
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
          <ListHeader title="Items de menu" toLink="menu-create" />

          <DataTable
            value={menus}
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
              field="label"
              header="Nombre"
              style={{ minWidth: "12rem" }}
            />
            <Column header="Link" field="to" />
            <Column
              field="esHoja"
              header="Hoja"
              dataType="boolean"
              bodyClassName="text-center"
              style={{ minWidth: "8rem" }}
              body={(rowData) => <CheckBodyTemplate check={rowData.esHoja} />}
            />
            <Column
              field="esRaiz"
              header="Raiz"
              dataType="boolean"
              bodyClassName="text-center"
              style={{ minWidth: "8rem" }}
              body={(rowData) => <CheckBodyTemplate check={rowData.esRaiz} />}
            />
            <Column
              header=""
              bodyClassName="text-center"
              style={{ minWidth: "8rem" }}
              body={(rowData) => (
                <ButtonsOption
                  idItem={rowData.idItemMenu}
                  deleteItem={deleteItem}
                  link="menu-edit"
                />
              )}
            />
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default Menu;
