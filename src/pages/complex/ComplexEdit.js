import React, { useEffect, useState } from "react";
import ComplexForm from "../../components/complexes/ComplexForm";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Skeleton } from "primereact/skeleton";
import { getOneConplex, putConplex } from "../../service/complexServices";

const ComplexEdit = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [initial, setInitial] = useState();
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const res = await getOneConplex(id);
      res.datosInstitucionDeportiva = { idDatosInstitucionDeportiva: 1 };
      setInitial(res);
      setLoading(true);
    }
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = async (values) => {
    await putConplex(values);
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
