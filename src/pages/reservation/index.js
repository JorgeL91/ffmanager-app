import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    setAreas(null);
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const getItems = async (startDate, endDate) => {
    setLoading(true);
    const res = await getAreasAvailable(id, startDate, endDate);
    setLoading(false);
    if (!res.error) {
      if (res.length === 0) {
        setShow({
          severity: "error",
          active: true,
          message: "No hay areas disponibles",
        });
        setAreas(res);
        return;
      }
      let items = [];

      res.forEach((element) => {
        element.url = `${element.idArea}/${element.esCompuesta}/${startDate}/${endDate}`;
        items.push(element);
      });
      setAreas(
        items.sort((a, b) =>
          a.nombre.toLowerCase() > b.nombre.toLowerCase() ? 1 : -1
        )
      );
    } else {
      setShow({
        severity: "error",
        active: true,
        message: res.errorMessage,
      });
      setAreas([
        {
          url: `15/false/${startDate}/${endDate}`,
          idArea: 15,
          nombre: "quemada",
          descripcion: "descripcion",
          esCompuesta: true,
        },
      ]);
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
