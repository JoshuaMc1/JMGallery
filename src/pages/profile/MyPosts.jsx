import { Link, useLoaderData, Form, useActionData } from "react-router-dom";
import { deletePost, getMyPosts } from "../../models/postsModel";
import { Badge, Alert } from "flowbite-react";
import useGetToken from "../../hooks/useGetToken";
import { useState, useEffect } from "react";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";

export async function action({ request }) {
  const formData = await request.formData(),
    data = Object.fromEntries(formData),
    errors = [];

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

  if (data?.slug?.length === 0) {
    errors.push({
      isError: true,
      type: "failure",
      message: "Al parecer hay un error, por favor refresque la página",
    });

    return errors;
  }

  const response = await deletePost(token, data.slug);

  if (response?.success) {
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

export async function loader() {
  const token = JSON.parse(
    localStorage.getItem(import.meta.env.VITE_TOKEN_NAME)
  );

  if (token?.length > 0) {
    const response = await getMyPosts(token);

    if (response?.success) {
      return response.data;
    }
  }

  return [];
}

const MyPosts = () => {
  const posts = useLoaderData();
  const token = useGetToken();
  const errors = useActionData();
  const [show, setShow] = useState(false);

  useEffect(() => {
    console.log(posts);
    if (errors) {
      setShow(true);

      window.scrollTo({ top: 0, behavior: "smooth" });

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
      {posts?.length > 0 ? (
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {posts?.map(({ title, image, slug, status, id, nsfw }) => (
            <div key={id} className="relative group">
              <div className="absolute top-0 left-0 p-2 flex gap-3">
                <Badge color={status === 1 ? "success" : "indigo"}>
                  {status === 1 ? "Publicado" : "Borrador"}
                </Badge>
                {nsfw === 1 && (
                  <Badge color="failure" className="text-red-800">
                    +18
                  </Badge>
                )}
              </div>
              <img
                className="h-full max-w-full rounded-lg"
                src={image}
                alt={title}
                title={title}
                loading="lazy"
              />
              <div className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-gray-900 bg-opacity-75 transition-opacity ease-in-out duration-300 flex items-center justify-center">
                <div className="text-center flex flex-col gap-4">
                  <Link
                    className="py-2 px-3 w-full h-full text-center rounded-md text-white bg-transparent hover:bg-blue-800 transition-colors duration-300"
                    to={"/new-post/" + slug}
                  >
                    Editar
                  </Link>
                  <Form method="POST" noValidate>
                    <input type="hidden" name="slug" defaultValue={slug} />
                    <input type="hidden" name="_token" defaultValue={token} />
                    <input
                      className="py-2 px-3 w-full h-full text-center rounded-md text-white bg-transparent hover:bg-red-800 cursor-pointer transition-colors duration-300"
                      type="submit"
                      value="Eliminar"
                    />
                  </Form>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 h-75vh">
          <div className="bg-yale-blue flex flex-col mx-auto h-full justify-center align-center items-center rounded-xl shadow-xl">
            <h2 className="text-4xl font-bold text-white mb-4">
              Al parecer aun no has publicado imágenes
            </h2>
            <p className="text-2xl font-semibold text-white">
              Publica tu primer imagen dando click en el botón "Publicar imagen"
            </p>

            <Link
              className="mt-12 py-3 px-4 text-xl rounded-lg bg-white text-blue-800 hover:bg-blue-800 hover:text-white transition-colors duration-300 shadow-xl"
              to="/new-post"
            >
              Publicar imagen
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default MyPosts;
