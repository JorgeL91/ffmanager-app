import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputCustom from "../formcustom/InputCustom";
import { getTypeAreas } from "../../service/TypeAreaServices";
import { getConplexes } from "../../service/complexServices";
import AutocompleteItemCustom from "../formcustom/AutocompleteItemCustom";

const AreaForm = ({ initialFormValue, onSubmit, loading }) => {
  const [typeAreas, setTypeAreas] = useState(null);
  const [complexes, setComplexes] = useState(null);

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    const res = await getTypeAreas();
    setTypeAreas(res);
    const res2 = await getConplexes();
    setComplexes(res2);
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
            <AutocompleteItemCustom
              name="tiposAreas.idTipoArea"
              items={typeAreas}
              field="nombre"
              labelText={initialFormValue.tiposAreas.nombre}
            />
          </div>
          <div className="field col-12 md:col-12">
            <label htmlFor="direction">Complejo</label>
            <AutocompleteItemCustom
              name="complejos.idComplejo"
              items={complexes}
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
