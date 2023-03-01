import { Bays } from "@/pages/api/bays";
import { useEffect, useState } from "react";

export default function useFetchBays() {
  const [bays, setBays] = useState<Bays>({ bays: [] });

  useEffect(() => {
    fetch("/api/bays")
      .then((data) => data.json())
      .then((json) => setBays(json));
  },[]);
  return bays
}
export function DelBay(id: number) {
  return fetch("/api/bays/" + id, {
    method: "DELETE",
  })
  .catch((e) => console.error(e));
}
