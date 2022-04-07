import React, { useEffect, useState } from "react";
import ComplexForm from "../../components/complexes/ComplexForm";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Skeleton } from "primereact/skeleton";

const ComplexEdit = () => {
  const history = useHistory();

  const [lstSotorage, setStorage] = useLocalStorage("complex", []);
  const [loading, setLoading] = useState(false);
  const [initial, setInitial] = useState();
  const { id } = useParams();

  useEffect(() => {
    let res = lstSotorage.filter((item) => item.id == id)[0];
    setInitial(res);
    setTimeout(() => {
      setLoading(true);
    }, 1000);
  }, []);

  const onSubmit = async (values) => {
    history.push("/complexes");
  };

  return (
    <div className="col-12">
      <div className="card">
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
