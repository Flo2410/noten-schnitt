"use client";

import { nanoid } from "nanoid";
import { useSession } from "next-auth/react";
import { ChangeEvent } from "react";

export const SelectCourse = () => {
  const session = useSession();

  const on_change = async (e: ChangeEvent<HTMLSelectElement>) => {
    const selected_course = session.data?.user.courses.find(
      (course) => course.name === e.target.value
    );
    await session.update({ selected_course: selected_course });
  };

  return (
    <select onChange={on_change} value={session.data?.user.selected_course.name}>
      {session.data?.user.courses.map((course) => (
        <option key={nanoid()}>{course.name}</option>
      ))}
    </select>
  );
};
