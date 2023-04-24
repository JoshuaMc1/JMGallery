import { Button, Modal } from "flowbite-react";
import React from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const Confirm = ({
  showConfirm = false,
  setShowConfirm,
  message = "Mensaje por defecto",
  optionYes = "Si",
  optionNo = "No",
  setDeletePost = false,
}) => {
  const handleClose = () => {
    setDeletePost(false);
    setShowConfirm(false);
  };
  const handleDelete = () => {
    setDeletePost(true);
    setShowConfirm(false);
  };

  return (
    <React.Fragment>
      <Modal show={showConfirm} size="md" popup={true} onClose={handleClose}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {message}
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDelete}>
                {optionYes}
              </Button>
              <Button color="gray" onClick={handleClose}>
                {optionNo}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default Confirm;
