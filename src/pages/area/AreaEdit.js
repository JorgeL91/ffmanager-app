import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Skeleton } from "primereact/skeleton";
import { getOneArea, putArea } from "../../service/areaServices";
import MsjToast from "../../components/confirmation/MsjToast";
import AreaForm from "../../components/areas/AreaForm";

const AreaEdit = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [initial, setInitial] = useState();
  const [show, setShow] = useState({
    active: false,
    severity: "error",
    message: "",
  });
  const { id } = useParams();

  const loadItem = async () => {
    const res = await getOneArea(id);
    res.tiposAreas = {
      idTipoArea: res.tiposAreas.idTipoArea,
      nombre: res.tiposAreas.nombre,
    };
    res.complejos = {
      idComplejo: res.complejos.idComplejo,
      nombre: res.complejos.nombre,
    };
    setInitial(res);
    setLoading(false);
  };

  useEffect(() => {
    loadItem();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = async (values) => {
    setLoading(true);
    const res = await putArea(values);
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
        <h5>Editar Area</h5>
        {loading ? (
          <Skeleton width="100%" height="150px"></Skeleton>
        ) : (
          <AreaForm initialFormValue={initial} onSubmit={onSubmit} />
        )}
      </div>
    </div>
  );
};

export default AreaEdit;
