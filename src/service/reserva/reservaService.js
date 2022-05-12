import config from "../../config/config";
import invokeApi from "../../helpers/invokeApi";

const urlApi = `${config.apiUrl}/reservas-services/reservas`;

export function getAreasAvailable(idComplejo, startDate, endDate) {
  const url = `${urlApi}/get-all-areas-disponibles/${idComplejo}/${startDate}/${endDate}`;

  const options = {
    method: "GET",
    url: url,
  };
  return invokeApi(options);
}

export function getSectoresAvailable(idArea, startDate, endDate) {
  const url = `${urlApi}/get-all-sectores-disponibles-de-area-compuesta/${idArea}/${startDate}/${endDate}`;

  const options = {
    method: "GET",
    url: url,
  };
  return invokeApi(options);
}

export function getHoursAvailable(idArea, date, hours) {
  const url = `${urlApi}/get-all-sectores-disponibles-de-area-simple/${idArea}/${date}/${hours}`;

  const options = {
    method: "GET",
    url: url,
  };
  return invokeApi(options);
}

export function postReseva(body, token = "") {
  const url = `${urlApi}/reservar`;

  const options = {
    method: "POST",
    url: url,
    data: body,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return invokeApi(options);
}
