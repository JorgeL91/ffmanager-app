import React, { useEffect, useState } from "react";
import ComplexForm from "../../components/forms/ComplexForm";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Skeleton } from "primereact/skeleton";
import { getOneConplex, putConplex } from "../../service/complexServices";
import MsjToast from "../../components/confirmation/MsjToast";

const ComplexEdit = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [initial, setInitial] = useState();
  const { id } = useParams();
  const [show, setShow] = useState({
    active: false,
    severity: "error",
    message: "",
  });

  useEffect(() => {
    async function fetchData() {
      const res = await getOneConplex(id);
      setInitial(res);
      setLoading(true);
    }
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = async (values) => {
    const res = await putConplex(values);
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
        <h5>Editar Complejo</h5>
        {!loading ? (
          <Skeleton width="100%" height="150px"></Skeleton>
        ) : (
          <ComplexForm initialFormValue={initial} onSubmit={onSubmit} />
        )}
      </div>
    </div>
  );
};

export default ComplexEdit;
