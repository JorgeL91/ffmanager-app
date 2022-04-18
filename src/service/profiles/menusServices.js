import config from "../../config/config";
import invokeApi from "../../helpers/invokeApi";

const urlApi = `${config.apiUrl}/perfiles-services/items-menu`;

export function getMenusByPerfil(id, token = "") {
  const url = `${urlApi}/get-by-perfil/${id}`;

  const options = {
    method: "GET",
    url: url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return invokeApi(options);
}

export function getRootsMenus(token = "") {
  const url = `${urlApi}/get-roots-without-child`;

  const options = {
    method: "GET",
    url: url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return invokeApi(options);
}

export function getMenus(token = "") {
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

export function postMenu(body, token = "") {
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

export function getOneMenu(id, token = "") {
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

export function putMenu(body, token = "") {
  const url = `${urlApi}/update/${body.idItemMenu}`;

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

export function deleteMenu(id, token = "") {
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
