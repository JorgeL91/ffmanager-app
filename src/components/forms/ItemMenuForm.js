import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputCustom from "../formcustom/InputCustom";
import CheckboxCustom from "../formcustom/CheckboxCustom";
import AutocompleteCustom from "../formcustom/AutocompleteCustom";
import { getMenus } from "../../service/profiles/menusServices";

const ItemMenuForm = ({ initialFormValue, onSubmit, loading }) => {
  const [autoFilteredValue, setAutoFilteredValue] = useState([]);
  const [autoValue, setAutoValue] = useState(null);

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    const res = await getMenus();
    setAutoValue(res);
  };

  const formSchema = Yup.object().shape({
    nombre: Yup.string()
      .required("Por Favor ingrese un Nombre")
      .max(50, "Nombre debe tener maiximo 50 caracteres "),
  });

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
            <label htmlFor="link">Link</label>
            <InputCustom name="link" />
          </div>

          <div className="field col-12 md:col-6">
            <div className="flex align-items-center">
              <CheckboxCustom name="esHoja" />
              <label>Es Hoja</label>
            </div>
          </div>
          <div className="field col-12 md:col-6">
            <div className="flex align-items-center">
              <CheckboxCustom name="esRaiz" />
              <label>Es Raiz</label>
            </div>
          </div>
          <div className="field col-12 md:col-12">
            <label htmlFor="direction">Menu Padre</label>
            <AutocompleteCustom
              name="idItemMenuPadre"
              suggestions={autoFilteredValue}
              completeMethod={searchText}
              field="nombre"
              labelText={initialFormValue.idItemMenuPadre}
            />
          </div>
        </div>
        <Button
          label="Guardar"
          type="submit"
          className="mr-2 mb-2"
          loading={loading}
        />
        <Link to="/menus">
          <Button label="Volver" className=" p-button-danger mr-2 mb-2" />
        </Link>
      </Form>
    </Formik>
  );
};

export default ItemMenuForm;
