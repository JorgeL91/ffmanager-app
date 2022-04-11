import React, { useState, useEffect } from "react";
import { useField, useFormikContext } from "formik";
import { classNames } from "primereact/utils";
import { AutoComplete } from "primereact/autocomplete";

export default function AutocompleteCustom({ name, labelText, ...props }) {
  const [field, meta] = useField(name);
  const { values, errors, handleChange } = useFormikContext();
  const [selectedAutoValue, setSelectedAutoValue] = useState(labelText);

  const setValue = (e) => {
    // values.datosInstitucionDeportiva.idDatosInstitucionDeportiva =
    //   selected.idDatosInstitucionDeportiva;
    // delete errors.datosInstitucionDeportiva;
    setSelectedAutoValue(e.target.value);
    e.target.value = Object.values(e.target.value)[0];
    handleChange(e);
  };
  return (
    <>
      <AutoComplete
        placeholder="Buscar"
        dropdown
        value={selectedAutoValue}
        //value={field.value}
        inputId={name}
        name={name}
        onChange={(e) => setValue(e)}
        //onChange={(e) => handleChange(e)}
        {...props}
        //suggestions={autoFilteredValue}
        //completeMethod={searchText}
        className={classNames({ "p-invalid": meta.error && meta.touched })}
        // selectedItemTemplate={1}
      />
      {meta.error && meta.touched ? (
        <small className="p-error">{meta.error}</small>
      ) : null}
    </>
  );
}
