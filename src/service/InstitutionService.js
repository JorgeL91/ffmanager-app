import config from "../config/config";
import invokeApi from "../helpers/invokeApi";

const urlApi = `${config.apiUrl}/apiffmanagger`;

export function getInstitucions(token = "") {
  const url = `${urlApi}/instituion`;

  const options = {
    method: "GET",
    url: url,
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  };
  return invokeApi(options);
}
