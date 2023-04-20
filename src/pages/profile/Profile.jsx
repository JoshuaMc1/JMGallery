import { useOutletContext, Form, useActionData } from "react-router-dom";
import { memo, useState, useEffect } from "react";
import { Label, Alert } from "flowbite-react";
import ProfilePicture from "../../components/ProfilePicture";
import Switch from "../../components/Switch";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";
import useGetToken from "../../hooks/useGetToken";
import {
  updateProfile,
  updatePassword,
  changeNSFW,
  deleteUser,
} from "../../models/profileModel";

export async function action({ request }) {
  let formData,
    data,
    errors = [];

  try {
    formData = await request.formData();
    data = Object.fromEntries(formData);
    const token = data?._token;

    if (token?.length === 0) {
      errors.push({
        isError: true,
        type: "failure",
        message: "Al parecer hay un error, por favor refresque la página",
      });

      return errors;
    }

    switch (true) {
      case Object.keys(data).includes("form-userData"):
        if (data?.profile?.size === 0) {
          formData.delete("profile");
        }

        if (data?.name?.length === 0) {
          errors.push({
            isError: true,
            type: "failure",
            message: "El nombre no puede estar vacío",
          });

          return errors;
        }

        const responseUpdateProfile = await updateProfile(token, formData);

        if (responseUpdateProfile.success) {
          errors.push({
            isError: false,
            load: true,
            type: "success",
            message: responseUpdateProfile.message,
          });
        } else {
          errors.push({
            isError: true,
            load: false,
            type: "failure",
            message: responseUpdateProfile.message,
          });
        }

        return errors;

      case Object.keys(data).includes("form-password"):
        if (data?.oldPassword?.length === 0) {
          errors.push({
            isError: true,
            type: "failure",
            message: "La contraseña actual no puede estar vacía",
          });

          return errors;
        }

        if (data?.new_password?.length === 0) {
          errors.push({
            isError: true,
            type: "failure",
            message: "La nueva contraseña no puede estar vacía",
          });

          return errors;
        }

        if (data?.password_confirmation?.length === 0) {
          errors.push({
            isError: true,
            type: "failure",
            message: "La confirmación de contraseña no puede estar vacía",
          });

          return errors;
        }

        if (data?.new_password !== data?.password_confirmation) {
          errors.push({
            isError: true,
            type: "failure",
            message: "Las contraseñas no coinciden",
          });

          return errors;
        }

        const passwordData = {
          old_password: data?.oldPassword,
          password: data?.new_password,
          password_confirmation: data?.password_confirmation,
        };

        const responseUpdatePassword = await updatePassword(
          token,
          passwordData
        );

        if (responseUpdatePassword.success) {
          errors.push({
            isError: false,
            load: false,
            type: "success",
            message: responseUpdatePassword.message,
          });
        } else if (responseUpdatePassword.message) {
          if (typeof responseUpdatePassword.message === "object") {
            Object.keys(responseUpdatePassword.message).some((key) => {
              const fieldErrors = responseUpdatePassword.message[key];
              if (fieldErrors.length > 0) {
                errors.push({
                  isError: true,
                  load: false,
                  type: "failure",
                  message: fieldErrors[0],
                });
                return true;
              }
              return false;
            });
          } else if (typeof responseUpdatePassword.message === "string") {
            errors.push({
              isError: true,
              load: false,
              type: "failure",
              message: responseUpdatePassword.message,
            });
          }
        }

        return errors;

      case Object.keys(data).includes("form-delete"):
        const responseDeleteUser = await deleteUser(token);

        if (responseDeleteUser.success) {
          errors.push({
            isError: false,
            load: true,
            type: "success",
            message: responseDeleteUser.message,
          });
        } else {
          errors.push({
            isError: true,
            load: false,
            type: "failure",
            message: responseDeleteUser.message,
          });
        }

        return errors;

      case Object.keys(data).includes("form-nsfw"):
        if (data?.nsfw != data?.old_nsfw) {
          const dataChangeNSFW = {
            nsfw: data?.nsfw,
          };

          const responseChangeNSFW = await changeNSFW(token, dataChangeNSFW);

          if (responseChangeNSFW.success) {
            errors.push({
              isError: false,
              load: true,
              type: "success",
              message: responseChangeNSFW.message,
            });
          } else {
            errors.push({
              isError: true,
              load: false,
              type: "failure",
              message: responseChangeNSFW.message,
            });
          }

          return errors;
        } else {
          errors.push({
            isError: false,
            type: "success",
            message: "NSFW actualizado correctamente",
          });

          return errors;
        }

      default:
        errors.push({
          isError: true,
          type: "failure",
          message: "Al parecer hay un error...",
        });

        return errors;
    }
  } catch (error) {
    errors.push({
      isError: true,
      type: "failure",
      message: "Error parsing form data",
    });

    return errors;
  }
}

const Profile = memo(() => {
  const errors = useActionData();
  const { userData, setLoad } = useOutletContext() || {};
  const [show, setShow] = useState(false);
  const token = useGetToken();

  useEffect(() => {
    if (errors) {
      setShow(true);

      window.scrollTo({ top: 0, behavior: "smooth" });

      setTimeout(() => {
        if (!errors[0].isError) {
          setLoad(errors[0]?.load);
          setShow(false);
        }
      }, 2500);
    }
  }, [errors]);

  return (
    <>
      {show && (
        <div className="flex content-center items-center justify-center mb-4">
          <Alert
            icon={!errors[0]?.isError ? HiCheckCircle : HiXCircle}
            color={errors[0]?.type}
            onDismiss={() => setShow(false)}
          >
            <span title="Error">{errors[0]?.message}</span>
          </Alert>
        </div>
      )}
      <div className="bg-white rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="mb-8">
            <h2 className="text-3xl font-bold">Datos del usuario</h2>
            <p className="text-sm text-gray-500 mt-3">
              Aquí veras tus datos de usuario.
            </p>
            <p className="text-sm text-gray-500 mt-3">
              También podrás editar tus datos como tu nombre, foto de perfil y
              descripción de tu perfil.
            </p>
            <p className="text-sm text-gray-500 mt-3">
              El <strong>correo electrónico</strong> no se puede modificar.
            </p>
          </div>
          <div className="col-span-2 mb-8">
            <Form method="POST" encType="multipart/form-data" noValidate>
              <input type="hidden" name="_token" defaultValue={token} />
              <div className="mb-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="h-full flex flex-row align-middle items-center">
                  <ProfilePicture
                    name={userData?.profile?.name}
                    photoProfile={userData?.profile?.profile}
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <Label
                      htmlFor="name"
                      className="block text-gray-700 text-sm font-bold mb-2"
                      value="Nombre"
                    />
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                      defaultValue={userData?.profile?.name}
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="email"
                      className="block text-gray-700 text-sm font-bold mb-2"
                      value="Correo Electrónico"
                    />
                    <input
                      type="text"
                      id="email"
                      className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                      defaultValue={userData?.email}
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <Label
                  htmlFor="description"
                  className="block text-gray-700 text-sm font-bold mb-2"
                  value="Descripción del usuario"
                />
                <textarea
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  name="description"
                  id="description"
                  cols="10"
                  rows="5"
                  defaultValue={userData?.profile?.description}
                ></textarea>
              </div>
              <div className="mt-3">
                <input
                  className="bg-berkeley-blue text-white font-bold py-2 px-4 w-full cursor-pointer rounded hover:bg-blue-800 transition-colors ease-in-out duration-300"
                  type="submit"
                  value="Actualizar datos"
                  name="form-userData"
                />
              </div>
            </Form>
          </div>
          <div className="mb-8">
            <h2 className="text-3xl font-bold">Cambio de Contraseñas</h2>
            <p className="text-sm text-gray-500 mt-3">
              Aquí podrás cambiar tu contraseña. Para cambiar la contraseña, es
              necesario ingresar la contraseña actual, luego ingresar la nueva
              contraseña y confirmas ingresando la nueva contraseña.
            </p>
          </div>
          <div className="col-span-2 mb-8">
            <Form method="POST" noValidate>
              <input type="hidden" name="_token" defaultValue={token} />
              <div className="mb-3">
                <Label
                  htmlFor="oldPassword"
                  className="block text-gray-700 text-sm font-bold mb-2"
                  value="Contraseña actual"
                />
                <input
                  type="password"
                  name="oldPassword"
                  id="oldPassword"
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                />
              </div>
              <div className="mb-3">
                <Label
                  htmlFor="newPassword"
                  className="block text-gray-700 text-sm font-bold mb-2"
                  value="Nueva contraseña"
                />
                <input
                  type="password"
                  name="new_password"
                  id="newPassword"
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                />
              </div>
              <div className="mb-3">
                <Label
                  htmlFor="confirmPassword"
                  className="block text-gray-700 text-sm font-bold mb-2"
                  value="Confirmar contraseña"
                />
                <input
                  type="password"
                  name="password_confirmation"
                  id="confirmPassword"
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                />
              </div>
              <div className="mt-3">
                <input
                  className="bg-berkeley-blue text-white font-bold py-2 px-4 w-full cursor-pointer rounded hover:bg-blue-800 transition-colors ease-in-out duration-300"
                  type="submit"
                  value="Actualizar contraseña"
                  name="form-password"
                />
              </div>
            </Form>
          </div>
          <div className="mb-8">
            <h2 className="text-3xl font-bold">NSFW</h2>
            <p className="text-sm text-gray-500 mt-3">
              Aquí podrás activar o desactivar el modo <strong>NSFW</strong>. El
              modo <strong>NSFW</strong> es para los usuarios mayores de edad.
            </p>
            <p className="text-sm text-gray-500 mt-3">
              Por defecto, el modo <strong>NSFW</strong> está desactivado.
            </p>
            <p className="text-sm text-gray-500 mt-3">
              Si activa el modo <strong>NSFW</strong> podrá ver imágenes que
              contienen contenido sexual.
            </p>
          </div>
          <div className="col-span-2 mb-8">
            <Form className="h-full" method="POST" noValidate>
              <input type="hidden" name="_token" defaultValue={token} />
              <input
                type="hidden"
                name="old_nsfw"
                defaultValue={userData?.show_nsfw}
              />
              <div className="flex flex-col h-full justify-between">
                <div>
                  <Label
                    htmlFor="nsfw"
                    className="block text-gray-700 text-sm font-bold mb-4"
                    value="Cambiar modo NSFW"
                  />
                  <Switch
                    title="NSFW"
                    id="nsfw"
                    name="nsfw"
                    value={userData?.show_nsfw}
                  />
                </div>
                <div>
                  <input
                    className="bg-berkeley-blue text-white font-bold py-2 px-4 w-full cursor-pointer rounded hover:bg-blue-800 transition-colors ease-in-out duration-300"
                    type="submit"
                    value={
                      userData?.profile?.nsfw
                        ? "Desactivar modo NSFW"
                        : "Activar modo NSFW"
                    }
                    name="form-nsfw"
                  />
                </div>
              </div>
            </Form>
          </div>
          <div className="mb-8">
            <h2 className="text-3xl font-bold">Eliminar Cuenta</h2>
          </div>
          <div className="col-span-2 mb-8">
            <Form method="POST" noValidate>
              <input type="hidden" name="_token" defaultValue={token} />
              <div className="mb-3">
                <input
                  className="bg-red-800 text-white font-bold py-2 px-4 w-full cursor-pointer rounded hover:bg-red-600 transition-colors ease-in-out duration-300"
                  type="submit"
                  value="Eliminar cuenta"
                  name="form-delete"
                />
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
});

export default Profile;
