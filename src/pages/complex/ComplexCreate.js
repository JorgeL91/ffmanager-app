import React, { useRef } from "react";
import ComplexForm from "../../components/complexes/ComplexForm";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useHistory } from "react-router-dom";

const ComplexCreate = () => {
  const [lstSotorage, setStorage] = useLocalStorage("complex", []);
  const history = useHistory();

  const initialFormValue = {
    id: Math.random(),
    name: "",
    direction: "",
    phone: "",
    fk_institution: "",
  };

  const onSubmit = async (values) => {
    setStorage(values);

    history.push("/complexes");
  };

  return (
    <div className="col-12">
      <div className="card">
        <h5>Crear Complejo</h5>
        <ComplexForm initialFormValue={initialFormValue} onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default ComplexCreate;
