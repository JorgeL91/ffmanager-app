import React, { useEffect, useState } from "react";
import InstitutionForm from "../../components/institutions/InstitutionForm";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Skeleton } from "primereact/skeleton";
import {
  getOneInstitucion,
  putInstitucion,
} from "../../service/InstitutionService";

const InstitutionEdit = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [initial, setInitial] = useState();
  const { id } = useParams();

  useEffect(async () => {
    const res = await getOneInstitucion(id);
    setInitial(res);
    setLoading(true);
  }, []);

  const onSubmit = async (values) => {
    const res = await putInstitucion(values);
    history.push("/institutions");
  };

  return (
    <div className="col-12">
      <div className="card">
        <h5>Editar Intitucion</h5>
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
