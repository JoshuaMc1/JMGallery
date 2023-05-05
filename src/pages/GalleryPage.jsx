import { useEffect, useState } from "react";
import Gallery from "../components/Gallery";
import { posts, postsAuth } from "../models/postsModel";
import useGetToken from "../hooks/useGetToken";
import Spinner from "../components/Spinner";

const GalleryPage = () => {
  const [reload, setReload] = useState(true);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useGetToken();

  async function load() {
    if (token?.length > 0) {
      const response = await postsAuth(token);

      if (response?.success) {
        setLoading(false);
        return response.data;
      }
    } else {
      const response = await posts();

      if (response?.success) {
        setLoading(false);
        return response.data;
      }
    }

    setLoading(false);
    return [];
  }

  useEffect(() => {
    if (reload) {
      async function fetchImages() {
        const data = await load();
        setImages(data);
        setReload(false);
      }

      fetchImages();
    }
  }, [reload]);

  function handleReload() {
    setReload(true);
  }

  return (
    <>
      {loading ? (
        <div className="p-8 h-75vh">
          <Spinner text="Cargando publicaciones" />
        </div>
      ) : images.length > 0 ? (
        <div className="min-h-75vh">
          <Gallery images={images} reload={handleReload} />
        </div>
      ) : (
        <div className="p-8 h-75vh">
          <div className="bg-yale-blue text-center flex flex-col mx-auto h-full justify-center align-center items-center rounded-xl shadow-xl">
            <h2 className="text-4xl font-bold text-white mb-4">
              Al parecer aun no hay imágenes
            </h2>
            <p className="text-2xl font-semibold text-white">
              Se el primero en publicar imágenes.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default GalleryPage;
