import React from "react";
import { useField, useFormikContext } from "formik";
import { Checkbox } from "primereact/checkbox";

export default function CheckboxCustom({ name, ...props }) {
  const [field, meta] = useField(name);
  const { handleChange } = useFormikContext();

  return (
    <>
      <Checkbox
        onChange={handleChange}
        binary
        className="mr-2"
        {...props}
        checked={field.value}
        inputId={name}
        name={name}
      />

      {meta.error && meta.touched ? (
        <small className="p-error">{meta.error}</small>
      ) : null}
    </>
  );
}
