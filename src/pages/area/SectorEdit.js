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
import { Button } from "primereact/button";
import { getAssignSectorStatus } from "../../service/general/statusServices";
import { Dialog } from "primereact/dialog";
import AssignSectorStatusForm from "../../components/areas/AssignSectorStatusForm";

const SectorEdit = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [initial, setInitial] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [formStatus, setFormStatus] = useState({ idEstado: "", nombre: "" });

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
    if (res.estadosDeSectores?.length !== 0) {
      let lastItem = res.estadosDeSectores.pop();
      setFormStatus(lastItem.estados);
    }
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
        severity: "error",
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
        severity: "error",
      });
    } else {
      history.push("/areas");
    }
  };

  const assignSectorStatus = async (values) => {
    setLoadingStatus(true);
    const res = await getAssignSectorStatus(values.idEstado, id);
    if (res.error) {
      setShow({
        ...show,
        active: true,
        message: res.errorMessage,
        severity: "error",
      });
    } else {
      setShow({
        ...show,
        active: true,
        severity: "success",
        message: "Estado asignado correctamente",
      });
    }
    loadItem();
    setOpenDialog(false);
    setLoadingStatus(false);
  };

  return (
    <div className="col-12">
      <div className="card">
        <MsjToast show={show} setShow={setShow} />
        <div className="">
          <h5>Editar Sector</h5>
          <div className="text-right">
            <Button
              icon="pi pi-server"
              //className="p-button-danger"
              className="p-button-rounded p-button-success mt-2 mr-2"
              onClick={() => setOpenDialog(true)}
            />
            <BtnDelete item={id} onConfirmation={deleteItem} />{" "}
          </div>
        </div>

        {loading ? (
          <Skeleton width="100%" height="150px"></Skeleton>
        ) : (
          <SectorForm initialFormValue={initial} onSubmit={onSubmit} />
        )}
        <Dialog
          visible={openDialog}
          style={{ width: "450px" }}
          header="Asignar estado"
          modal
          className="p-fluid"
          onHide={() => setOpenDialog(false)}
        >
          <AssignSectorStatusForm
            onSubmit={assignSectorStatus}
            onCancel={setOpenDialog}
            loading={loadingStatus}
            formStatus={formStatus}
          />
        </Dialog>
      </div>
    </div>
  );
};

export default SectorEdit;
