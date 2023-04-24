import { Badge, Button } from "flowbite-react";
import { useCallback } from "react";
import { AiFillHeart } from "react-icons/ai";
import { BsFillExclamationDiamondFill } from "react-icons/bs";

const GalleryImage = ({
  image,
  onImageClick,
  setShowModal,
  isDownloadable = false,
}) => {
  const handleImageClick = useCallback(() => {
    onImageClick(image);
    setShowModal(true);
  }, [image, onImageClick, setShowModal]);

  const { post } = image;

  return (
    <div className={`${image?.nsfw === 1 && "blur-effect"} relative group`}>
      <div className="absolute top-0 left-0 p-2 flex gap-3">
        {image.like ? (
          <Badge color={"failure"}>
            <div className="flex flex-row gap-2">
              <AiFillHeart
                className="text-red-500 transition-colors"
                size={16}
              />
              Favorito
            </div>
          </Badge>
        ) : null}

        {image.nsfw === 1 ? (
          <Badge color="failure" className="text-red-800">
            <div className="flex flex-row gap-2">
              <BsFillExclamationDiamondFill
                className="text-red-500 transition-colors"
                size={16}
              />
              NSFW
            </div>
          </Badge>
        ) : null}
      </div>
      <img
        className="h-full max-w-full rounded-lg cursor-pointer hover:opacity-75 transition-opacity ease-in-out duration-300"
        src={post?.image || image?.image}
        alt={post?.title || image?.title}
        title={post?.title || image?.title}
        loading="lazy"
        onClick={handleImageClick}
      />
      <div className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-gray-900 bg-opacity-75 transition-opacity ease-in-out duration-300 flex items-center justify-center">
        <div className="text-center flex flex-col gap-4">
          <button
            className="py-2 px-3 w-full h-full text-center rounded-md text-white bg-transparent hover:bg-blue-800 transition-colors duration-300"
            onClick={handleImageClick}
          >
            Ver imagen
          </button>
          {isDownloadable && (
            <Button
              href={`${import.meta.env.VITE_BASE_URL}download/${
                post?.slug || image?.slug
              }`}
              className="w-full h-full text-center rounded-md text-white bg-transparent hover:bg-green-800 transition-colors duration-300"
              target="_blank"
            >
              Descargar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryImage;
