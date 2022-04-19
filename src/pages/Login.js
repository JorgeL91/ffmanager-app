import React, { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import InputCustom from "../components/formcustom/InputCustom";

const Login = ({ setToken }) => {
  const [loading, setLoading] = useState(false);

  const onSubmit = (values) => {
    setLoading(true);
    console.log(values);
    setToken({ token: values.usuario });
    setLoading(false);
  };

  const initialFormValue = {
    usuario: "",
    password: "",
  };

  const formSchema = Yup.object().shape({
    usuario: Yup.string()
      .required("Por Favor ingrese un usuario")
      .max(50, "Nombre debe tener maiximo 50 caracteres "),
    password: Yup.string()
      .required("Por Favor ingrese una contraseña")
      .min(6, "Contraseña debe tener minimo 6 caracteres "),
  });

  return (
    <div
      className="flex justify-content-center p-5"
      style={{
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div className="xs:col-12 sm:col-12  md:col-5">
        <Card>
          <div className="mb-5 text-center">
            <img src="assets/layout/images/logo-dark.svg" alt="logo" />
          </div>

          <Formik
            onSubmit={onSubmit}
            validationSchema={formSchema}
            initialValues={initialFormValue}
          >
            <Form>
              <div className="p-fluid formgrid grid">
                <div className="field col-12 ">
                  <label htmlFor="usuario">Usuario </label>

                  <InputCustom name="usuario" />
                </div>
                <div className="field col-12 ">
                  <label htmlFor="password">Contraseña</label>
                  <InputCustom
                    name="password"
                    type="password"
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="grid p-fluid">
                <div className="col-12">
                  <Button
                    label="Iniciar Session"
                    type="submit"
                    className="mr-2 mb-2 "
                    loading={loading}
                  />
                </div>
              </div>
            </Form>
          </Formik>
        </Card>
      </div>
    </div>
  );
};

export default Login;
