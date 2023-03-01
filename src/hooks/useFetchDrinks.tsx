import { Bays } from "@/pages/api/bays";
import { Drinks } from "@/pages/api/drinks";
import { useEffect, useState } from "react";

export default function useFetchDrinks() {
  const [drinks, setDrinks] = useState<Drinks>({ drinks: [] });

  useEffect(() => {
    fetch("/api/drinks")
      .then((data) => data.json())
      .then((json) => setDrinks(json));
  },[]);
  return drinks
}
