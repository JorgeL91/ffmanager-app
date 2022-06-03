import config from "../../config/config";
import invokeApi from "../../helpers/invokeApi";

const urlApi = `${config.apiUrl}/reservas-services/reservas`;

export function deleteReservation(idReserva) {
  const url = `${urlApi}/delete-reserva${idReserva}`;

  const options = {
    method: "DELETE",
    url: url,
  };
  return invokeApi(options);
}

export function getReservationXUser(startDate, endDate, userId) {
  const url = `${urlApi}/get-all-reservas-usuarios/${startDate}/${endDate}/${userId}`;

  const options = {
    method: "GET",
    url: url,
  };
  return invokeApi(options);
}

export function getStockMaterials(startDate, endDate) {
  const url = `${urlApi}/get-stock-materiales/${startDate}/${endDate}`;

  const options = {
    method: "GET",
    url: url,
  };
  return invokeApi(options);
}

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
