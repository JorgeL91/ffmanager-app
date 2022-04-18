import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { deleteJob, getJobs } from "../../service/profiles/jobsServices";
import BtnDelete from "../../components/confirmation/BtnDelete";
import MsjToast from "../../components/confirmation/MsjToast";

const Job = () => {
  const [jobs, setjobs] = useState([]);
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
    const response = await getJobs();
    if (!response.error) setjobs(response);
    setLoading1(false);
  };

  const verifiedBodyTemplate = (rowData) => {
    return (
      <>
        <Link to={`job-edit/${rowData.idCargo}`}>
          <Button icon="pi pi-clone" style={{ marginRight: ".5em" }} />
        </Link>

        <BtnDelete item={rowData.idCargo} onConfirmation={deleteItem} />
      </>
    );
  };

  const deleteItem = async (confirmation) => {
    const { item } = { ...confirmation };

    const res = await deleteJob(item);
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
          <div className="grid ">
            <div className="col-6">
              <MsjToast show={show} setShow={setShow} />
              <h5>Cargos</h5>
            </div>
            <div className="col-6 text-right ">
              <Link to="job-create" className="btn btn-success">
                <Button
                  icon="pi pi-plus"
                  label="Nuevo Registro"
                  className="mr-2 mb-2"
                />
              </Link>
            </div>
          </div>

          <DataTable
            value={jobs}
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
              header=""
              bodyClassName="text-center"
              style={{ minWidth: "8rem" }}
              body={verifiedBodyTemplate}
            />
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default Job;
