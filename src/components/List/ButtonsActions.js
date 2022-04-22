import { Button } from "primereact/button";
import React from "react";
import { Link } from "react-router-dom";
import BtnDelete from "../confirmation/BtnDelete";

export default function ButtonsActions({ item, idItem, deleteItem, link }) {
  return (
    <>
      {typeof link === "string" ? (
        <Link to={`${link}/${idItem}`}>
          <Button
            icon="pi pi-pencil"
            className="p-button-rounded p-button-success mr-2"
          />
        </Link>
      ) : (
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => link(item)}
        />
      )}

      <BtnDelete item={idItem} onConfirmation={deleteItem} />
    </>
  );
}
