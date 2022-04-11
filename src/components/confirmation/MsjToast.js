import React, { useRef, useEffect } from "react";
import { Toast } from "primereact/toast";

const MsjToast = ({ show, setShow }) => {
  const toast = useRef();

  useEffect(() => {
    if (show.active) {
      toast.current.show({
        severity: show.severity,
        detail: show.message,
        life: 3000,
      });
      setShow({
        ...show,
        active: false,
      });
    }
  }, [show]); // eslint-disable-line react-hooks/exhaustive-deps

  return <Toast ref={toast} />;
};

export default MsjToast;
