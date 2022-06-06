import React, { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import InputCustom from "../components/formcustom/InputCustom";
import { postLoginUser } from "../service/profiles/usersServices";
import MsjToast from "../components/confirmation/MsjToast";
import escudo from "../assets/images/escudo.png";

const Login = ({ setToken }) => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState({
    active: false,
    severity: "error",
    message: "",
  });

  const onSubmit = async (values) => {
    setLoading(true);
    const res = await postLoginUser(values);
    setLoading(false);
    if (res.error) {
      setShow({
        ...show,
        active: true,
        message: "Usuario o contraseña invalidos.",
      });
    } else {
      const token = {
        menu: res["items-menu"].sort((a, b) => a.order - b.order),
        token: "dfdfgsdfgsdfgsdf",
        idUsuario: res.idUsuario,
        usuario: res.usuario,
        isAdmin: res.esAdmin === "1" ? true : false,
      };
      setToken({ token });
    }
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
      <MsjToast show={show} setShow={setShow} />
      <div className="xs:col-12 sm:col-12  md:col-5">
        <Card>
          <div className="mb-5 text-center ">
            <img style={{ height: "150px" }} src={escudo} alt="logo" />
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
                    label="Iniciar sesión"
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
