import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { postMenu } from "../../service/profiles/menusServices";
import MsjToast from "../../components/confirmation/MsjToast";
import ItemMenuForm from "../../components/forms/ItemMenuForm";

const MenuCreate = () => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState({
    active: false,
    severity: "error",
    message: "",
  });

  const history = useHistory();

  const initialFormValue = {
    label: "",
    to: "",
    esHoja: false,
    esRaiz: false,
    idItemMenuPadre: "",
    order: 0,
    icon: "",
  };

  const onSubmit = async (values) => {
    setLoading(true);
    const res = await postMenu(values);
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
        <h5>Crear item de menu</h5>
        <ItemMenuForm
          initialFormValue={initialFormValue}
          onSubmit={onSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default MenuCreate;
