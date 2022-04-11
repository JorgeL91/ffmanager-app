import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Skeleton } from "primereact/skeleton";
import {
  deleteSector,
  getOneSector,
  putSector,
} from "../../service/sectorServices";
import MsjToast from "../../components/confirmation/MsjToast";
import SectorForm from "../../components/areas/SectorForm";
import BtnDelete from "../../components/confirmation/BtnDelete";

const SectorEdit = () => {
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
    const res = await getOneSector(id);
    res.areas = {
      idArea: res.areas.idArea,
      nombre: res.areas.nombre,
    };

    setInitial(res);
    setLoading(false);
  };

  useEffect(() => {
    loadItem();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = async (values) => {
    setLoading(true);
    const res = await putSector(values);
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
  const deleteItem = async (confirmation) => {
    const { item } = { ...confirmation };
    const res = await deleteSector(item);
    if (res.error) {
      setShow({
        ...show,
        active: true,
        message: res.errorMessage,
      });
    } else {
      history.push("/areas");
    }
  };
  return (
    <div className="col-12">
      <div className="card">
        <MsjToast show={show} setShow={setShow} />
        <div className="">
          <h5>Editar Sector</h5>
          <div className="text-right">
            <BtnDelete item={id} onConfirmation={deleteItem} />{" "}
          </div>
        </div>

        {loading ? (
          <Skeleton width="100%" height="150px"></Skeleton>
        ) : (
          <SectorForm initialFormValue={initial} onSubmit={onSubmit} />
        )}
      </div>
    </div>
  );
};

export default SectorEdit;
