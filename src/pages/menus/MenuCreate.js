import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import TypeAreaForm from "../../components/type_areas/TypeAreaForm";
import { postTypeArea } from "../../service/TypeAreaServices";
import MsjToast from "../../components/confirmation/MsjToast";

const MenuCreate = () => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState({
    active: false,
    severity: "error",
    message: "",
  });

  const history = useHistory();

  const initialFormValue = {
    nombre: "",
    descripcion: "",
    observaciones: "",
    esTechada: false,
    esCompuesta: false,
  };

  const onSubmit = async (values) => {
    setLoading(true);
    const res = await postTypeArea(values);
    if (res.error) {
      setShow({
        ...show,
        active: true,
        message: res.errorMessage,
      });
    } else {
      history.push("/menus");
    }
    setLoading(false);
  };

  return (
    <div className="col-12">
      <div className="card">
        <MsjToast show={show} setShow={setShow} />
        <h5>Crear tipo de area</h5>
        <TypeAreaForm
          initialFormValue={initialFormValue}
          onSubmit={onSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default MenuCreate;
