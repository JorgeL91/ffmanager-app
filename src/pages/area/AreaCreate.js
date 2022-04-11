import React, { useState } from "react";
import AreaForm from "../../components/areas/AreaForm";
import { useHistory } from "react-router-dom";
import MsjToast from "../../components/confirmation/MsjToast";
import { postArea } from "../../service/areaServices";

const AreaCreate = () => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState({
    active: false,
    severity: "error",
    message: "",
  });

  const history = useHistory();

  const initialFormValue = {
    nombre: "",
    observaciones: "",
    tiposAreas: {
      idTipoArea: "",
    },
    complejos: {
      idComplejo: "",
    },
  };

  const onSubmit = async (values) => {
    setLoading(true);
    const res = await postArea(values);
    if (res.error) {
      setShow({
        ...show,
        active: true,
        message: res.errorMessage,
      });
    } else {
      history.push("/areas");
    }
    setLoading(false);
  };

  return (
    <div className="col-12">
      <div className="card">
        <MsjToast show={show} setShow={setShow} />
        <h5>Crear Area</h5>
        <AreaForm
          initialFormValue={initialFormValue}
          onSubmit={onSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default AreaCreate;
