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

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Drinks>
) {
  const { query, method } = req
  switch (method) {
    case 'GET':
      res.status(200).json(drinks);
      break
    case 'POST':
      res.status(200)
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }

}
