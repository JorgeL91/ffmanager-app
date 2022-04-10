import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import InputCustom from "../shared/InputCustom";
import TextareaCustom from "../shared/TextareaCustom";

const InstitutionForm = ({ initialFormValue, onSubmit }) => {
  const formSchema = Yup.object().shape({
    nombre: Yup.string()
      .required("Por Favor ingrese un Nombre")
      .max(50, "Nombre debe tener maiximo 50 caracteres "),
    direccion: Yup.string()
      .required("Por Favor ingrese un telefono")
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
          <div className="field col-12 md:col-6">
            <label htmlFor="nombre">Nombre</label>
            <InputCustom name="nombre" placeholder="Los tigres" />
          </div>
          <div className="field col-12 md:col-6">
            <label htmlFor="telefonoContacto">Telefono</label>
            <InputCustom name="telefonoContacto" placeholder="312 00 0000 0" />
          </div>

          <div className="field col-12 md:col-12">
            <label htmlFor="direccion">Direccion</label>
            <InputCustom name="direccion" placeholder="Calle 12 # 4 -6" />
          </div>
          <div className="field col-12">
            <label htmlFor="observaciones">Observaciones</label>
            <TextareaCustom
              name="observaciones"
              rows="5"
              placeholder="Creado por el admin"
            />
          </div>
        </div>
        <Button label="Guardar" type="submit" className="mr-2 mb-2" />
        <Link to="/institutions">
          <Button label="Volver" className=" p-button-danger mr-2 mb-2" />
        </Link>
      </Form>
    </Formik>
  );
};

export default InstitutionForm;
