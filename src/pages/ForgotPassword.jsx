import { useEffect, useState } from "react";
import { Form, Link, useActionData, Navigate } from "react-router-dom";
import { Label, Alert } from "flowbite-react";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";
import { forgot } from "../models/userModel";

export async function action({ request }) {
  const formData = await request.formData(),
    data = Object.fromEntries(formData),
    errors = [],
    email = formData.get("email");

  let regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );

  if (!regex.test(email)) {
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

  const response = await forgot(data);

  if (response.success) {
    errors.push({
      isError: false,
      type: "success",
      message: response.message,
    });

    return errors;
  } else {
    errors.push({
      isError: true,
      type: "failure",
      message: response.message,
    });

    return errors;
  }
}

const ForgotPassword = () => {
  const [show, setShow] = useState(false),
    [redirectTo, setRedirectTo] = useState(false);
  const errors = useActionData();

  useEffect(() => {
    if (errors) {
      setShow(true);

      setTimeout(() => {
        if (!errors[0].isError) {
          setShow(false);
          setRedirectTo(true);
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
              method="POST"
              className="flex flex-col h-full justify-center"
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
                Has olvidado tu contraseña?
              </p>
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
              <div className="mt-8">
                <input
                  type="submit"
                  className="bg-berkeley-blue text-white font-bold py-2 px-4 w-full cursor-pointer rounded hover:bg-blue-800 transition-colors ease-in-out duration-300"
                  value="Enviar correo electrónico"
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

export default ForgotPassword;
