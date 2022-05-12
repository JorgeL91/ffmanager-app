import { Button } from "primereact/button";
import { Steps } from "primereact/steps";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MsjToast from "../../components/confirmation/MsjToast";
import ActivityResevation from "../../components/reservation/ActivityResevation";
import MaterialResevation from "../../components/reservation/MaterialResevation";
import SectorResevation from "../../components/reservation/SectorResevation";
import UserReservation from "../../components/reservation/UserReservation";
import useToken from "../../hooks/useToken";
import { getActivities } from "../../service/general/activitiesServices";
import { getMaterials } from "../../service/general/materialsServices";
import {
  getHoursAvailable,
  getSectoresAvailable,
  postReseva,
} from "../../service/reserva/reservaService";

const Reservation = () => {
  const { token } = useToken();
  const { isAdmin, idUsuario } = token;
  const { idarea = 0, compuesta, starDate, endDate } = useParams();
  const [sectors, setSectors] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [activities, setActivities] = useState(null);
  const [user, setUser] = useState(null);

  const [selectedActivities, setSelecteActivities] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
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

  const getSectoresData = async () => {
    const res = await getSectoresAvailable(idarea, starDate, endDate);
    if (!res.error) {
      setSectors(res);
    }
  };

  const getHoursData = async () => {
    const array = ["8", "9", "10", "11", "12"];
    const res = await getHoursAvailable(idarea, starDate, array);
    console.log(res);
    // if (!res.error) {
    //   setSectors(res);
    // }
  };

  const loadItem = async () => {
    setLoading(true);
    if (compuesta === "true") {
      getSectoresData();
    } else {
      getHoursData();
    }

    getMaterialData();
    getAactivitesData();
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
      if (!user) {
        messageError("Debe seleccionar un Usuario");
        return;
      }
      ur = user.idUsuario;
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
    setBtnLoading(true);
    const res = await postReseva(body);
    setBtnLoading(false);
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
      setActiveIndex(0);
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
            isCompuesta={compuesta}
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
            <Steps
              model={wizardItems}
              activeIndex={activeIndex}
              onSelect={(e) => setActiveIndex(e.index)}
              readOnly={false}
            />
            {renderSwitch()}

            {isAdmin && <UserReservation setUser={setUser} user={user} />}
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
              loading={btnLoading}
              type="button"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Reservation;
