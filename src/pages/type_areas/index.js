import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { deleteTypeArea, getTypeAreas } from "../../service/TypeAreaServices";
import ButtonsOption from "../../components/List/ButtonsActions";
import MsjToast from "../../components/confirmation/MsjToast";
import ListHeader from "../../components/List/ListHeader";
import CheckBodyTemplate from "../../components/List/CheckBodyTemplate";
import SearchTable from "../../components/List/SearchTable";

const TypeArea = () => {
  const [TypeAreas, setTypeAreas] = useState([]);
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
    const response = await getTypeAreas();
    if (!response.error) setTypeAreas(response);
    setLoading1(false);
  };

  const deleteItem = async (confirmation) => {
    const { item } = { ...confirmation };

    const res = await deleteTypeArea(item);
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
          <ListHeader title="Tipo de areas" toLink="types-of-areas-create" />

          <DataTable
            value={TypeAreas}
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
              sortable
            />
            <Column header="Direccion" field="descripcion" />
            <Column header="Observaciones" field="observaciones" />
            <Column
              field="esCompuesta"
              header="Compuesta"
              dataType="boolean"
              bodyClassName="text-center"
              style={{ minWidth: "8rem" }}
              body={(rowData) => (
                <CheckBodyTemplate check={rowData.esCompuesta} />
              )}
            />
            <Column
              field="esTechada"
              header="Techada"
              dataType="boolean"
              bodyClassName="text-center"
              style={{ minWidth: "8rem" }}
              body={(rowData) => (
                <CheckBodyTemplate check={rowData.esTechada} />
              )}
            />
            <Column
              header=""
              bodyClassName="text-center"
              style={{ minWidth: "8rem" }}
              body={(rowData) => (
                <ButtonsOption
                  idItem={rowData.idTipoArea}
                  deleteItem={deleteItem}
                  link="types-of-areas-edit"
                />
              )}
            />
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default TypeArea;
