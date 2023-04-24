import { Link, useLoaderData, Form, useActionData } from "react-router-dom";
import { deletePost, getMyPosts } from "../../models/postsModel";
import { Badge, Alert, Button } from "flowbite-react";
import useGetToken from "../../hooks/useGetToken";
import { useState, useEffect, useRef } from "react";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";
import { MdPublic, MdPublicOff } from "react-icons/md";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import Confirm from "../../components/Confirm";

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
  const [showConfirm, setShowConfirm] = useState(false);
  const [deletePost, setDeletePost] = useState(false);
  const buttonDeleteRefs = useRef([]);
  const [postIndex, setPostIndex] = useState(null);

  useEffect(() => {
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

  useEffect(() => {
    if (deletePost) {
      buttonDeleteRefs.current[postIndex].click();
      setPostIndex(null);
      setDeletePost(false);
    }
  }, [deletePost]);

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
        <div className="min-h-75vh">
          <div className="w-full mb-6">
            <h1 className="text-4xl text-white font-bold">Mis publicaciones</h1>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
            {posts?.map(({ title, image, slug, status, id, nsfw }, index) => (
              <div key={id} className="relative group h-full">
                <div className="absolute top-0 left-0 p-2 flex gap-3">
                  <Badge color={status === 1 ? "success" : "indigo"}>
                    <div className="flex flex-row gap-2">
                      {status === 1 ? (
                        <>
                          <MdPublic className="text-green-800" size={16} />
                          Público
                        </>
                      ) : (
                        <>
                          <MdPublicOff className="text-indigo-800" size={16} />
                          Borrador
                        </>
                      )}
                    </div>
                  </Badge>
                  {nsfw === 1 && (
                    <Badge color="failure" className="text-red-800">
                      <div className="flex flex-row gap-2">
                        <BsFillExclamationDiamondFill
                          className="text-red-500 transition-colors"
                          size={16}
                        />
                        NSFW
                      </div>
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
                    <Button
                      href={`${import.meta.env.VITE_BASE_URL}download/${slug}`}
                      className="w-full h-full text-center rounded-md text-white bg-transparent hover:bg-green-800 transition-colors duration-300"
                      target="_blank"
                    >
                      Descargar
                    </Button>
                    <Form method="POST" noValidate>
                      <input type="hidden" name="slug" defaultValue={slug} />
                      <input type="hidden" name="_token" defaultValue={token} />
                      <input
                        value=""
                        type="submit"
                        ref={(el) => (buttonDeleteRefs.current[index] = el)}
                      />
                      <input
                        className="py-2 px-3 w-full h-full text-center rounded-md text-white bg-transparent hover:bg-red-800 cursor-pointer transition-colors duration-300"
                        type="button"
                        value="Eliminar"
                        onClick={() => {
                          setPostIndex(index);
                          setShowConfirm(true);
                        }}
                      />
                    </Form>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
      <Confirm
        setShowConfirm={setShowConfirm}
        showConfirm={showConfirm}
        setDeletePost={setDeletePost}
        message="¿Estás seguro de que quieres eliminar esta publicación?"
        optionYes="Si, deseo eliminar el post"
        optionNo="No, no quiero eliminar el post"
      />
    </>
  );
};

export default MyPosts;
