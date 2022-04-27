import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getConplexes, deleteConplex } from "../../service/complexServices";
import ButtonsOption from "../../components/List/ButtonsActions";
import MsjToast from "../../components/confirmation/MsjToast";
import ListHeader from "../../components/List/ListHeader";
import SearchTable from "../../components/List/SearchTable";

const Complex = () => {
  const [complexes, setComplexes] = useState([]);
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
    const response = await getConplexes();
    if (!response.error) setComplexes(response);
    setLoading1(false);
  };

  const deleteItem = async (confirmation) => {
    const { item } = { ...confirmation };
    const res = await deleteConplex(item);
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
          <ListHeader title="Complejos" toLink="complex-create" />

          <DataTable
            value={complexes}
            paginator
            className="p-datatable-gridlines"
            showGridlines
            rows={10}
            dataKey="idComplejo"
            loading={loading1}
            responsiveLayout="scroll"
            emptyMessage="No existen complejos a mostrar."
            globalFilter={globalFilter}
            header={<SearchTable filter={setGlobalFilter} />}
          >
            <Column
              field="nombre"
              header="Nombre"
              style={{ minWidth: "12rem" }}
            />
            <Column header="Direccion" field="direccion" />
            <Column header="Telefono" field="telefonoContacto" />
            <Column
              header="Intitucion"
              field="datosInstitucionDeportiva.nombre"
            />
            <Column
              header=""
              bodyClassName="text-center"
              style={{ minWidth: "8rem" }}
              body={(rowData) => (
                <ButtonsOption
                  idItem={rowData.idComplejo}
                  deleteItem={deleteItem}
                  link="complex-edit"
                />
              )}
            />
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default Complex;
