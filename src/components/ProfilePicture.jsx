import { Avatar, FileInput } from "flowbite-react";
import { initials } from "../helpers/helpers.js";
import { useState } from "react";

const ProfilePicture = ({ photoProfile, name = "" }) => {
  const [image, setImage] = useState(photoProfile || null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col w-full gap-4">
      {image ? (
        <div className="flex">
          <img
            className="rounded-md w-56 h-auto"
            src={image}
            alt={`Profile for ${name}`}
          />
        </div>
      ) : (
        <div className="flex">
          <Avatar
            placeholderInitials={initials(name)}
            size={"xl"}
            alt="Foto de perfil"
          />
        </div>
      )}
      <div id="fileUpload">
        <FileInput
          id="file"
          name="profile"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </div>
    </div>
  );
};

export default ProfilePicture;
