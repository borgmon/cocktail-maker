import { Bays } from "@/pages/api/bays";
import { Drink } from "@/pages/api/drinks";
import { useEffect, useState } from "react";

export default function useFetchDrink(id: string) {
  const [drink, setDrink] = useState<Drink>();

  useEffect(() => {
    fetch("/api/drinks/" + id)
      .then((data) => data.json())
      .then((json) => 
      {console.log(json);
      setDrink(json);});
  },[]);
  return drink;
}

export function DelDrink(id: string) {
  return fetch("/api/drinks/" + id, {
    method: "DELETE",
  })
  .catch((e) => console.error(e));
}
