import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { postJob } from "../../service/profiles/jobsServices";
import MsjToast from "../../components/confirmation/MsjToast";
import JobForm from "../../components/forms/JobForm";

const JobCreate = () => {
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
    const res = await postJob(values);
    if (res.error) {
      setShow({
        ...show,
        active: true,
        message: res.errorMessage,
      });
    } else {
      history.push("/jobs");
    }
    setLoading(false);
  };

  return (
    <div className="col-12">
      <div className="card">
        <MsjToast show={show} setShow={setShow} />
        <h5>Crear cargo</h5>
        <JobForm
          initialFormValue={initialFormValue}
          onSubmit={onSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default JobCreate;
