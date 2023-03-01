import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import { Drinks } from "@/pages/api/drinks";
import { DrinkCard } from "@/components/drinkCard";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [drinks, setDrinks] = useState<Drinks>({ drinks: [] });
  useEffect(() => {
    fetch("/api/drinks")
      .then((res) => res.json())
      .then((json) => setDrinks(json))
      .catch((err) => console.log(err));
  });
  return (
    <div className="mx-5">
      <DrinkCard drinks={drinks?.drinks!}></DrinkCard>
    </div>
  );
}
