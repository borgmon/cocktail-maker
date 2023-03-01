import { bays } from '@/data';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Res } from '../drinks';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Res>
) {
  const { query, method } = req
  switch (method) {
    case 'DELETE':
      bays.bays = bays.bays.filter((exist) => exist.id.toString() !== req.query.id)
      res.status(200).json({ "status": "ok" });
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }

}
