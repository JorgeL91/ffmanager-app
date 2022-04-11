import React from "react";
import ComplexForm from "../../components/complexes/ComplexForm";
import { useHistory } from "react-router-dom";
import { postConplex } from "../../service/complexServices";

const ComplexCreate = () => {
  const history = useHistory();

  const initialFormValue = {
    nombre: "",
    direccion: "",
    telefonoContacto: "",
    datosInstitucionDeportiva: {
      idDatosInstitucionDeportiva: "",
    },
  };

  const onSubmit = async (values) => {
    console.log(values);
    const res = await postConplex(values);
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
