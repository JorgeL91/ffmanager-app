import React, { useState } from "react";
import { useField, useFormikContext } from "formik";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";
import { AutoComplete } from "primereact/autocomplete";

export default function AutocompleteCustom({ name, ...props }) {
  const [field, meta] = useField(name);
  const { values, errors } = useFormikContext();
  const [selectedAutoValue, setSelectedAutoValue] = useState(null);

  const setValue = (selected) => {
    values.datosInstitucionDeportiva.idDatosInstitucionDeportiva =
      selected.idDatosInstitucionDeportiva;
    delete errors.datosInstitucionDeportiva;
    setSelectedAutoValue(selected);
  };
  return (
    <>
      <AutoComplete
        placeholder="Buscar"
        dropdown
        value={selectedAutoValue}
        onChange={(e) => setValue(e.value)}
        {...props}
        //suggestions={autoFilteredValue}
        //completeMethod={searchText}
        className={classNames({ "p-invalid": meta.error && meta.touched })}
      />
      {meta.error && meta.touched ? (
        <small className="p-error">{meta.error}</small>
      ) : null}
    </>
  );
}
