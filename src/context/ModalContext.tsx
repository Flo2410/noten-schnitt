import { getCourseInfo } from "helper/apicalls";
import React, {
  createContext,
  useReducer,
  Dispatch,
  ReactNode,
  useEffect,
  useContext,
} from "react";
import { DEFAULT_MODAL, ModalContent, ModalActions, ModalPayloadType } from "types/modal.types";
import { UserContext } from "./UserContext";

export const ModalContext = createContext<{
  state: ModalContent;
  dispatch: Dispatch<ModalActions>;
}>({
  state: DEFAULT_MODAL,
  dispatch: () => null,
});

const reducer = (state: ModalContent, action: ModalActions) => {
  switch (action.type) {
    case ModalPayloadType.INIT:
      return action.payload;
    case ModalPayloadType.UPDATE_CONTENT:
      return { ...state, ...{ content: action.payload } };
    case ModalPayloadType.OPEN:
      return { ...state, ...{ ...{ is_open: true }, ...action.payload } };
    case ModalPayloadType.CLOSE:
      return { ...state, ...{ is_open: false } };
    case ModalPayloadType.RESET:
      return DEFAULT_MODAL;
  }
};

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, DEFAULT_MODAL);
  const { state: user } = useContext(UserContext);

  useEffect(() => {
    const load_course = async () => {
      const course = await getCourseInfo(user.cookies, state.course_req_params).catch(() => {
        throw new Error("Could not load course info!");
      });

      dispatch({ type: ModalPayloadType.UPDATE_CONTENT, payload: course });
    };

    if (state.is_open) load_course();
    else {
      // Timout so to reset after closing animation
      setTimeout(() => {
        dispatch({ type: ModalPayloadType.RESET });
      }, 200);
    }
  }, [state.is_open]);

  return <ModalContext.Provider value={{ state, dispatch }}>{children}</ModalContext.Provider>;
};
