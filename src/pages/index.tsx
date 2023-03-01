import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import { Drinks } from "@/pages/api/drinks";
import { DrinkCard } from "@/components/drinkCard";
import { PlusButton } from "@/components/plusButton";
import { useRouter } from "next/router";


export default function Home() {
  const router = useRouter()
  const [drinks, setDrinks] = useState<Drinks>({ drinks: [] });
  useEffect(() => {
    fetch("/api/drinks")
      .then((res) => res.json())
      .then((json) => setDrinks(json))
      .catch((err) => console.log(err));
  });
  return (
    <>
      <div className="px-4 mx-auto">
        <DrinkCard drinks={drinks?.drinks!}></DrinkCard>
      </div>
      <PlusButton callback={()=>{router.push("/new-drink")}}></PlusButton>
    </>
  );
}
