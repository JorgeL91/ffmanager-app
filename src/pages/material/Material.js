import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import {
  deleteMaterial,
  getMaterials,
  postMaterial,
  putMaterial,
} from "../../service/general/materialsServices";
import MsjToast from "../../components/confirmation/MsjToast";
import MaterialForm from "../../components/forms/MaterialForm";
import BtnDelete from "../../components/confirmation/BtnDelete";

const Material = () => {
  let emptyProduct = {
    idMaterial: 0,
    nombre: "",
    stock: "",
    maximoPorDia: "",
    observaciones: "",
  };

  const [products, setProducts] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [show, setShow] = useState({
    active: false,
    severity: "error",
    message: "",
  });

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    const res = await getMaterials();
    if (!res.error) setProducts(res);
  };

  const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const saveProduct = async (values) => {
    setSubmitted(true);
    let severity = "success";
    let message = "Material creado correctamente";

    if (product.idMaterial !== 0) {
      const res = await putMaterial(values);
      if (res.error) {
        severity = "error";
        message = res.errorMessage;
      } else {
        message = "Material editado correctamente";
      }
    } else {
      const res = await postMaterial(values);
      if (res.error) {
        severity = "error";
        message = res.errorMessage;
      }
    }
    setShow({
      ...show,
      active: true,
      message,
      severity,
    });
    setSubmitted(false);
    getItems();
    setProductDialog(false);
    setProduct(emptyProduct);
  };

  const editProduct = (product) => {
    setProduct({ ...product });
    setProductDialog(true);
  };

  const deleteItem = async (confirmation) => {
    const { item } = { ...confirmation };
    let severity = "success";
    let message = "Material eliminado correctamente";
    const res = await deleteMaterial(item);
    if (res.error) {
      message = res.errorMessage;
      severity = "error";
    } else {
      getItems();
    }
    setShow({
      ...show,
      severity: severity,
      active: true,
      message: message,
    });
  };
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => editProduct(rowData)}
        />

        <BtnDelete item={rowData.idMaterial} onConfirmation={deleteItem} />
      </div>
    );
  };

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <span className="block mt-2 md:mt-0 p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );

  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <div className="grid ">
            <div className="col-6">
              <MsjToast show={show} setShow={setShow} />
              <h5>Materiales</h5>
            </div>
            <div className="col-6 text-right ">
              <Button
                icon="pi pi-plus"
                label="Nuevo Registro"
                className="mr-2 mb-2"
                onClick={openNew}
              />
            </div>
          </div>

          <DataTable
            value={products}
            selection={selectedProducts}
            onSelectionChange={(e) => setSelectedProducts(e.value)}
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Mostrando del {first} al {last} de {totalRecords} registros"
            globalFilter={globalFilter}
            emptyMessage="No hay materiales registrados."
            header={header}
            responsiveLayout="scroll"
          >
            <Column
              field="nombre"
              header="Nombre"
              sortable
              headerStyle={{ width: "14%", minWidth: "10rem" }}
            ></Column>
            <Column
              field="stock"
              header="Stock"
              sortable
              headerStyle={{ width: "14%", minWidth: "10rem" }}
            ></Column>

            <Column
              field="maximoPorDia"
              header="Maximo Por Dia"
              headerStyle={{ width: "14%", minWidth: "10rem" }}
            ></Column>
            <Column
              field="observaciones"
              header="Observaciones"
              headerStyle={{ width: "14%", minWidth: "10rem" }}
            ></Column>

            <Column body={actionBodyTemplate}></Column>
          </DataTable>

          <Dialog
            visible={productDialog}
            style={{ width: "450px" }}
            header="Materiales"
            modal
            className="p-fluid"
            onHide={hideDialog}
          >
            <MaterialForm
              initialFormValue={product}
              onSubmit={saveProduct}
              loading={submitted}
              onCancel={hideDialog}
            />
          </Dialog>
        </div>
      </div>
    </div>
  );
};

const comparisonFn = function (prevProps, nextProps) {
  return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(Material, comparisonFn);
