import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import MsjToast from "../../components/confirmation/MsjToast";
import SectorForm from "../../components/areas/SectorForm";
import { postSector } from "../../service/sectorServices";

const SectorCreate = () => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState({
    active: false,
    severity: "error",
    message: "",
  });

  const history = useHistory();
  const { id } = useParams();

  const initialFormValue = {
    nombre: "",
    observaciones: "",
    tamano: 0,
    esSectorGolero: false,
    numeroSector: 0,
    areas: {
      idArea: id,
    },
  };

  const onSubmit = async (values) => {
    setLoading(true);
    const res = await postSector(values);
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
        <h5>Crear Sector</h5>
        <SectorForm
          initialFormValue={initialFormValue}
          onSubmit={onSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default SectorCreate;
