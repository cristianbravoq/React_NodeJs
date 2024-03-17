import "./modal.scss";
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { Transition, Dialog } from "@headlessui/react";
import { Fragment, useState } from "react";


const Modal = ({ ComponentOpen, ComponentBody }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div onClick={handleOpen} className="container--open">
        {ComponentOpen}
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" onClose={handleClose} className="container--body">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="h-100 align-items-center justify-content-center px-5 text-center overflow-scroll">
              {ComponentBody}

              <div className="m-2 text-center">
                <button
                  type="button"
                  className="btn btn-secondary button--close"
                  onClick={handleClose}
                >
                  <CancelRoundedIcon />
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
