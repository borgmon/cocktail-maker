// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { drinks } from "@/data";
import type { NextApiRequest, NextApiResponse } from "next";

export type Drinks = {
  drinks: Drink[]
}

export type Drink = {
  id: number,
  name: string,
  ingredients: Ingredient[],
}

export type Ingredient = {
  name: string,
  amount: number,
}
export type Res = {
  status: string,
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Drinks | Res>
) {
  const { query, method } = req
  switch (method) {
    case 'GET':
      res.status(200).json(drinks);
      break
    case 'POST':
      const body = JSON.parse(req.body) as Drink
      drinks.drinks.push(body)
      res.status(200).json({ "status": "ok" })
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }

}
