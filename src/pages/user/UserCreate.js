import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import MsjToast from "../../components/confirmation/MsjToast";
import UserForm from "../../components/forms/UserForm";
import { postUser } from "../../service/profiles/usersServices";

const UserCreate = () => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState({
    active: false,
    severity: "error",
    message: "",
  });

  const history = useHistory();

  const initialFormValue = {
    usuario: "",
    password: "",
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    fechaCreacion: new Date().toISOString(),
    cargos: {
      idCargo: "",
    },
    perfiles: {
      idPerfil: "",
    },
  };

  const onSubmit = async (values) => {
    setLoading(true);
    const res = await postUser(values);
    if (res.error) {
      setShow({
        ...show,
        active: true,
        message: res.errorMessage,
      });
    } else {
      history.push("/users");
    }
    setLoading(false);
  };

  return (
    <div className="col-12">
      <div className="card">
        <MsjToast show={show} setShow={setShow} />
        <h5>Crear tipo de area</h5>
        <UserForm
          initialFormValue={initialFormValue}
          onSubmit={onSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default UserCreate;
