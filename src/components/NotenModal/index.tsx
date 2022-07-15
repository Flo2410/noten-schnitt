import { ModalContext } from "context/ModalContext";
import React, { useContext } from "react";
import { ModalPayloadType } from "types/modal.types";
import CourseOverview from "./CourseOverview";
import Modal from "./Modal";
import TimeTable from "./TimeTable";

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
          <TimeTable modal={modal} />
          <CourseOverview modal={modal} />
        </div>
      )}
    </Modal>
  );
};

export default NotenModal;
