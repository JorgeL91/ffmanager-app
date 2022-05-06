import React, { useState } from "react";
import MsjToast from "../../components/confirmation/MsjToast";
import AreaItem from "../../components/reservation/AreaItem";
import DateForm from "../../components/reservation/DateForm";
import { getAreasAvailable } from "../../service/reserva/reservaService";
import { useParams } from "react-router-dom";

const ListReservation = () => {
  const { id = 0 } = useParams();
  const [areas, setAreas] = useState(null);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState({
    active: false,
    severity: "error",
    message: "",
  });

  // useEffect(() => {
  //   getItems();
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const getItems = async (startDate, endDate) => {
    setLoading(true);
    const res = await getAreasAvailable(id, startDate, endDate);
    setLoading(false);
    if (!res.error) {
      let items = [];
      res.forEach((element) => {
        element.url = `${element.idArea}/${startDate}/${endDate}`;
        items.push(element);
      });
      setAreas(items);
    } else {
      setShow({
        severity: "error",
        active: true,
        message: res.errorMessage,
      });
    }
  };

  return (
    <>
      <MsjToast show={show} setShow={setShow} />
      <DateForm getItems={getItems} loading={loading} setShow={setShow} />
      {areas && (
        <div className="card">
          <div className="p-grid grid ">
            {areas.map((area) => (
              <AreaItem key={area.idArea} area={area} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ListReservation;
