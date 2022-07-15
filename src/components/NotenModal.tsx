import { ModalContext } from "context/ModalContext";
import React, { useContext } from "react";
import { ModalPayloadType } from "types/modal.types";
import Modal from "./Modal";

const NotenModal = () => {
  const { state: modal, dispatch: dispatchModal } = useContext(ModalContext);

  return (
    <Modal
      isOpen={modal.is_open}
      closeModal={() => dispatchModal({ type: ModalPayloadType.CLOSE })}
      title={modal.title}
    >
      {modal.content && (
        <div className="paragraph">
          {modal.content.fullname} {modal.content.id}
        </div>
      )}
    </Modal>
  );
};

export default NotenModal;
