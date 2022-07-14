//--------------------------------------------------------------------------------------------------------------------------------------------
// Types
//--------------------------------------------------------------------------------------------------------------------------------------------
export type Course = {
  fullname: string;
  id: string;
  course_overview: CourseOverview;
  timetable: CourseTimetable;
};

export type CourseOverviewEntry = {
  key: string;
  value: string;
};

export type CourseOverview = Array<CourseOverviewEntry>;

export type CourseTimetableEntry = {
  date: string;
  day: string;
  start_time: string;
  end_time: string;
  lecturer: string;
  room: string;
  distance_learning: string;
  exam: string;
};

export type CourseTimetable = Array<CourseTimetableEntry>;

export type CoursePreview = Pick<Course, "id" | "fullname">;

export type CoursePreviewList = Array<CoursePreview>;
