import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import InputCustom from "../shared/InputCustom";
import TextareaCustom from "../shared/TextareaCustom";
import { AutoComplete } from "primereact/autocomplete";
import { Dropdown } from "primereact/dropdown";

import { useLocalStorage } from "../../hooks/useLocalStorage";

const ComplexForm = ({ initialFormValue, onSubmit }) => {
  const [selectedAutoValue, setSelectedAutoValue] = useState(null);
  const [autoFilteredValue, setAutoFilteredValue] = useState([]);
  const [lstSotorage, setStorage] = useLocalStorage("intitutions", []);
  const [autoValue, setAutoValue] = useState(null);

  useEffect(() => {
    setAutoValue(lstSotorage);
  }, []);

  const searchCountry = (event) => {
    setTimeout(() => {
      if (!event.query.trim().length) {
        setAutoFilteredValue([...autoValue]);
      } else {
        setAutoFilteredValue(
          autoValue.filter((country) => {
            return country.name
              .toLowerCase()
              .startsWith(event.query.toLowerCase());
          })
        );
      }
    }, 250);
  };

  const formSchema = Yup.object().shape({
    name: Yup.string()
      .required("Por Favor ingrese un Nombre")
      .max(50, "Nombre debe tener maiximo 50 caracteres "),
    direction: Yup.string()
      .required("Por Favor ingrese un telefono")
      .max(50, "Nombre debe tener maiximo 50 caracteres "),
    phone: Yup.string()
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
            <label htmlFor="name">Nombre</label>
            <InputCustom name="name" placeholder="Los tigres" />
          </div>
          <div className="field col-12 md:col-6">
            <label htmlFor="phone">Telefono</label>
            <InputCustom name="phone" placeholder="312 00 0000 0" />
          </div>

          <div className="field col-12 md:col-12">
            <label htmlFor="direction">Direccion</label>
            <InputCustom name="direction" placeholder="Calle 12 # 4 -6" />
          </div>
          <div className="field col-12 md:col-12">
            <label htmlFor="direction">Instutucion</label>
            <AutoComplete
              placeholder="Search"
              id="dd"
              dropdown
              value={selectedAutoValue}
              onChange={(e) => setSelectedAutoValue(e.value)}
              suggestions={autoFilteredValue}
              completeMethod={searchCountry}
              field="name"
            />
          </div>
        </div>
        <Button label="Guardar" type="submit" className="mr-2 mb-2" />
        <Link to="/complexes">
          <Button label="Volver" className=" p-button-danger mr-2 mb-2" />
        </Link>
      </Form>
    </Formik>
  );
};

export default ComplexForm;
