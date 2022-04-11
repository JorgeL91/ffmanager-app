import React from "react";
import { useField } from "formik";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";

export default function InputCustom({ name, ...props }) {
  const [field, meta] = useField(name);

  return (
    <>
      <InputText
        onChange={field.onChange(name)}
        onBlur={field.onBlur(name)}
        value={field.value}
        {...props}
        className={classNames({ "p-invalid": meta.error && meta.touched })}
      />

      {meta.error && meta.touched ? (
        <small className="p-error">{meta.error}</small>
      ) : null}
    </>
  );
}
