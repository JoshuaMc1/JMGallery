import { useEffect, useState } from "react";
import {
  Form,
  Link,
  useActionData,
  Navigate,
  useOutletContext,
} from "react-router-dom";
import { Label, Alert } from "flowbite-react";
import { register } from "../models/userModel";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";
import { isEmail } from "../helpers/helpers";

export async function action({ request }) {
  const formData = await request.formData(),
    data = Object.fromEntries(formData),
    errors = [],
    email = formData.get("email");

  if (!isEmail(email)) {
    errors.push({
      isError: true,
      type: "failure",
      message: "El correo electrónico no es valido",
    });
    return errors;
  }

  if (Object.values(data).includes("")) {
    errors.push({
      isError: true,
      type: "failure",
      message: "Todos los campos son obligatorios",
    });
    return errors;
  }

  if (data.password.length < 8) {
    errors.push({
      isError: true,
      type: "failure",
      message: "La contraseña debe tener al menos 8 caracteres",
    });

    return errors;
  }

  if (data.password !== data.password_confirmation) {
    errors.push({
      isError: true,
      type: "failure",
      message: "Las contraseñas no coinciden",
    });
    return errors;
  }

  const response = await register(data);

  if (response.success) {
    errors.push({
      isError: false,
      type: "success",
      message: "Usuario creado correctamente",
      token: response.token,
    });

    return errors;
  } else {
    if (response.message && typeof response.message === "object") {
      Object.keys(response.message).some((key) => {
        const fieldErrors = response.message[key];
        if (fieldErrors.length > 0) {
          errors.push({
            isError: true,
            type: "failure",
            message: fieldErrors[0],
          });
          return true;
        }
        return false;
      });
    }

    return errors;
  }
}

const Register = () => {
  const [show, setShow] = useState(false),
    [redirectTo, setRedirectTo] = useState(false);
  const errors = useActionData();
  const { addToken, setLoad } = useOutletContext();

  useEffect(() => {
    if (errors) {
      setShow(true);

      window.scrollTo({ top: 0, behavior: "smooth" });

      setTimeout(() => {
        if (!errors[0].isError) {
          addToken(errors[0]?.token);
          setShow(false);
          setRedirectTo(true);
          setLoad(true);
        }
      }, 2500);
    }
  }, [errors]);

  return (
    <>
      {redirectTo && <Navigate to="/" />}
      {show && (
        <div className="flex content-center items-center justify-center">
          <Alert
            icon={!errors[0]?.isError ? HiCheckCircle : HiXCircle}
            color={errors[0]?.type}
            onDismiss={() => setShow(false)}
          >
            <span title="Error">{errors[0]?.message}</span>
          </Alert>
        </div>
      )}
      <div className={`${show ? "py-6" : "py-12"}`}>
        <div className="flex h-login bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
          <div
            className="hidden lg:block lg:w-1/2 bg-cover bg-no-repeat bg-center"
            style={{
              backgroundImage: `url(/gallery.jpg)`,
            }}
          ></div>
          <div className="w-full p-8 lg:w-1/2">
            <Form
              className="flex flex-col h-full justify-center"
              method="POST"
              noValidate
            >
              <div className="flex flex-row align-middle justify-center items-center">
                <img
                  className="w-16 h-auto"
                  src="/logo.svg"
                  alt="JMGallery Logo"
                />
                <h2 className="text-2xl font-semibold text-gray-700 text-center">
                  JMGallery
                </h2>
              </div>
              <p className="text-xl text-gray-600 text-center">
                Registre una cuenta!
              </p>
              <div className="mt-4">
                <Label
                  htmlFor="name"
                  className="block text-gray-700 text-sm font-bold mb-2"
                  value="Nombre"
                />
                <input
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Juan Martinez"
                  required
                />
              </div>
              <div className="mt-4">
                <Label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                  value="Correo electrónico"
                />
                <input
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="name@gmail.com"
                  required
                />
              </div>
              <div className="mt-4">
                <div className="flex justify-between">
                  <Label
                    htmlFor="password"
                    className="block text-gray-700 text-sm font-bold mb-2"
                    value="Contraseña"
                  />
                </div>
                <input
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type="password"
                  id="password"
                  name="password"
                  required
                />
              </div>
              <div className="mt-4">
                <div className="flex justify-between">
                  <Label
                    htmlFor="confirmPassword"
                    className="block text-gray-700 text-sm font-bold mb-2"
                    value="Confirmar contraseña"
                  />
                </div>
                <input
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type="password"
                  id="confirmPassword"
                  name="password_confirmation"
                  required
                />
              </div>
              <div className="mt-8">
                <input
                  type="submit"
                  className="bg-berkeley-blue text-white font-bold py-2 px-4 w-full cursor-pointer rounded hover:bg-blue-800 transition-colors ease-in-out duration-300"
                  value="Crear Cuenta"
                />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="border-b w-1/5 md:w-1/4"></span>
                <Link to="/login" className="text-xs text-gray-500 uppercase">
                  Ya tienes una cuenta?
                </Link>
                <span className="border-b w-1/5 md:w-1/4"></span>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
