import React, { useState } from "react";
import InstitutionForm from "../../components/institutions/InstitutionForm";
import { useHistory } from "react-router-dom";
import { postInstitucion } from "../../service/InstitutionService";
import MsjToast from "../../components/confirmation/MsjToast";

const InstitutionCreate = () => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState({
    active: false,
    severity: "error",
    message: "",
  });

  const history = useHistory();

  const initialFormValue = {
    nombre: "",
    direccion: "",
    telefonoContacto: "",
    observaciones: "",
  };

  const onSubmit = async (values) => {
    setLoading(true);
    const res = await postInstitucion(values);
    if (res.error) {
      setShow({
        ...show,
        active: true,
        message: res.errorMessage,
      });
    } else {
      history.push("/institutions");
    }
    setLoading(false);
  };

  return (
    <div className="col-12">
      <div className="card">
        <MsjToast show={show} setShow={setShow} />
        <h5>Crear Intitucion</h5>
        <InstitutionForm
          initialFormValue={initialFormValue}
          onSubmit={onSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default InstitutionCreate;
