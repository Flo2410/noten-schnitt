import "server-only";

import pdf_parse from "@cyber2024/pdf-parse-fixed";

export const get_raw_course_info_from_pdf = async (pdf_url: string) => {
  const res = await fetch(pdf_url);

  const blob = await res.blob();
  const array_buf = await blob.arrayBuffer();
  const buffer = Buffer.from(array_buf, "binary");

  const raw_data = await pdf_parse(buffer, { max: 1 });

  const data = raw_data.text
    .split("\n")
    .map((val) => val.trim())
    .filter((val) => val !== "")
    .splice(3);
  // .map((val, i, arr) => {
  //   if (i % 2 === 0) return [val, arr[i + 1]];
  //   return [];
  // })
  // .filter((arr) => arr.length > 0);

  return data;
};

export const get_ects_for_course = (raw_pdf_info: string[]): number | undefined => {
  if (raw_pdf_info.length === 0) return undefined;
  const ects_index = raw_pdf_info.findIndex((val) => val === "ECTS");
  return +raw_pdf_info[ects_index + 1];
};
