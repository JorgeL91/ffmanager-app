import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { postPerfil } from "../../service/profiles/profilesServices";
import MsjToast from "../../components/confirmation/MsjToast";
import ProfileForm from "../../components/profile/ProfileForm";

const ProfileCreate = () => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState({
    active: false,
    severity: "error",
    message: "",
  });

  const history = useHistory();

  const initialFormValue = {
    nombre: "",
    esAdmin: false,
  };

  const onSubmit = async (values) => {
    setLoading(true);
    const res = await postPerfil(values);
    if (res.error) {
      setShow({
        ...show,
        active: true,
        message: res.errorMessage,
      });
    } else {
      history.push("/profiles");
    }
    setLoading(false);
  };

  return (
    <div className="col-12">
      <div className="card">
        <MsjToast show={show} setShow={setShow} />
        <h5>Crear perfil</h5>
        <ProfileForm
          initialFormValue={initialFormValue}
          onSubmit={onSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default ProfileCreate;
