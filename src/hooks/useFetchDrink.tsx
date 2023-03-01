import { Bays } from "@/pages/api/bays";
import { Drink } from "@/pages/api/drinks";
import { useEffect, useState } from "react";

export default function useFetchDrink(id: string) {
  const [drink, setDrink] = useState<Drink>();

  useEffect(() => {
    fetch("/api/bays"+id)
      .then((data) => data.json())
      .then((json) => setDrink(json));
  });
  return drink
}
