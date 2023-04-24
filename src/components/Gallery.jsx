import React, { useState, useEffect, useCallback, lazy, Suspense } from "react";
import Spinner from "./Spinner";
import ImageView from "./ImageView";
import { HiCheckCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";

const GalleryImage = lazy(() => import("./GalleryImage"));

function Gallery({ images, reload, isDownloadable }) {
  const [columns, setColumns] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  const handleImageClick = useCallback((image) => {
    setSelectedImage(image);
  }, []);

  useEffect(() => {
    if (images && images.length > 0) {
      const numColumns = Math.min(images.length, 6);
      const colArray = new Array(numColumns).fill().map(() => []);

      images.forEach((image, index) => {
        const columnIndex = index % numColumns;
        colArray[columnIndex].push(image);
      });

      setColumns(colArray);
    }
  }, [images]);

  useEffect(() => {
    if (message.length > 0) {
      setShow(true);
    }

    setTimeout(() => {
      setShow(false);
    }, 2500);
  }, [message]);

  const handleDismiss = () => {
    setSelectedImage(null);
    setMessage("");
  };

  return (
    <>
      {show && (
        <div className="flex content-center items-center justify-center mb-4">
          <Alert
            icon={HiCheckCircle}
            color={"success"}
            onDismiss={handleDismiss}
          >
            <span title="Notificación">{message}</span>
          </Alert>
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
        {columns.map((col, index) => (
          <div className="grid gap-2" key={index}>
            <Suspense fallback={<Spinner text="Cargando imagen..." />}>
              {col.map((image) => (
                <GalleryImage
                  key={`gallery-image-${image.id}`}
                  image={image}
                  setShowModal={setShowModal}
                  onImageClick={handleImageClick}
                  isDownloadable={isDownloadable}
                />
              ))}
            </Suspense>
          </div>
        ))}
        <ImageView
          selectedImage={selectedImage}
          showModal={showModal}
          setShowModal={setShowModal}
          setSelectedImage={setSelectedImage}
          reload={reload}
          setMessage={setMessage}
        />
      </div>
    </>
  );
}

export default Gallery;
