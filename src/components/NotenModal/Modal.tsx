import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FaTimes } from "react-icons/fa";
import Button from "../Button";

const Modal = ({
  children,
  className = "",
  isOpen,
  closeModal,
  title,
  onClose = () => null,
  onOpen = () => null,
}: {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  title: string;
  closeModal: () => void;
  onClose?: () => void;
  onOpen?: () => void;
}): JSX.Element => {
  const [wasOpen, setWasOpen] = useState(false);

  useEffect(() => {
    // open
    if (isOpen && !wasOpen) {
      onOpen();
      setWasOpen(true);
    }

    // close
    else if (!isOpen && wasOpen) {
      onClose();
      setWasOpen(false);
    }
  }, [isOpen]);

  return (
    <>
      <Transition show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          static
          open={isOpen}
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 backdrop-filter backdrop-blur-md" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="hidden h-screen align-middle sm:inline-block" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div
                className={`inline-block w-full p-6 my-8 overflow-hidden text-left align-middle bg-white dark:bg-primary transition-all transform rounded-md shadow-xl lg:w-3/4 xl:w-2/3 2xl:w-1/2 ${className}`}
              >
                <Dialog.Title as="h2" className="mb-4 text-2xl leading-6 heading">
                  {title}

                  <Button className="absolute cursor-pointer top-2 right-2" onClick={closeModal}>
                    <FaTimes />
                  </Button>
                </Dialog.Title>

                {children}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
