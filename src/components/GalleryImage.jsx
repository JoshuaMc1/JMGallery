import { useCallback } from "react";

const GalleryImage = ({ image, onImageClick, setShowModal }) => {
  const handleClick = useCallback(() => {
    onImageClick(image);
    setShowModal(true);
  }, [image, onImageClick, setShowModal]);

  return (
    <div
      className={`${image?.post?.nsfw === 1 && "blur-effect"} relative group`}
    >
      <img
        className="h-full max-w-full rounded-lg cursor-pointer hover:opacity-75 transition-opacity ease-in-out duration-300"
        src={image.post?.image || image?.image}
        alt={image.post?.title || image?.title}
        title={image.post?.title || image?.title}
        loading="lazy"
      />
      <div className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-gray-900 bg-opacity-75 transition-opacity ease-in-out duration-300 flex items-center justify-center">
        <div className="text-center flex flex-col gap-4">
          <button
            className="py-2 px-3 w-full h-full text-center rounded-md text-white bg-transparent hover:bg-blue-800 transition-colors duration-300"
            onClick={handleClick}
          >
            Ver imagen
          </button>
        </div>
      </div>
    </div>
  );
};

export default GalleryImage;
