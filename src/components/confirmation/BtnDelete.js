import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

const BtnDelete = ({ rowData, onConfirmation }) => {
  const [displayConfirmation, setDisplayConfirmation] = useState({
    active: false,
    item: {},
  });

  const confirmation = () => {
    onConfirmation(displayConfirmation);
    setDisplayConfirmation({
      ...displayConfirmation,
      active: false,
    });
  };

  const confirmationDialogFooter = (
    <>
      <Button
        type="button"
        label="Cancelar"
        icon="pi pi-times"
        onClick={() =>
          setDisplayConfirmation({
            ...displayConfirmation,
            active: false,
          })
        }
        className="p-button-text"
      />
      <Button
        type="button"
        label="Aceptar"
        icon="pi pi-check"
        onClick={() => confirmation()}
        className="p-button-text"
        autoFocus
      />
    </>
  );

  return (
    <>
      <Button
        icon="pi  pi-trash"
        className="p-button-danger"
        onClick={() =>
          setDisplayConfirmation({
            ...displayConfirmation,
            active: true,
            item: rowData,
          })
        }
      />
      <Dialog
        id="dialogote"
        header="Confirmación"
        visible={displayConfirmation.active}
        onHide={() =>
          setDisplayConfirmation({
            ...displayConfirmation,
            active: false,
          })
        }
        style={{ width: "350px" }}
        modal
        footer={confirmationDialogFooter}
      >
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          <span>¿Estas seguro que deseas realizar la eliminación?</span>
        </div>
      </Dialog>
    </>
  );
};

export default BtnDelete;
