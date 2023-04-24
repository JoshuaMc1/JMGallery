import { Link } from "react-router-dom";
import { getFavoritePosts } from "../../models/postsModel";
import Gallery from "../../components/Gallery";
import { useState, useEffect } from "react";
import useGetToken from "../../hooks/useGetToken";
import Spinner from "../../components/Spinner";

const FavoritePosts = () => {
  const [reload, setReload] = useState(true);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useGetToken();

  async function load() {
    if (token?.length > 0) {
      const response = await getFavoritePosts(token);

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
      async function fetchPosts() {
        const data = await load();
        setPosts(data);
        setReload(false);
      }

      fetchPosts();
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
      ) : posts?.length > 0 ? (
        <div className="min-h-75vh">
          <div className="w-full mb-6">
            <h1 className="text-4xl text-white font-bold">
              Mis publicaciones favoritas
            </h1>
          </div>
          <Gallery images={posts} reload={handleReload} isDownloadable={true} />
        </div>
      ) : (
        <div className="p-8 h-75vh">
          <div className="bg-yale-blue flex flex-col mx-auto h-full justify-center align-center items-center rounded-xl shadow-xl">
            <h2 className="text-4xl font-bold text-white mb-4">
              Al parecer aun no tienes publicaciones favoritas
            </h2>
            <Link
              className="mt-12 py-3 px-4 text-xl font-semibold rounded-lg bg-white text-blue-800 hover:bg-blue-800 hover:text-white transition-colors duration-300 shadow-xl"
              to="/"
            >
              Ir a Inicio
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default FavoritePosts;
