import {
  DrinkCardProps,
  DrinkCardSingle,
  DrinkCardSingleProps,
} from "@/components/drinkCard";
import React, { useEffect, useState } from "react";
import { Drink } from "@/pages/api/drinks";
import { Bays } from "@/pages/api/bays";
import { PlusButton } from "@/components/plusButton";
import { useRouter } from "next/router";
import useFetchBays from "@/hooks/useFetchBays";

export default function BaysPage() {
  const bays = useFetchBays()
  const router = useRouter()

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
      <PlusButton callback={()=>{router.push("/new-bay")}}></PlusButton>

    </div>
  );
}
