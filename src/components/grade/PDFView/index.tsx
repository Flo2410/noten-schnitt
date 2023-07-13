import { auth_options } from "app/api/auth/[...nextauth]/auth_options";
import Button from "components/Button";
import { get_course_info_pdf_url } from "helper/moodle/courses";
import { getServerSession } from "next-auth";
import { FC } from "react";

export const PDFView: FC<{ course_id: number }> = async ({ course_id }) => {
  const session = await getServerSession(auth_options);
  if (!session) return;

  const pdf_url = await get_course_info_pdf_url(session.user.moodle_user, course_id);
  if (!pdf_url) return;

  return (
    <object type="application/pdf" data={pdf_url} className="grow">
      <div className="flex flex-col items-center justify-center space-y-2">
        <p className="text-center">
          Your web browser doesn&apos;t have a PDF plugin. Instead you can download the
          PDF file.
        </p>
        <a href={`${pdf_url}?token=${session.user.moodle_user.token}`} download={true}>
          <Button>Download</Button>
        </a>
      </div>
    </object>
  );
};
