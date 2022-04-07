import Axios from "axios";

export default async function (options) {
  return Axios(options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      const response = {
        error: true,
        errorMessage: "¡Ups, Algo salió mal inténtalo de nuevo!",
      };
      return response;
    });
}
