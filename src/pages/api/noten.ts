import type { NextApiRequest, NextApiResponse } from "next";
import nodeFetch from "node-fetch";
import fetchCookie from "fetch-cookie";

const fetch = fetchCookie(nodeFetch);

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const data = await fetch(
    "https://intranet.fhwn.ac.at/services/noten/noten.aspx?matnummer=2010830009",
    {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0",
        Cookie: JSON.parse(req.body).cookie,
      },
    }
  );

  console.log(data);

  res.status(200).send(data.body);
}
