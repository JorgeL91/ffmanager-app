import { Button } from "primereact/button";
import { Steps } from "primereact/steps";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MsjToast from "../../components/confirmation/MsjToast";
import moment from "moment";
import ActivityResevation from "../../components/reservation/ActivityResevation";
import MaterialResevation from "../../components/reservation/MaterialResevation";
import SectorResevation from "../../components/reservation/SectorResevation";
import UserReservation from "../../components/reservation/UserReservation";
import useToken from "../../hooks/useToken";
import { getActivities } from "../../service/general/activitiesServices";
import {
  getHoursAvailable,
  getSectoresAvailable,
  postReseva,
  getStockMaterials,
} from "../../service/reserva/reservaService";

const Reservation = () => {
  const { token } = useToken();
  const { isAdmin, idUsuario } = token;
  const { idarea = 0, compuesta, starDate, endDate } = useParams();
  const [sectors, setSectors] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [activities, setActivities] = useState(null);
  const [user, setUser] = useState(null);
  const [deteHour, setDateHour] = useState(null);
  const [selectedHours, setSelectedHours] = useState(null);

  const [selectedActivities, setSelecteActivities] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [show, setShow] = useState({
    active: false,
    severity: "error",
    message: "",
  });

  const getMaterialData = async (starDate, end) => {
    const res = await getStockMaterials(starDate, end);

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

  const getSectoresData = async (start, end) => {
    const res = await getSectoresAvailable(idarea, start, end);
    if (!res.error) {
      const items = res.sort((a, b) => a.numeroSector - b.numeroSector);
      setSectors(items);
    }
  };

  const getHoursData = async () => {
    var entryHour = moment(starDate).hours();
    var exitHour = moment(endDate).hours();

    let items = [];
    for (let index = entryHour; index <= exitHour; index++) {
      items.push(index);
    }
    const res = await getHoursAvailable(idarea, starDate, items);

    if (!res.error) {
      let items = [];
      Object.keys(res).map((key) =>
        items.push({ hour: key, status: res[key], id: key })
      );
      setSectors(items);
    }
  };

  const loadItem = async (isRefresh = false) => {
    setLoading(true);

    if (compuesta === "true") {
      let start = moment(starDate);
      let end = start.add(1, "h").format("YYYY-MM-DD HH:mm");

      if (isRefresh) {
        start = moment(starDate).hours(deteHour[0]).format("YYYY-MM-DD HH:mm");
        end = moment(starDate).hours(deteHour[1]).format("YYYY-MM-DD HH:mm");
      } else {
        const hours = start.hours();
        setDateHour([hours - 1, hours]);
        start = moment(starDate).format("YYYY-MM-DD HH:mm");
        setSelectedHours(0);
      }

      getSectoresData(start, end);
      getMaterialData(start, end);
    } else {
      setSelectedHours([]);
      getHoursData();
      getMaterialData(starDate, endDate);
    }

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
    let sr = [];
    if (compuesta === "true") {
      sr = sectors.filter((item) => {
        return item.selected === true;
      });
      if (sr.length === 0) {
        messageError("Debe seleccionar sectores");
        return;
      }
    } else {
      if (selectedHours.length === 0) {
        messageError("Debe seleccionar horas");
        return;
      }
      sr = selectedHours;
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
    // if (mr.length === 0) {
    //   messageError("Debe seleccionar materiales");
    //   return;
    // }

    // if (selectedActivities.length === 0) {
    //   messageError("Debe seleccionar actividades");
    //   return;
    // }
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
    if (compuesta === "true") {
      createReservation(sr, mr, ar, ur);
    } else {
      createReservationSimple(sr, mr, ar, ur);
    }
  };

  const createReservationSimple = async (sr, mr, ar, ur) => {
    setBtnLoading(true);
    sr.forEach(async (element) => {
      const h = element.hour.split("-");
      let start = moment(starDate).hours(h[0]).format("YYYY-MM-DD HH:mm");
      let end = moment(starDate).hours(h[1]).format("YYYY-MM-DD HH:mm");
      const body = {
        idArea: idarea,
        fechaHoraDesde: start,
        fechaHoraHasta: end,
        materilesDeReserva: mr,
        actividadesDeReserva: ar,
        usuarioDeReserva: ur,
      };
      await postReseva(body);
    });
    setSelectedHours([]);
    setTimeout(successResponse, 3000);
    //successResponse();
  };

  const createReservation = async (sr, mr, ar, ur) => {
    let start = moment(starDate).hours(deteHour[0]).format("YYYY-MM-DD HH:mm");
    let end = moment(starDate).hours(deteHour[1]).format("YYYY-MM-DD HH:mm");

    setBtnLoading(true);
    sr.forEach(async (element, index) => {
      const body = {
        idSector: element.idSector,
        fechaHoraDesde: start,
        fechaHoraHasta: end,
        materilesDeReserva: index === 0 ? mr : [],
        actividadesDeReserva: ar,
        usuarioDeReserva: ur,
      };
      await postReseva(body);
    });
    setTimeout(successResponse, 3000);
    // successResponse();
  };

  const successResponse = () => {
    setBtnLoading(false);
    // if (res.error) {
    //   messageError("Error al crear la reserva, inteta nuevamente");
    // } else {
    setShow({
      active: true,
      severity: "success",
      message: "Reserva creada correctamente",
    });
    setSelecteActivities([]);
    loadItem(true);
    setActiveIndex(0);
    // }
  };

  const getListHours = () => {
    var entryHour = moment(starDate).hours();
    var exitHour = moment(endDate).hours();
    let items = [];
    for (let index = entryHour; index < exitHour; index++) {
      items.push(index + " - " + (index + 1));
    }
    return items;
  };

  const getNewsSectores = (hours) => {
    const h = hours.split(" - ");
    setDateHour([h[0], h[1]]);
    let start = moment(starDate).hours(h[0]).format("YYYY-MM-DD HH:mm");
    let end = moment(starDate).hours(h[1]).format("YYYY-MM-DD HH:mm");
    getSectoresData(start, end);
    getMaterialData(start, end);
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
            getListHours={getListHours}
            sectors={sectors}
            setSectors={setSectors}
            isCompuesta={compuesta}
            getNewsSectores={getNewsSectores}
            selectedHours={selectedHours}
            setSelectedHours={setSelectedHours}
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
