import { Card } from "components/Card";
import { RoundLoadingSpinner } from "components/RoundLoadingSpinner";

const LoadingGrades = () => {
  return (
    <Card className="flex-1 !justify-center">
      <RoundLoadingSpinner />
    </Card>
  );
};

export default LoadingGrades;
