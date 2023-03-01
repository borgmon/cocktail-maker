import { bays } from './../../data';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { drinks } from "@/data";
import type { NextApiRequest, NextApiResponse } from "next";

export type Bays = {
  total: number,
  bays: Bay[]
}

export type Bay = {
  ingredient: string,
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Bays>
) {
  const { query, method } = req
  switch (method) {
    case 'GET':
      res.status(200).json(bays);
      break
    case 'POST':
      res.status(200)
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }

}
