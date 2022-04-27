import React, { useState } from "react";
import { Calendar } from "primereact/calendar";
import moment from "moment";
import useToken from "../../hooks/useToken";
import { Button } from "primereact/button";

const DateForm = () => {
  const dateNow = new Date(moment().format("L"));
  const [startDate, setStarDate] = useState(dateNow);
  const [endDate, setEndDate] = useState(dateNow);
  const { token } = useToken();
  const { isAdmin } = token;

  return (
    <>
      <div className="card">
        <div className="p-fluid formgrid grid">
          <div className="field col-12 md:col-4">
            <label htmlFor="nombre">Fecha desde</label>
            <Calendar
              inputId="calendar"
              value={startDate}
              onChange={(e) => setStarDate(e.value)}
              className="p-invalid"
              showIcon
              showTime
              hourFormat="12"
            />
          </div>
          {isAdmin && (
            <div className="field col-10 md:col-4">
              <label htmlFor="apellido">Fecha hasta</label>
              <Calendar
                inputId="calendar"
                value={endDate}
                onChange={(e) => setEndDate(e.value)}
                className="p-invalid"
                showIcon
                showTime
                hourFormat="12"
                maxDate={new Date(moment().add(7, "d").format("L"))}
              />
            </div>
          )}
          <div className="field col-2 md:col-4">
            <Button
              icon="pi pi-search"
              className="p-button-rounded p-button-success mr-2 mt-5"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DateForm;
