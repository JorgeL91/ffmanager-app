import React, { useState } from "react";
import InstitutionForm from "../../components/institutions/InstitutionForm";
import { useHistory } from "react-router-dom";
import { postInstitucion } from "../../service/InstitutionService";

const InstitutionCreate = () => {
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const initialFormValue = {
    nombre: "",
    direccion: "",
    telefonoContacto: "",
    observaciones: "",
  };

  const onSubmit = async (values) => {
    setLoading(true);
    const response = await postInstitucion(values);
    setLoading(false);
    history.push("/institutions");
  };

  return (
    <div className="col-12">
      <div className="card">
        <h5>Crear Intitucion</h5>
        <InstitutionForm
          initialFormValue={initialFormValue}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default InstitutionCreate;
