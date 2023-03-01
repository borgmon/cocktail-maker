import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import { Drinks } from "@/pages/api/drinks";
import { DrinkCard } from "@/components/drinkCard";
import { PlusButton } from "@/components/plusButton";
import { useRouter } from "next/router";
import useFetchDrinks from "@/hooks/useFetchDrinks";


export default function Home() {
  const router = useRouter()
  const drinks = useFetchDrinks()
  
  return (
    <>
      <div className="px-4 mx-auto my-5">
        <DrinkCard drinks={drinks?.drinks!}></DrinkCard>
      </div>
      <PlusButton callback={()=>{router.push("/new-drink")}}></PlusButton>
    </>
  );
}
