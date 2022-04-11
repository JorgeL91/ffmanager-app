import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Skeleton } from "primereact/skeleton";
import { getOneTypeArea, putTypeArea } from "../../service/TypeAreaServices";
import TypeAreaForm from "../../components/type_areas/TypeAreaForm";
import MsjToast from "../../components/confirmation/MsjToast";

const TypeAreaEdit = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [initial, setInitial] = useState();
  const { id = 0 } = useParams();
  const [show, setShow] = useState({
    active: false,
    severity: "error",
    message: "",
  });

  const loadItem = async () => {
    const res = await getOneTypeArea(id);
    setInitial(res);
    setLoading(true);
  };

  useEffect(() => {
    loadItem();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = async (values) => {
    const res = await putTypeArea(values);
    if (res.error) {
      setShow({
        ...show,
        active: true,
        message: res.errorMessage,
      });
    } else {
      history.push("/types-of-areas");
    }
  };

  return (
    <div className="col-12">
      <div className="card">
        <MsjToast show={show} setShow={setShow} />
        <h5>Editar tipo de area</h5>
        {!loading ? (
          <Skeleton width="100%" height="150px"></Skeleton>
        ) : (
          <TypeAreaForm initialFormValue={initial} onSubmit={onSubmit} />
        )}
      </div>
    </div>
  );
};

export default TypeAreaEdit;
