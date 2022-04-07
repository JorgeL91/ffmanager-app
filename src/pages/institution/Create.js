import React, { useRef } from "react";
import InstitutionForm from "../../components/institutions/InstitutionForm";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useHistory } from "react-router-dom";

const InstitutionCreate = () => {
  const [lstSotorage, setStorage] = useLocalStorage("intitutions", []);
  const history = useHistory();

  const initialFormValue = {
    id: Math.random(),
    name: "",
    direction: "",
    phone: "",
    observation: "",
  };

  const onSubmit = async (values) => {
    setStorage(values);

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
