"use client";

import { Listbox, Transition } from "@headlessui/react";
import clsx from "clsx";
import { nanoid } from "nanoid";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useMemo } from "react";
import { HiOutlineCheck, HiOutlineChevronDown } from "react-icons/hi";

export const SelectCourse = () => {
  const { data, update } = useSession();
  const { user } = data ?? {};

  const router = useRouter();
  const pathname = usePathname();

  const selected_course = useMemo(() => user?.selected_course, [user]);

  const on_change = async (value: string) => {
    const new_selected_course = user?.courses.find((course) => course.name === value);
    await update({ selected_course: new_selected_course });

    if (pathname !== "/grades") router.replace("/grades");
    else window.location.reload(); // FIXME: this is done to reload the grades
  };

  return (
    <Listbox value={selected_course?.name} onChange={on_change}>
      <div className="relative">
        <Listbox.Button className="flex h-8 min-w-[8.5rem] items-center justify-between space-x-2 rounded border-2 border-primary bg-primary px-4 text-center text-white shadow-fhwn hover:bg-white hover:text-primary dark:border-white dark:bg-white dark:text-primary dark:hover:bg-primary dark:hover:text-white">
          <span className="block truncate">{selected_course?.name}</span>
          <HiOutlineChevronDown className="h-5 w-5" aria-hidden="true" />
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="mt-1 max-h-60 overflow-auto rounded bg-white p-1 text-base shadow-fhwn focus:outline-none sm:text-sm">
            {user?.courses.map((course) => (
              <Listbox.Option
                key={nanoid()}
                className={({ active }) =>
                  clsx(
                    "relative cursor-pointer select-none rounded py-2 pl-10 pr-4",
                    active && "bg-primary text-white",
                    !active && "text-primary"
                  )
                }
                value={course.name}
              >
                {({ selected }) => (
                  <>
                    <span className="block truncate">{course.name}</span>
                    {selected && (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <HiOutlineCheck className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};
