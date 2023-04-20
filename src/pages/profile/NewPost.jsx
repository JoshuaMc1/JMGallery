import { Form, useActionData, useLoaderData } from "react-router-dom";
import { Label, Alert } from "flowbite-react";
import { create, update, getPost } from "../../models/postsModel";
import { useState, useEffect } from "react";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";
import Switch from "../../components/Switch";
import ImageUploader from "../../components/ImageUploader";
import useGetToken from "../../hooks/useGetToken";

export async function loader({ params }) {
  const { slug } = params;

  if (slug?.length > 0) {
    const token = JSON.parse(
      localStorage.getItem(import.meta.env.VITE_TOKEN_NAME)
    );

    if (token?.length > 0) {
      const response = await getPost(token, slug);

      if (response.success) {
        return response.data;
      }
    }
  }

  return {};
}

export async function action({ request }) {
  const formData = await request.formData(),
    data = Object.fromEntries(formData),
    errors = [];
  const action = data._action;

  if (data?._token?.length === 0) {
    errors.push({
      isError: true,
      type: "failure",
      message: "Al parecer hay un error, por favor refresque la página",
    });

    return errors;
  }

  const token = data._token;

  formData.delete("_token");

  if (data?.title?.length === 0) {
    errors.push({
      isError: true,
      type: "failure",
      message: "El titulo no puede estar vacío",
    });

    return errors;
  }

  if (data?.status?.length === 0) {
    errors.push({
      isError: true,
      type: "failure",
      message: "El estado no puede estar vacío",
    });

    return errors;
  }

  if (action === "create") {
    if (data?.image?.size === 0) {
      errors.push({
        isError: true,
        type: "failure",
        message: "Debe seleccionar una imagen",
      });

      return errors;
    }

    const response = await create(token, formData);

    if (response.success) {
      errors.push({
        isError: false,
        type: "success",
        message: response.message,
      });

      return errors;
    } else {
      if (response?.status) {
        errors.push({
          isError: true,
          type: "failure",
          message: response.statusText,
        });

        return errors;
      }

      errors.push({
        isError: true,
        type: "failure",
        message: response.message,
      });

      return errors;
    }
  } else if (action === "edit") {
    const response = await update(token, formData);

    if (response.success) {
      errors.push({
        isError: false,
        type: "success",
        message: response.message,
      });

      return errors;
    } else {
      if (response?.status) {
        errors.push({
          isError: true,
          type: "failure",
          message: response.statusText,
        });

        return errors;
      }

      errors.push({
        isError: true,
        type: "failure",
        message: response.message,
      });

      return errors;
    }
  } else
    return [
      {
        isError: true,
        type: "failure",
        message: "Al parecer hay un error, por favor refresque la página",
      },
    ];
}

const NewPost = () => {
  const errors = useActionData();
  const token = useGetToken();
  const [show, setShow] = useState(false);
  const load = useLoaderData();

  useEffect(() => {
    if (errors) {
      setShow(true);

      setTimeout(() => {
        if (!errors[0].isError) {
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
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold">Subir imagen a la galería</h1>
      </div>
      <div className="py-12 px-6 bg-white shadow-lg rounded-lg my-6">
        <Form
          className="flex flex-col md:flex-row gap-4"
          method="POST"
          encType="multipart/form-data"
          noValidate
        >
          <input type="hidden" name="_token" defaultValue={token} />
          <input
            type="hidden"
            name="_action"
            defaultValue={load ? "edit" : "create"}
          />

          {load && (
            <input type="hidden" name="slug" defaultValue={load?.slug} />
          )}
          <div className="w-full md:w-2/3">
            <ImageUploader imageDefault={load?.image} />
          </div>
          <div className="w-full md:w-1/3">
            <div className="mb-4">
              <Label
                htmlFor="title"
                className="block text-gray-700 text-sm font-bold mb-2"
                value="Titulo del post"
              />
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="text"
                id="title"
                name="title"
                placeholder="Gato en la luna"
                defaultValue={load?.title}
                required
              />
            </div>
            <div className="mb-4">
              <Label
                htmlFor="description"
                className="block text-gray-700 text-sm font-bold mb-2"
                value="Descripción del post"
              />
              <textarea
                id="description"
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                rows={6}
                name="description"
                defaultValue={load?.description}
              />
            </div>
            <div className="mb-1">
              <Switch title="NSFW" id="nsfw" name="nsfw" value={load?.nsfw} />
            </div>
            <div className="mb-4">
              <Label
                htmlFor="status"
                className="block text-gray-700 text-sm font-bold mb-2"
                value="Estado"
              />
              <select
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                id="status"
                name="status"
                defaultValue={load?.status}
              >
                <option value="1">Publico</option>
                <option value="2">Borrador</option>
              </select>
            </div>
            <div className="mt-4">
              <input
                type="submit"
                className="bg-berkeley-blue text-white font-bold py-2 px-4 w-full cursor-pointer rounded hover:bg-blue-800 transition-colors ease-in-out duration-300"
                value={`${load ? "Editar post" : "Publicar post"}`}
              />
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};

export default NewPost;
