import { auth_options } from "app/api/auth/[...nextauth]/auth_options";
import { get_course_info_pdf_url } from "helper/moodle/courses";
import { getServerSession } from "next-auth";
import { FC } from "react";

export const PDFView: FC<{ course_id: number }> = async ({ course_id }) => {
  const session = await getServerSession(auth_options);
  if (!session) return;

  const pdf = await get_course_info_pdf_url(session.user.moodle_user, course_id);
  if (!pdf) return;

  return (
    <embed
      type="application/pdf"
      src={`${pdf}?token=${session.user.moodle_user.token}`}
      className="grow"
    />
  );
};
