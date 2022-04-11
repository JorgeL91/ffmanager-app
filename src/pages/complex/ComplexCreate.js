import React, { useState } from "react";
import ComplexForm from "../../components/complexes/ComplexForm";
import { useHistory } from "react-router-dom";
import { postConplex } from "../../service/complexServices";
import MsjToast from "../../components/confirmation/MsjToast";

const ComplexCreate = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState({
    active: false,
    severity: "error",
    message: "",
  });

  const initialFormValue = {
    nombre: "",
    direccion: "",
    telefonoContacto: "",
    datosInstitucionDeportiva: {
      idDatosInstitucionDeportiva: "",
    },
  };

  const onSubmit = async (values) => {
    setLoading(true);
    const res = await postConplex(values);
    setLoading(false);
    if (res.error) {
      setShow({
        ...show,
        active: true,
        message: res.errorMessage,
      });
    } else {
      history.push("/complexes");
    }
  };

  return (
    <div className="col-12">
      <div className="card">
        <MsjToast show={show} setShow={setShow} />
        <h5>Crear Complejo</h5>
        <ComplexForm
          initialFormValue={initialFormValue}
          onSubmit={onSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default ComplexCreate;
