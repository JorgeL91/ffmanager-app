import config from "../../config/config";
import invokeApi from "../../helpers/invokeApi";

const urlApi = `${config.apiUrl}/perfiles-services/perfiles`;
const urlApi2 = `${config.apiUrl}/perfiles-services/items-de-perfil`;

export function postCreateItemsPerfil(items, idItemPerfil, token = "") {
  const url = `${urlApi2}/create-plus`;

  const body = [];

  items.forEach(function (item, indice, array) {
    body.push({
      idPerfil: idItemPerfil,
      idItemDeMenu: item.idItemMenu,
    });
  });
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
  const url = `${urlApi}/update/${body.idPerfil}`;

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
