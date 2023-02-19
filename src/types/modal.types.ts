//--------------------------------------------------------------------------------------------------------------------------------------------
// Enums
//--------------------------------------------------------------------------------------------------------------------------------------------

import { ActionMap } from "./context.types";
import { Course, CourseRequestParams, DEFAULT_COURSE } from "./course.types";

export enum ModalPayloadType {
  INIT = "INIT_MODAL",
  UPDATE_CONTENT = "UPDATE_CONTENT_MODAL",
  OPEN = "OPEN_MODAl",
  CLOSE = "CLOSE_MODAL",
  RESET = "RESET_MODAL",
  SET_ERROR = "SET_ERROR_MODAL",
}

//--------------------------------------------------------------------------------------------------------------------------------------------
// Types
//--------------------------------------------------------------------------------------------------------------------------------------------
export type ModalContent = {
  title: string;
  is_open: boolean;
  is_error: boolean;
  course_req_params: CourseRequestParams;
  content: Course;
};

export type ModalPayload = {
  [ModalPayloadType.INIT]: ModalContent;
  [ModalPayloadType.UPDATE_CONTENT]: Course;
  [ModalPayloadType.OPEN]: Pick<ModalContent, "title" | "course_req_params">;
  [ModalPayloadType.CLOSE]: undefined;
  [ModalPayloadType.SET_ERROR]: boolean;
  [ModalPayloadType.RESET]: undefined;
};

export type ModalActions = ActionMap<ModalPayload>[keyof ActionMap<ModalPayload>];

//--------------------------------------------------------------------------------------------------------------------------------------------
// Constants
//--------------------------------------------------------------------------------------------------------------------------------------------

export const DEFAULT_MODAL: ModalContent = {
  title: "Modal",
  is_open: false,
  is_error: false,
  course_req_params: {
    course_fullname: "",
    course_semester: "",
  },
  content: DEFAULT_COURSE,
};
