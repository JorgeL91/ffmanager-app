import config from "../../config/config";
import invokeApi from "../../helpers/invokeApi";

const urlApi = `${config.apiUrl}/general-services/actividades`;

export function getActivities(token = "") {
  const url = `${urlApi}/get-all`;

  const options = {
    method: "GET",
    url: url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return invokeApi(options);
}

export function postActivity(body, token = "") {
  const url = `${urlApi}/create`;

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

export function getOneActivity(idActividad, token = "") {
  const url = `${urlApi}/get-one/${idActividad}`;

  const options = {
    method: "GET",
    url: url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return invokeApi(options);
}

export function putActivity(body, token = "") {
  const url = `${urlApi}/update/${body.idActividad}`;

  const options = {
    method: "PUT",
    url: url,
    data: body,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return invokeApi(options);
}

export function deleteActivity(idActividad, token = "") {
  const url = `${urlApi}/delete/${idActividad}`;

  const options = {
    method: "DELETE",
    url: url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return invokeApi(options);
}
