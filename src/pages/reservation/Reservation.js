import { Steps } from "primereact/steps";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ActivityResevation from "../../components/reservation/ActivityResevation";
import MaterialResevation from "../../components/reservation/MaterialResevation";
import SectorResevation from "../../components/reservation/SectorResevation";
import { getOneArea } from "../../service/areaServices";

const Reservation = () => {
  const { idarea = 0 } = useParams();

  const [area, setArea] = useState();
  const [activeIndex, setActiveIndex] = useState(0);

  const loadItem = async () => {
    const res = await getOneArea(idarea);
    setArea(res);
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
        return <SectorResevation />;
    }
  };

  useEffect(() => {
    loadItem();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="card">
      <h5>Generar Reserva en {area?.nombre}</h5>
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
    </div>
  );
};

export default Reservation;
