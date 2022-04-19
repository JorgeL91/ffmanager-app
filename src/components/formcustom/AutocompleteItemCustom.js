import React, { useState } from "react";
import { useField, useFormikContext } from "formik";
import { classNames } from "primereact/utils";
import { AutoComplete } from "primereact/autocomplete";

export default function AutocompleteItemCustom({
  name,
  labelText,
  items,
  ...props
}) {
  const [field, meta] = useField(name);
  const { handleChange } = useFormikContext();
  const [selectedAutoValue, setSelectedAutoValue] = useState(labelText);
  const [autoFilteredValue, setAutoFilteredValue] = useState([]);

  const searchText = (event) => {
    setTimeout(() => {
      if (!event.query.trim().length) {
        setAutoFilteredValue([...items]);
      } else {
        setAutoFilteredValue(
          items.filter((item) => {
            return item[props.field]
              .toLowerCase()
              .startsWith(event.query.toLowerCase());
          })
        );
      }
    }, 250);
  };

  const setValue = (e) => {
    setSelectedAutoValue(e.target.value);
    e.target.value = Object.values(e.target.value)[0];
    handleChange(e);
  };
  return (
    <>
      <AutoComplete
        suggestions={autoFilteredValue}
        completeMethod={searchText}
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
