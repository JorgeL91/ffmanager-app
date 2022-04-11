import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Skeleton } from "primereact/skeleton";
import { getOneTypeArea, putTypeArea } from "../../service/TypeAreaServices";
import TypeAreaForm from "../../components/type_areas/TypeAreaForm";

const TypeAreaEdit = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [initial, setInitial] = useState();
  const { id } = useParams();

  useEffect(async () => {
    const res = await getOneTypeArea(id);
    setInitial(res);
    setLoading(true);
  }, []);

  const onSubmit = async (values) => {
    await putTypeArea(values);
    history.push("/types-of-areas");
  };

  return (
    <div className="col-12">
      <div className="card">
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