import { auth_options } from "app/api/auth/[...nextauth]/auth_options";
import { Card } from "components/Card";
import { CourseInfo } from "components/grade/CourseInfo";
import { get_grade_by_id } from "helper/grade.helper";
import { getServerSession } from "next-auth";

const GradePage = async ({ params }: { params: { id: string } }) => {
  const sesstion = await getServerSession(auth_options);
  const grade = await get_grade_by_id(sesstion!.user, +params.id);
  if (!grade) return;

  return (
    <Card className="!items-start flex-1 flex-col">
      <div className="flex flex-col flex-1 w-full space-y-4">
        <CourseInfo grade={grade} />
      </div>
    </Card>
  );
};

export default GradePage;
