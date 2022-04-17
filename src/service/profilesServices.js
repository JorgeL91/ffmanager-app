import config from "../config/config";
import invokeApi from "../helpers/invokeApi";

const urlApi = `${config.apiUrl}/perfiles-services/perfiles`;

export function getPerfiles(token = "") {
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

export function postPerfil(body, token = "") {
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

export function getOnePerfil(id, token = "") {
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

export function putPerfil(body, token = "") {
  const url = `${urlApi}/update/${body.idDatosPerfilDeportiva}`;

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

export function deletePerfil(id, token = "") {
  const url = `${urlApi}/delete/${id}`;

  const options = {
    method: "DELETE",
    url: url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return invokeApi(options);
}
