import { Res } from './drinks';
import { bays } from './../../data';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { drinks } from "@/data";
import type { NextApiRequest, NextApiResponse } from "next";

export type Bays = {
  bays: Bay[]
}

export type Bay = {
  ingredient: string,
  id: number,
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Bays|Res>
) {
  const { query, method } = req
  switch (method) {
    case 'GET':
      res.status(200).json(bays);
      break
    case 'POST':
      const newBay = JSON.parse(req.body) as Bay
      bays.bays.push(newBay)
      res.status(200).json({ "status": "ok" })
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }

}
