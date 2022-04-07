import React, { useEffect, useState } from "react";
import InstitutionForm from "../../components/institutions/InstitutionForm";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Skeleton } from "primereact/skeleton";

const InstitutionEdit = () => {
  const history = useHistory();

  const [lstSotorage, setStorage] = useLocalStorage("intitutions", []);
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
    history.push("/institutions");
  };

  return (
    <div className="col-12">
      <div className="card">
        <h5>Crear Intitucion</h5>
        {!loading ? (
          <Skeleton width="100%" height="150px"></Skeleton>
        ) : (
          <InstitutionForm initialFormValue={initial} onSubmit={onSubmit} />
        )}
      </div>
    </div>
  );
};

export default InstitutionEdit;
