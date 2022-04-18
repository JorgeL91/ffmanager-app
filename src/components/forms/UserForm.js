import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputCustom from "../formcustom/InputCustom";
import { getJobs } from "../../service/profiles/jobsServices";
import AutocompleteItemCustom from "../formcustom/AutocompleteItemCustom";
import { getPerfiles } from "../../service/profiles/profilesServices";

const UserForm = ({ initialFormValue, onSubmit, loading }) => {
  const [jobs, setJobs] = useState([]);
  const [profiles, setProfiles] = useState(null);

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    const res = await getJobs();
    const pro = await getPerfiles();
    setJobs(res);
    setProfiles(pro);
  };

  return (
    <Formik
      onSubmit={onSubmit}
      validationSchema={registerSchema()}
      initialValues={initialFormValue}
    >
      <Form>
        <div className="p-fluid formgrid grid">
          <div className="field col-12 md:col-6">
            <label htmlFor="nombre">Nombre</label>
            <InputCustom name="nombre" />
          </div>
          <div className="field col-12 md:col-6">
            <label htmlFor="apellido">Apellido</label>
            <InputCustom name="apellido" />
          </div>

          <div className="field col-12 md:col-6">
            <label htmlFor="email">Email</label>
            <InputCustom name="email" type="email" />
          </div>
          <div className="field col-12 md:col-6">
            <label htmlFor="telefono">Telefono</label>
            <InputCustom name="telefono" />
          </div>
          <div className="field col-12 md:col-6">
            <label htmlFor="usuario">Usuario</label>
            <InputCustom name="usuario" />
          </div>

          <div className="field col-12 md:col-6">
            <label htmlFor="password">Contraseña</label>
            <InputCustom name="password" type="password" autoComplete="off" />
          </div>

          <div className="field col-12 md:col-6">
            <label htmlFor="direction">Cargo</label>
            <AutocompleteItemCustom
              name="cargos.idCargo"
              items={jobs}
              field="nombre"
              labelText={initialFormValue.cargos.nombre}
            />
          </div>

          <div className="field col-12 md:col-6">
            <label htmlFor="direction">Cargo</label>
            <AutocompleteItemCustom
              items={profiles}
              name="perfiles.idPerfil"
              field="nombre"
              labelText={initialFormValue.perfiles.nombre}
            />
          </div>
        </div>
        <Button
          label="Guardar"
          type="submit"
          className="mr-2 mb-2"
          loading={loading}
        />
        <Link to="/users">
          <Button label="Volver" className=" p-button-danger mr-2 mb-2" />
        </Link>
      </Form>
    </Formik>
  );
};

export default UserForm;

function registerSchema() {
  return Yup.object().shape({
    usuario: Yup.string()
      .required("Por Favor ingrese un Nombre")
      .max(50, "Nombre debe tener maiximo 50 caracteres "),
    nombre: Yup.string()
      .required("Por Favor ingrese un Nombre")
      .max(50, "Nombre debe tener maiximo 50 caracteres "),
    apellido: Yup.string()
      .required("Por Favor ingrese un Nombre")
      .max(50, "Nombre debe tener maiximo 50 caracteres "),
    password: Yup.string()
      .required("Por Favor ingrese una contraseña")
      .min(6, "Ingrese minimo 6 caracteres")
      .max(50, "Nombre debe tener maiximo 50 caracteres "),
    cargos: Yup.object().shape({
      idCargo: Yup.string().required("Seleccione una cargo"),
    }),
    perfiles: Yup.object().shape({
      idPerfil: Yup.string().required("Seleccione un perfil"),
    }),
    email: Yup.string().email("Email invalido"),
  });
}
