import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {
  deleteInstitucion,
  getInstitucions,
} from "../../service/InstitutionService";
import ButtonsOption from "../../components/List/ButtonsActions";
import MsjToast from "../../components/confirmation/MsjToast";
import ListHeader from "../../components/List/ListHeader";
import SearchTable from "../../components/List/SearchTable";

const Institution = () => {
  const [institutions, setInstitutions] = useState([]);
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
    const response = await getInstitucions();
    if (!response.error) setInstitutions(response);

    setLoading1(false);
  };

  const deleteItem = async (displayConfirmation) => {
    const { item } = { ...displayConfirmation };
    const res = await deleteInstitucion(item);
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
          <ListHeader title="Instituciones" toLink="institutions-create" />

          <DataTable
            value={institutions}
            paginator
            className="p-datatable-gridlines"
            showGridlines
            rows={10}
            dataKey="idDatosInstitucionDeportiva"
            loading={loading1}
            responsiveLayout="scroll"
            emptyMessage="No se encontraron datos."
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
            <Column header="Observaciones" field="observaciones" />
            <Column
              header=""
              bodyClassName="text-center"
              style={{ minWidth: "8rem" }}
              body={(rowData) => (
                <ButtonsOption
                  idItem={rowData.idDatosInstitucionDeportiva}
                  deleteItem={deleteItem}
                  link="institutions-edit"
                />
              )}
            />
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default Institution;
