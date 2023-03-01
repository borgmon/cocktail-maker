import {
  DrinkCardProps,
  DrinkCardSingle,
  DrinkCardSingleProps,
} from "@/components/drinkCard";
import React, { useEffect, useState } from "react";
import { Drink } from "@/pages/api/drinks";
import useFetchDrink from "@/hooks/useFetchDrink";

export async function getServerSideProps(context: { query: { id: any } }) {
  return {
    props: {
      id: context.query.id,
    },
  };
}

export default function Drinks({ id }: { id: string }) {
  const [progress, setProgress] = useState(0);
  const drink = useFetchDrink(id);

  useEffect(() => {
    if (progress < 100) {
      const interval = setInterval(() => {
        setProgress(progress + 10);
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [progress]);

  const styles = {
    "--value": progress,
    "--size": "12rem",
    "--thickness": "2rem",
  };

  return (
    <>
      <div className="container mx-auto w-max my-5">
        <DrinkCardSingle drink={drink}></DrinkCardSingle>
      </div>
      <div className="container mx-auto my-5 text-center">
        <progress
          className="progress progress-primary w-60"
          value={progress}
          max="100"
        ></progress>

        <h1>Please wait!</h1>
      </div>
    </>
  );
}
