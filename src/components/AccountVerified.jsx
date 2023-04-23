import { Alert } from "flowbite-react";
import { AiFillWarning } from "react-icons/ai";

const AccountVerified = ({ isLogged = false, verified = 1, email = "" }) => {
  if (!isLogged || verified) return null;

  return (
    <Alert
      className="mb-6"
      color="warning"
      rounded
      icon={AiFillWarning}
      withBorderAccent
    >
      <span>
        <span className="font-medium">¡Advertencia!</span> Tu cuenta{" "}
        <strong>{email}</strong> no está verificada.
      </span>
    </Alert>
  );
};

export default AccountVerified;
