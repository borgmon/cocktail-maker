import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { ChangeEvent, useEffect, useState } from "react";
import { Drinks } from "@/pages/api/drinks";
import { DrinkCard } from "@/components/drinkCard";
import { PlusButton } from "@/components/plusButton";
import { Bay, Bays } from "./api/bays";
import { Drink } from "@/pages/api/drinks";
import { useRouter } from "next/router";

export default function NewDrink() {
  const router = useRouter();
  const [bay, setBay] = useState<Bay>({ id: 0, ingredient: "" });
  const [error, setError] = useState<string>();

  const changeAmount = (num: number) => {
    setBay({ ...bay, id: bay.id + num });
  };

  const changeName = (name: string) => {
    setBay({ ...bay, ingredient: name });
  };

  const save = () => {
    setError();
    if (!!!bay.ingredient) {
      setError("ingredient is empty");
      return;
    }
    if (!!!bay.id) {
      setError("id is empty");
      return;
    }
    fetch("/api/bays", {
      method: "POST",
      body: JSON.stringify(bay),
    })
      .then(() => router.push("/bays"))
      .catch((err) => {
        setError(err.toString());
      });
  };

  return (
    <div className="container mx-auto">
      {error && (
        <div
          className="alert alert-warning shadow-lg"
          onClick={() => setError()}
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}
      <div className="my-4">
        <div className="form-control">
          <label className="input-group">
            <span>Ingredient</span>
            <input
              type="text"
              placeholder="Vodka"
              className="input input-bordered"
              onChange={(e) => changeName(e.target.value)}
            />
          </label>
        </div>
      </div>
      <div className="my-4">
        <div className="form-control">
          <label className="input-group">
            <span>Bay #</span>
            <input
              type="text"
              value={bay.id}
              className="input input-bordered"
              readOnly
              disabled
            />
            <span onClick={() => changeAmount(-1)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M5.25 12a.75.75 0 01.75-.75h12a.75.75 0 010 1.5H6a.75.75 0 01-.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <span onClick={() => changeAmount(1)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </label>
        </div>
      </div>
      <div>
        <button className="btn btn-active btn-primary" onClick={() => save()}>
          Save
        </button>
      </div>
    </div>
  );
}
