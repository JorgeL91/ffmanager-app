import { Button } from "primereact/button";
import { Steps } from "primereact/steps";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MsjToast from "../../components/confirmation/MsjToast";
import ActivityResevation from "../../components/reservation/ActivityResevation";
import MaterialResevation from "../../components/reservation/MaterialResevation";
import SectorResevation from "../../components/reservation/SectorResevation";
import useToken from "../../hooks/useToken";
import { getActivities } from "../../service/general/activitiesServices";
import { getMaterials } from "../../service/general/materialsServices";
import {
  getSectoresAvailable,
  postReseva,
} from "../../service/reserva/reservaService";

const Reservation = () => {
  const { token } = useToken();
  const { isAdmin, idUsuario } = token;
  const { idarea = 0, starDate, endDate } = useParams();
  const [sectors, setSectors] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [activities, setActivities] = useState(null);

  const [selectedActivities, setSelecteActivities] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState({
    active: false,
    severity: "error",
    message: "",
  });

  const getMaterialData = async () => {
    const res = await getMaterials();

    if (!res.error) {
      setMaterials(res);
      res.forEach((element) => {
        element.cantidad = 0;
      });
    }
  };

  const getAactivitesData = async () => {
    const res = await getActivities();
    if (!res.error) setActivities(res);
  };

  const loadItem = async () => {
    setLoading(true);
    const res = await getSectoresAvailable(idarea, starDate, endDate);
    getMaterialData();
    getAactivitesData();
    if (!res.error) {
      setSectors(res);
    }
    setLoading(false);
  };

  const wizardItems = [
    {
      label: "Sector",
    },
    {
      label: "Materiales",
    },
    {
      label: "Actividades",
    },
  ];

  const onReservation = () => {
    const sr = sectors.filter((item) => {
      return item.selected === true;
    });
    if (sr.length === 0) {
      messageError("Debe seleccionar sectores");
      return;
    }
    const mr = materials
      .filter((item) => {
        return item.cantidad !== 0;
      })
      .map(function (obj) {
        return {
          idMaterial: obj.idMaterial,
          cantidad: obj.cantidad,
        };
      });
    if (mr.length === 0) {
      messageError("Debe seleccionar materiales");
      return;
    }

    if (selectedActivities.length === 0) {
      messageError("Debe seleccionar actividades");
      return;
    }
    const ar = selectedActivities.map((obj) => obj.idActividad);
    let ur = 0;
    if (isAdmin) {
    } else {
      ur = idUsuario;
    }

    createReservation(sr, mr, ar, ur);
  };

  const createReservation = async (sr, mr, ar, ur) => {
    const body = {
      idSector: sr[0].idSector,
      fechaHoraDesde: starDate,
      fechaHoraHasta: endDate,
      materilesDeReserva: mr,
      actividadesDeReserva: ar,
      usuarioDeReserva: ur,
    };
    const res = await postReseva(body);
    if (res.error) {
      messageError("Error al crear la reserva, inteta nuevamente");
    } else {
      setShow({
        active: true,
        severity: "success",
        message: "Reserva creada correctamente",
      });
      setSelecteActivities([]);
      loadItem();
    }
  };

  const messageError = (message) => {
    setShow({
      active: true,
      severity: "error",
      message: message,
    });
  };

  const renderSwitch = () => {
    switch (activeIndex) {
      case 1:
        return (
          <MaterialResevation
            materials={materials}
            setMaterials={setMaterials}
          />
        );
      case 2:
        return (
          <ActivityResevation
            activities={activities}
            selectedActivities={selectedActivities}
            setSelecteActivities={setSelecteActivities}
          />
        );
      default:
        return (
          <SectorResevation
            sectors={sectors}
            setSectors={setSectors}
            isCompuesta={true}
          />
        );
    }
  };

  // area?.tiposAreas.esCompuesta;

  useEffect(() => {
    loadItem();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <MsjToast show={show} setShow={setShow} />

      {loading ? (
        "Cargando"
      ) : (
        <div className="card">
          <h5>Generar Reserva</h5>
          <div className="col-12 ">
            <div className="card card-w-title">
              <Steps
                model={wizardItems}
                activeIndex={activeIndex}
                onSelect={(e) => setActiveIndex(e.index)}
                readOnly={false}
              />
              {renderSwitch()}
            </div>
            {isAdmin && <h1>Seleccione un usuario</h1>}
          </div>
          {/* <div className="col-12 ">
        <div className="card card-w-title">
          <TabMenu
            model={wizardItems}
            activeIndex={activeIndex}
            onTabChange={(e) => setActiveIndex(e.index)}
          />
          {renderSwitch()}
        </div>
      </div> */}
          <div className=" p-fluid">
            <Button
              label="Generar reserva"
              onClick={() => onReservation()}
              type="button"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Reservation;
