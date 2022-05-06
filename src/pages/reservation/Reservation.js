import { Button } from "primereact/button";
import { Steps } from "primereact/steps";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ActivityResevation from "../../components/reservation/ActivityResevation";
import MaterialResevation from "../../components/reservation/MaterialResevation";
import SectorResevation from "../../components/reservation/SectorResevation";
import { getSectoresAvailable } from "../../service/reserva/reservaService";

const Reservation = () => {
  const { idarea = 0, starDate, endDate } = useParams();
  const [area, setArea] = useState();
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadItem = async () => {
    const res = await getSectoresAvailable(idarea, starDate, endDate);
    console.log(res);
    if (!res.error) {
      setArea(res);
      setLoading(false);
    }
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

  const renderSwitch = () => {
    switch (activeIndex) {
      case 1:
        return <MaterialResevation />;
      case 2:
        return <ActivityResevation />;
      default:
        return <SectorResevation isCompuesta={true} />;
    }
  };

  // area?.tiposAreas.esCompuesta;

  useEffect(() => {
    loadItem();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
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
            <Button label="Generar reserva" />
          </div>
        </div>
      )}
    </>
  );
};

export default Reservation;
