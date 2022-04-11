import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputCustom from "../formcustom/InputCustom";
import { getTypeAreas } from "../../service/TypeAreaServices";
import AutocompleteCustom from "../formcustom/AutocompleteCustom";
import { getConplexes } from "../../service/complexServices";

const AreaForm = ({ initialFormValue, onSubmit, loading }) => {
  const [autoFilteredValue, setAutoFilteredValue] = useState([]);
  const [autoValue, setAutoValue] = useState(null);

  const [autoFilteredValue2, setAutoFilteredValue2] = useState([]);
  const [autoValue2, setAutoValue2] = useState(null);

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    const res = await getTypeAreas();
    setAutoValue(res);
    const complexes = await getConplexes();
    setAutoValue2(complexes);
  };

  const searchText = (event) => {
    setTimeout(() => {
      if (!event.query.trim().length) {
        setAutoFilteredValue([...autoValue]);
      } else {
        setAutoFilteredValue(
          autoValue.filter((item) => {
            return item.nombre
              .toLowerCase()
              .startsWith(event.query.toLowerCase());
          })
        );
      }
    }, 250);
  };

  const searchText2 = (event) => {
    setTimeout(() => {
      if (!event.query.trim().length) {
        setAutoFilteredValue2([...autoValue2]);
      } else {
        setAutoFilteredValue2(
          autoValue2.filter((item) => {
            return item.nombre
              .toLowerCase()
              .startsWith(event.query.toLowerCase());
          })
        );
      }
    }, 250);
  };

  const formSchema = Yup.object().shape({
    nombre: Yup.string()
      .required("Por Favor ingrese un Nombre")
      .max(50, "Nombre debe tener maiximo 50 caracteres "),

    tiposAreas: Yup.object().shape({
      idTipoArea: Yup.string().required("Seleccione un tipo de area"),
    }),
    complejos: Yup.object().shape({
      idComplejo: Yup.string().required("Seleccione un Complejo"),
    }),
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
            <InputCustom name="nombre" />
          </div>
          <div className="field col-12 md:col-6">
            <label htmlFor="observaciones">Observaciones</label>
            <InputCustom name="observaciones" />
          </div>
          <div className="field col-12 md:col-12">
            <label htmlFor="direction">Tipo de area</label>
            <AutocompleteCustom
              name="tiposAreas.idTipoArea"
              suggestions={autoFilteredValue}
              completeMethod={searchText}
              field="nombre"
              labelText={initialFormValue.tiposAreas.nombre}
            />
          </div>
          <div className="field col-12 md:col-12">
            <label htmlFor="direction">Complejo</label>
            <AutocompleteCustom
              name="complejos.idComplejo"
              suggestions={autoFilteredValue2}
              completeMethod={searchText2}
              field="nombre"
              labelText={initialFormValue.complejos.nombre}
            />
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

export default AreaForm;
