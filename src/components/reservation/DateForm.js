import React, { useState } from "react";
import { Calendar } from "primereact/calendar";
import moment from "moment";
import useToken from "../../hooks/useToken";
import { Button } from "primereact/button";

const DateForm = ({ getItems, loading, setShow }) => {
  const dateNow = new Date(moment().minutes(0));

  // const getEndDate = () => {
  //   const date2 = moment(dateNow);
  //   let date3 = date2.add(1, "h");
  //   return new Date(date3.toString());
  // };

  const [startDate, setStarDate] = useState(dateNow);
  const [endDate, setEndDate] = useState(new Date(moment().minutes(0)));
  const { token } = useToken();
  const { isAdmin } = token;

  const onGetAreas = () => {
    let ed = new Date(
      // moment(startDate).add(1, "d").hours(moment(endDate).hours()).toString()
      moment(startDate).hours(moment(endDate).hours())
    );

    if (moment(ed).isSameOrBefore(startDate, "hours")) {
      setShow({
        severity: "error",
        active: true,
        message: "Hora hasta debe ser mayor a hora desde",
      });
      return;
    }

    const sd = moment(startDate).format("YYYY-MM-DD HH:mm");
    const sdf = moment(ed.toString()).format("YYYY-MM-DD HH:mm");

    getItems(sd, sdf);
  };

  return (
    <>
      <div className="card">
        <div className="p-fluid formgrid grid">
          <div className="field col-12 md:col-4">
            <label htmlFor="nombre">Hora desde</label>
            <Calendar
              inputId="calendar"
              value={startDate}
              onChange={(e) => setStarDate(e.value)}
              className="p-invalid"
              showIcon
              showTime
              hourFormat="24"
              minDate={new Date(moment().hours(0).minutes(0))}
              maxDate={
                isAdmin
                  ? new Date(moment().add(8, "d").format("L"))
                  : new Date(moment().add(1, "d").format("L"))
              }
              stepMinute={60}
            />
          </div>

          <div className="field col-10 md:col-4">
            <label htmlFor="apellido">Hora hasta</label>
            <Calendar
              inputId="calendar"
              value={endDate}
              onChange={(e) => setEndDate(e.value)}
              className="p-invalid"
              showIcon
              timeOnly
              hourFormat="24"
              stepMinute={60}
            />
          </div>

          <div className="field col-2 md:col-4">
            <Button
              icon="pi pi-search"
              loading={loading}
              onClick={onGetAreas}
              className="p-button-rounded p-button-success mr-2 mt-5"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DateForm;
