import React, { useEffect, useState } from "react";
import InstitutionForm from "../../components/institutions/InstitutionForm";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Skeleton } from "primereact/skeleton";
import {
  getOneInstitucion,
  putInstitucion,
} from "../../service/InstitutionService";
import MsjToast from "../../components/confirmation/MsjToast";

const InstitutionEdit = () => {
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
    const res = await getOneInstitucion(id);
    setInitial(res);
    setLoading(false);
  };

  useEffect(() => {
    loadItem();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = async (values) => {
    setLoading(true);
    const res = await putInstitucion(values);
    if (res.error) {
      setShow({
        ...show,
        active: true,
        message: res.errorMessage,
      });
    } else {
      history.push("/institutions");
    }
    setLoading(false);
  };

  return (
    <div className="col-12">
      <div className="card">
        <MsjToast show={show} setShow={setShow} />
        <h5>Editar Intitucion</h5>
        {loading ? (
          <Skeleton width="100%" height="150px"></Skeleton>
        ) : (
          <InstitutionForm initialFormValue={initial} onSubmit={onSubmit} />
        )}
      </div>
    </div>
  );
};

export default InstitutionEdit;
