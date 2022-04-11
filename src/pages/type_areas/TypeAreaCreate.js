import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import TypeAreaForm from "../../components/type_areas/TypeAreaForm";
import { postTypeArea } from "../../service/TypeAreaServices";

const TypeAreaCreate = () => {
  const [loading, setLoading] = useState(false);

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
    await postTypeArea(values);
    setLoading(false);
    history.push("/types-of-areas");
  };

  return (
    <div className="col-12">
      <div className="card">
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

export default TypeAreaCreate;
