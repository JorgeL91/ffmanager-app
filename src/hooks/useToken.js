import { useState } from "react";
import moment from "moment";
import config from "../config/config";

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken?.token;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    userToken.token.expired = new Date(moment().add(config.sessionTime, "m"));
    localStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken.token);
  };

  const deleteToken = () => {
    if (localStorage.getItem("token") !== null) {
      localStorage.removeItem("token");
      window.location.reload();
    }
  };

  const validateSession = () => {
    if (token?.expired) {
      const nowDate = new Date();

      if (moment(token.expired).isSameOrBefore(nowDate)) {
        deleteToken();
      }
    }
  };

  return {
    setToken: saveToken,
    token,
    deleteToken,
    validateSession,
  };
}
