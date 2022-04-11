import React from "react";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputCustom from "../formcustom/InputCustom";
import TextareaCustom from "../formcustom/TextareaCustom";
import CheckboxCustom from "../formcustom/CheckboxCustom";

const SectorForm = ({ initialFormValue, onSubmit, loading }) => {
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

          <div className="field col-12 md:col-6">
            <label htmlFor="observaciones">Tamaño</label>
            <InputCustom type="number" name="tamano" rows="5" />
          </div>
          <div className="field col-12 md:col-6">
            <label htmlFor="observaciones">Numero de Sector</label>
            <InputCustom type="number" name="numeroSector" rows="5" />
          </div>
          <div className="field col-12 md:col-6">
            <div className="flex align-items-center">
              <CheckboxCustom name="esSectorGolero" />
              <label htmlFor="rememberme1">Es Sector Golero</label>
            </div>
          </div>
          <div className="field col-12">
            <label htmlFor="observaciones">Observaciones</label>
            <TextareaCustom name="observaciones" rows="5" />
          </div>
        </div>
        <Button
          label="Guardar"
          type="submit"
          className="mr-2 mb-2"
          loading={loading}
        />
        <Link to="/areas">
          <Button label="Volver" className=" p-button-danger mr-2 mb-2" />
        </Link>
      </Form>
    </Formik>
  );
};

export default SectorForm;
