import {
  DrinkCardProps,
  DrinkCardSingle,
  DrinkCardSingleProps,
} from "@/components/drinkCard";
import React, { useEffect, useState } from "react";
import { Drink } from "@/pages/api/drinks";
import { Bays } from "@/pages/api/bays";

export default function BaysPage() {
  const [bays, setBays] = useState<Bays>({  bays: [] });

  useEffect(()=>{
    fetch('/api/bays')
    .then((data)=>data.json())
    .then((json)=>setBays(json))
  })

  return (
    <div className="container mx-auto">
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Bay#</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {bays.bays.map((bay, i) => (
              <tr key={i}>
                <td>{bay.id}</td>
                <td>{bay.ingredient}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
