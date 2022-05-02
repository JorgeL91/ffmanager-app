import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { getStatus } from "../../service/general/statusServices";
import AutocompleteItemCustom from "../formcustom/AutocompleteItemCustom";

const AssignSectorStatusForm = ({
  formStatus,
  onSubmit,
  loading,
  onCancel,
}) => {
  const [status, setStatus] = useState([]);

  const formSchema = Yup.object().shape({
    idEstado: Yup.string().required("Por Favor seleccione un estado"),
  });

  useEffect(() => {
    getItemsStatus();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getItemsStatus = async () => {
    const res = await getStatus();
    setStatus(res);
  };

  return (
    <Formik
      onSubmit={onSubmit}
      validationSchema={formSchema}
      initialValues={formStatus}
    >
      <Form>
        <div className="p-fluid formgrid grid">
          <div className="field col-12 ">
            <label>Estados</label>
            <AutocompleteItemCustom
              name="idEstado"
              items={status}
              field="nombre"
              labelText={formStatus.nombre}
            />
          </div>
        </div>
        <div className="p-dialog-footer  m-0 p-0 mt-3">
          <Button
            label="Guardar"
            type="subnit"
            className="mr-2 mb-2"
            loading={loading}
          />
          <Button
            type="button"
            label="Cancelar"
            className=" p-button-danger mr-2 mb-2"
            onClick={() => onCancel(false)}
          />
        </div>
      </Form>
    </Formik>
  );
};

export default AssignSectorStatusForm;
