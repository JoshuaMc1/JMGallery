import { Alert } from "flowbite-react";
import { AiFillWarning } from "react-icons/ai";

const AccountVerified = ({ isLogged = false, verified = 1, email = "" }) => {
  return (
    <>
      {isLogged && !verified && (
        <Alert
          className="mb-6"
          color={"warning"}
          rounded={true}
          icon={AiFillWarning}
          withBorderAccent={true}
        >
          <span>
            <span className="font-medium">Advertencia!</span> Tu cuenta{" "}
            <strong>{email}</strong> no está verificada.
          </span>
        </Alert>
      )}
    </>
  );
};

export default AccountVerified;
