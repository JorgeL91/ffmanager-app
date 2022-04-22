import React from "react";
import { Button } from "primereact/button";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputCustom from "../formcustom/InputCustom";

const JobForm = ({ initialFormValue, onSubmit, loading, onCancel }) => {
  const formSchema = Yup.object().shape({
    nombre: Yup.string()
      .required("Por Favor ingrese un Nombre")
      .max(50, "Nombre debe tener maiximo 50 caracteres "),
  });

  return (
    <Formik
      onSubmit={onSubmit}
      validationSchema={formSchema}
      initialValues={initialFormValue}
    >
      <Form>
        <div className="p-fluid formgrid grid">
          <div className="field col-12 ">
            <label htmlFor="nombre">Nombre</label>
            <InputCustom name="nombre" />
          </div>
        </div>
        <div className="p-dialog-footer  m-0 p-0">
          <Button
            icon="pi pi-times"
            type="button"
            label="Cancelar"
            className=" p-button-danger mr-2 mb-2"
            onClick={() => onCancel()}
          />
          <Button
            icon="pi pi-check"
            label="Guardar"
            type="submit"
            className="mr-2 mb-2"
            loading={loading}
          />
        </div>
      </Form>
    </Formik>
  );
};

export default JobForm;
