import React, { useEffect, useState } from "react";
import { AutoComplete } from "primereact/autocomplete";
import { getUsers } from "../../service/profiles/usersServices";

const UserReservation = ({ user, setUser }) => {
  const [autoFilteredValue, setAutoFilteredValue] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadItem();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadItem = async () => {
    const res = await getUsers();

    if (!res.error) {
      let users = [];
      res.forEach((element) => {
        const user = {
          idUsuario: element.idUsuario,
          nombre: element.nombre,
        };
        users.push(user);
      });
      setItems(users);
    }
  };

  const searchText = (event) => {
    setTimeout(() => {
      if (!event.query.trim().length) {
        setAutoFilteredValue([...items]);
      } else {
        setAutoFilteredValue(
          items.filter((item) => {
            return item.nombre
              .toLowerCase()
              .startsWith(event.query.toLowerCase());
          })
        );
      }
    }, 250);
  };

  return (
    <div className="field p-fluid my-5">
      <label htmlFor="direction">Usuario</label>

      <AutoComplete
        placeholder="Seleccionar usaurio"
        id="dd"
        dropdown
        value={user}
        onChange={(e) => setUser(e.value)}
        suggestions={autoFilteredValue}
        completeMethod={searchText}
        field="nombre"
      />
    </div>
  );
};

export default UserReservation;
