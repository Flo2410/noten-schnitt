import { Card } from "components/Card";
import { CourseInfo } from "components/grade/CourseInfo";

const GradePage = ({ params }: { params: { id: string } }) => {
  return (
    <Card>
      <div className="flex flex-col w-full space-y-4">
        <CourseInfo grade_id={params.id} />
      </div>
    </Card>
  );
};

export default GradePage;
