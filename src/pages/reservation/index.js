import React, { useEffect, useState } from "react";
import AreaItem from "../../components/reservation/AreaItem";
import DateForm from "../../components/reservation/DateForm";
import { getAreas } from "../../service/areaServices";

const ListReservation = () => {
  const [areas, setAreas] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getItems = async () => {
    const res = await getAreas();
    if (!res.error) {
      setLoading(false);
      setAreas(res);
      setLoading(true);
    }
  };

  return (
    <>
      <DateForm />
      <div className="card">
        <div className="p-grid grid ">
          {loading &&
            areas.map((area) => <AreaItem key={area.idArea} area={area} />)}
        </div>
      </div>
    </>
  );
};

export default ListReservation;
