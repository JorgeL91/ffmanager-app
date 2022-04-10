import config from "../config/config";
import invokeApi from "../helpers/invokeApi";

const urlApi = `${config.apiUrl}/instituciones-deportivas`;

export function getInstitucions(token = "") {
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

export function postInstitucion(body, token = "") {
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

export function getOneInstitucion(id, token = "") {
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

export function putInstitucion(body, token = "") {
  const url = `${urlApi}/update/${body.idDatosInstitucionDeportiva}`;

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

export function deleteInstitucion(body, token = "") {
  const url = `${urlApi}/delete/${body.idDatosInstitucionDeportiva}`;

  const options = {
    method: "DELETE",
    url: url,
    data: body,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return invokeApi(options);
}
