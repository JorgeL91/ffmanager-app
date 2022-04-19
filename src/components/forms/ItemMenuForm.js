import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputCustom from "../formcustom/InputCustom";
import CheckboxCustom from "../formcustom/CheckboxCustom";
import AutocompleteItemCustom from "../formcustom/AutocompleteItemCustom";
import { getMenus } from "../../service/profiles/menusServices";

const ItemMenuForm = ({ initialFormValue, onSubmit, loading }) => {
  const [menus, setMenus] = useState(null);

  useEffect(() => {
    getItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getItems = async () => {
    const res = await getMenus();

    let newItems = [];
    res.forEach((element) => {
      if (element.idItemMenu === parseInt(initialFormValue.idItemMenuPadre)) {
        initialFormValue.nameSuper = element.label;
      }
      if (element.idItemMenu !== initialFormValue.idItemMenu) {
        newItems.push(element);
      }
    });

    setMenus(newItems);
  };

  const formSchema = Yup.object().shape({
    label: Yup.string()
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
          <div className="field col-12 md:col-6">
            <label htmlFor="label">Nombre</label>
            <InputCustom name="label" />
          </div>
          <div className="field col-12 md:col-6">
            <label htmlFor="to">Link</label>
            <InputCustom name="to" />
          </div>
          <div className="field col-12 md:col-6">
            <label htmlFor="icon">Icon</label>
            <InputCustom name="icon" />
          </div>
          <div className="field col-12 md:col-6">
            <label htmlFor="order">Orden</label>
            <InputCustom name="order" type="number" />
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
          {menus && (
            <div className="field col-12 md:col-12">
              <label htmlFor="direction">Menu Padre</label>
              <AutocompleteItemCustom
                name="idItemMenuPadre"
                items={menus}
                field="label"
                labelText={
                  initialFormValue.nameSuper
                    ? initialFormValue.nameSuper
                    : initialFormValue.idItemMenuPadre
                }
              />
            </div>
          )}
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
