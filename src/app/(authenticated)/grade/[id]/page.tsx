import { auth_options } from "app/api/auth/[...nextauth]/auth_options";
import { Card } from "components/Card";
import { CourseInfo } from "components/grade/CourseInfo";
import { PDFView } from "components/grade/PDFView";
import { get_grade_by_id } from "helper/grade.helper";
import { getServerSession } from "next-auth";

const GradePage = async ({ params }: { params: { id: string } }) => {
  const sesstion = await getServerSession(auth_options);
  const grade = await get_grade_by_id(sesstion!.user, +params.id);
  if (!grade) return;

  return (
    <Card className="flex-1 flex-col !items-start">
      <div className="flex w-full flex-1 flex-col space-y-4">
        <CourseInfo grade={grade} />
        <PDFView course_id={grade.moodle_info.id} />
      </div>
    </Card>
  );
};

export default GradePage;
