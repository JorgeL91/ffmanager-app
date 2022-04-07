import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Button } from "primereact/button";
import { getInstitucions } from "../../service/InstitutionService";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const Institution = () => {
  const [institutions, setInstitutions] = useState([]);
  const [filters1, setFilters1] = useState(null);
  const [loading1, setLoading1] = useState(true);
  const [lstSotorage, setStorage] = useLocalStorage("intitutions", []);

  const initFilters1 = () => {
    setFilters1({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      nombre: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      direccion: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      "country.name": {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      representative: { value: null, matchMode: FilterMatchMode.IN },
      date: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
      },
      balance: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },

      activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
      verified: { value: null, matchMode: FilterMatchMode.EQUALS },
    });
  };

  useEffect(async () => {
    setLoading1(true);

    const response = await getInstitucions();
    setInstitutions(response);
    setLoading1(false);

    initFilters1();
  }, []); // eslint-disable-next-line

  const verifiedBodyTemplate = (rowData) => {
    return (
      <Link to={`institutions-edit/${rowData.id}`}>
        <i className="pi pi-clone"></i>
      </Link>
    );
  };

  return (
    <div className="grid table-demo">
      <div className="col-12">
        <div className="card">
          <div className="grid ">
            <div className="col-6">
              <h5>Instituciones</h5>
            </div>
            <div className="col-6 text-right ">
              <Link to="institutions-create" className="btn btn-primary">
                <Button label="Nuevo Registro" className="mr-2 mb-2" />
              </Link>
            </div>
          </div>

          <DataTable
            value={lstSotorage}
            paginator
            className="p-datatable-gridlines"
            showGridlines
            rows={10}
            dataKey="id"
            filters={filters1}
            filterDisplay="menu"
            loading={loading1}
            responsiveLayout="scroll"
            emptyMessage="No customers found."
          >
            <Column
              field="name"
              header="Nombre"
              filter
              filterPlaceholder="Search by name"
              style={{ minWidth: "12rem" }}
            />
            <Column header="Direccion" field="direction" />
            <Column header="Telefono" field="phone" />
            <Column header="Observaciones" field="observation" />
            <Column
              header=""
              bodyClassName="text-center"
              style={{ minWidth: "8rem" }}
              body={verifiedBodyTemplate}
              // filter
              // filterElement={verifiedFilterTemplate}
            />
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default Institution;
