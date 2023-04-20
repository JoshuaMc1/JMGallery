import { Modal, Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import useScreenSize from "../hooks/useScreenSize";
import { AiFillCloseCircle, AiFillHeart } from "react-icons/ai";
import useGetToken from "../hooks/useGetToken";
import { likePost } from "../models/postsModel";

const ImageView = ({
  showModal,
  setShowModal,
  selectedImage,
  setSelectedImage,
  reload,
  setMessage,
}) => {
  const { width } = useScreenSize();
  const [show, setShow] = useState(false);
  const token = useGetToken();

  useEffect(() => {
    if (width > 900) {
      setShow(false);
    } else setShow(true);
  }, [width]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (token?.length > 0) {
      const data = {
        slug: selectedImage?.post?.slug || selectedImage?.slug,
      };

      const response = await likePost(token, data);

      if (response?.success) {
        setMessage(response.message);
        reload();
        setShowModal(false);
      }
    }
  };

  return (
    <React.Fragment>
      <Modal
        dismissible={true}
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedImage(null);
        }}
      >
        <Modal.Body className="bg-yale-blue rounded-lg text-white shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col justify-between">
              <div className="flex flex-col gap-6">
                <h2 className="text-2xl font-bold">
                  {selectedImage?.post?.title || selectedImage?.title}
                </h2>
                <p className="description max-w-max">
                  {selectedImage?.post?.description ||
                    selectedImage?.description}
                </p>
              </div>
              <Button
                href={`${import.meta.env.VITE_BASE_URL}download/${
                  selectedImage?.post?.slug || selectedImage?.slug
                }`}
                className="mt-6 w-full bg-berkeley-blue text-white hover:bg-blue-800 transition-colors duration-300 shadow-xl"
              >
                Descargar
              </Button>
            </div>
            {token?.length > 0 ? (
              <div className="flex flex-col">
                <Form
                  method="post"
                  className="absolute z-20 top-8 right-8"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <button type="submit" title="Añadir imagen a favorito">
                    <span title="Añadir imagen a favorito">
                      <AiFillHeart
                        className={`${
                          selectedImage && selectedImage?.like != true
                            ? "hover:text-red-500 text-gray-400"
                            : "text-red-500"
                        } transition-colors`}
                        size={32}
                      />
                    </span>
                  </button>
                </Form>
                <img
                  className="h-full max-w-full rounded-lg"
                  src={selectedImage?.post?.image || selectedImage?.image}
                  alt={selectedImage?.post?.title || selectedImage?.title}
                />
              </div>
            ) : (
              <img
                className="h-full max-w-full rounded-lg"
                src={selectedImage?.post?.image || selectedImage?.image}
                alt={selectedImage?.post?.title || selectedImage?.title}
              />
            )}
          </div>
          {show && (
            <Button
              className="my-6 w-full"
              color="failure"
              onClick={() => {
                setSelectedImage(null);
                setShowModal(false);
              }}
            >
              <AiFillCloseCircle size={18} className="mr-2" />
              Cerrar
            </Button>
          )}
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default ImageView;
