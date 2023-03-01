import { drinks } from '@/data';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Drink, Res } from '../drinks';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Drink|Res>
) {
  const { query, method } = req
  switch (method) {
    case 'GET':
      const drink = drinks.drinks.find((drink) => { return drink.id.toString() === req.query.id })
      if (drink) {
        res.status(200).json(drink);
      } else {
        res.status(404)
      }
      break
    case 'POST':
      res.status(200)
      break
    case 'DELETE':
      drinks.drinks = drinks.drinks.filter((exist) => exist.id.toString() !== req.query.id)
      res.status(200).json({ "status": "ok" });
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }

}
