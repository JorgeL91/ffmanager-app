import config from "../config/config";
import invokeApi from "../helpers/invokeApi";

const urlApi = `${config.apiUrl}/tipos-areas`;

export function getTypeAreas(token = "") {
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

export function postTypeArea(body, token = "") {
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

export function getOneTypeArea(id, token = "") {
  const url = `${urlApi}/get-one/${id}`;

  const options = {
    method: "GET",
    url: url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return invokeApi(options);
}

export function putTypeArea(body, token = "") {
  const url = `${urlApi}/update/${body.idDatosTypeAreaDeportiva}`;

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

export function deleteTypeArea(body, token = "") {
  const url = `${urlApi}/delete/${body.idTipoArea}`;

  const options = {
    method: "DELETE",
    url: url,
    // data: body,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return invokeApi(options);
}
