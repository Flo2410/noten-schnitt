import Button from "components/Button";
import { ModalContext } from "context/ModalContext";
import { useGlobalLogout } from "hooks/useLogout";
import React, { useContext } from "react";
import { ModalPayloadType } from "types/modal.types";
import CourseOverview from "./CourseOverview";
import Modal from "./Modal";
import TimeTable from "./TimeTable";

const NotenModal = () => {
  const { state: modal, dispatch: dispatchModal } = useContext(ModalContext);

  const globalLogout = useGlobalLogout();

  return (
    <Modal
      isOpen={modal.is_open}
      closeModal={() => dispatchModal({ type: ModalPayloadType.CLOSE })}
      title={modal.is_error ? "" : modal.title}
    >
      {modal.content && !modal.is_error && (
        <div className="paragraph">
          <TimeTable modal={modal} />
          <CourseOverview modal={modal} />
        </div>
      )}

      {modal.is_error && (
        <div className="flex flex-col items-center justify-center">
          <h4 className="text-4xl font-bold text-red-500">Error</h4>
          <p>Konnte die Kursinformation nicht laden.</p>
          <p>Bitte logge dich errneut ein!</p>
          <Button
            className="my-2"
            onClick={() => {
              dispatchModal({ type: ModalPayloadType.CLOSE });
              globalLogout();
            }}
          >
            Login
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default NotenModal;
