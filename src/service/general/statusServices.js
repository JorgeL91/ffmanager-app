import config from "../../config/config";
import invokeApi from "../../helpers/invokeApi";

const urlApi = `${config.apiUrl}/general-services`;

export function getAssignSectorStatus(idStatus, idSector, token = "") {
  const url = `${urlApi}/asignar-estado-de-sector/create/${idStatus}/${idSector}`;

  const options = {
    method: "GET",
    url: url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return invokeApi(options);
}

export function getStatus(token = "") {
  const url = `${urlApi}/estados/get-all`;

  const options = {
    method: "GET",
    url: url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return invokeApi(options);
}

export function postStatus(body, token = "") {
  const url = `${urlApi}/estados/create`;

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

export function getOneStatus(idEstado, token = "") {
  const url = `${urlApi}/estados/get-one/${idEstado}`;

  const options = {
    method: "GET",
    url: url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return invokeApi(options);
}

export function putStatus(body, token = "") {
  const url = `${urlApi}/estados/update/${body.idEstado}`;

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

export function deleteStatus(idEstado, token = "") {
  const url = `${urlApi}/estados/delete/${idEstado}`;

  const options = {
    method: "DELETE",
    url: url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return invokeApi(options);
}
