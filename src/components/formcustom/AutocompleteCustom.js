import React, { useState } from "react";
import { useField, useFormikContext } from "formik";
import { classNames } from "primereact/utils";
import { AutoComplete } from "primereact/autocomplete";

export default function AutocompleteCustom({ name, labelText, ...props }) {
  const [field, meta] = useField(name);
  const { handleChange } = useFormikContext();
  const [selectedAutoValue, setSelectedAutoValue] = useState(labelText);

  const setValue = (e) => {
    setSelectedAutoValue(e.target.value);
    e.target.value = Object.values(e.target.value)[0];
    handleChange(e);
  };
  return (
    <>
      <AutoComplete
        placeholder="Buscar"
        dropdown
        value={selectedAutoValue ? selectedAutoValue : field.value}
        inputId={name}
        name={name}
        onChange={(e) => setValue(e)}
        {...props}
        className={classNames({ "p-invalid": meta.error && meta.touched })}
      />
      {meta.error && meta.touched ? (
        <small className="p-error">{meta.error}</small>
      ) : null}
    </>
  );
}
