import React from "react";
import { Button } from "primereact/button";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputCustom from "../formcustom/InputCustom";
import TextareaCustom from "../formcustom/TextareaCustom";

const MaterialForm = ({ initialFormValue, onSubmit, loading, onCancel }) => {
  const formSchema = Yup.object().shape({
    nombre: Yup.string()
      .required("Este campo es requerido")
      .max(50, "Nombre debe tener maiximo 50 caracteres "),
    stock: Yup.string().required("Este campo es requerido"),
    maximoPorDia: Yup.string().required("Este campo es requerido"),
  });

  return (
    <Formik
      onSubmit={onSubmit}
      validationSchema={formSchema}
      initialValues={initialFormValue}
    >
      <Form>
        <div className="p-fluid formgrid grid">
          <div className="field col-12">
            <label htmlFor="nombre">Nombre</label>
            <InputCustom name="nombre" />
          </div>
          <div className="field col-12">
            <label htmlFor="stock">Stock</label>
            <InputCustom name="stock" type="number" />
          </div>
          <div className="field col-12">
            <label htmlFor="maximoPorDia">Maximo Por Dia</label>
            <InputCustom name="maximoPorDia" type="number" />
          </div>
          <div className="field col-12 ">
            <label htmlFor="observaciones">Observaciones</label>
            <TextareaCustom name="observaciones" rows="5" />
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

export default MaterialForm;
