import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { ChangeEvent, useEffect, useState } from "react";
import { Drinks } from "@/pages/api/drinks";
import { DrinkCard } from "@/components/drinkCard";
import { PlusButton } from "@/components/plusButton";
import { Bays } from "./api/bays";
import { Drink } from "@/pages/api/drinks";
import { useRouter } from "next/router";
import {
  AlertMessage,
  AlertMessageProps,
  AlertMessageType,
  AlertType,
} from "@/components/alert";

export default function NewDrink() {
  const router = useRouter();
  const [drink, setDrink] = useState<Drink>({
    id: 0,
    name: "",
    ingredients: [],
  });
  const [bays, setBays] = useState<Bays>({ bays: [] });
  const [alert, setAlert] = useState<AlertMessageType>({
    type: AlertType.warning,
    msg: "",
  });

  useEffect(() => {
    fetch("/api/bays")
      .then((data) => data.json())
      .then((json) => setBays(json));
  }, []);

  const addRow = (thing: string) => {
    drink.ingredients.push({ name: thing, amount: 0.5 });
    setDrink({ ...drink, ingredients: drink.ingredients });
  };
  const delRow = (thing: string) => {
    drink.ingredients = drink.ingredients.filter((ing) => ing.name !== thing);
    setDrink({ ...drink, ingredients: drink.ingredients });
  };

  const changeAmount = (name: string, num: number) => {
    const i = drink.ingredients.findIndex((ing) => {
      return ing.name === name;
    });
    if (drink.ingredients[i].amount + num === 0) {
      delRow(name);
      return;
    }
    drink.ingredients[i].amount += num;
    setDrink({ ...drink, ingredients: drink.ingredients });
  };
  const changeName = (name: string) => {
    setDrink({ ...drink, name: name });
  };

  const ingInDrink = (name: string) => {
    return !!drink.ingredients.find((ing) => ing.name === name);
  };

  const saveDrink = () => {
    setAlert({ type: AlertType.warning, msg: "" });
    if (!!!drink.name) {
      setAlert({ type: AlertType.warning, msg: "name is empty" });
      return;
    }
    if (drink.ingredients.length === 0) {
      setAlert({ type: AlertType.warning, msg: "ingredients are empty" });
      return;
    }
    fetch("/api/drinks", {
      method: "POST",
      body: JSON.stringify(drink),
    })
      .then(() => router.push("/"))
      .catch((err) => {
        setAlert({ type: AlertType.error, msg: err });
      });
  };

  return (
    <div className="container mx-auto">
      <AlertMessage
        type={alert.type}
        msg={alert.msg}
        onClick={() => setAlert({ ...alert, msg: "" })}
      ></AlertMessage>
      <div className="my-4">
        <div className="form-control">
          <label className="input-group">
            <span>Name</span>
            <input
              type="text"
              placeholder="Martini"
              className="input input-bordered"
              onChange={(e) => changeName(e.target.value)}
            />
          </label>
        </div>
      </div>
      <div>
        {drink.ingredients.map((ing, i) => (
          <div key={i} className="my-3">
            <div className="form-control">
              <label className="input-group">
                <span>{ing.name}</span>
                <input
                  type="text"
                  value={ing.amount}
                  className="input input-bordered"
                  readOnly
                  disabled
                />
                <span onClick={() => changeAmount(ing.name, -0.5)}>
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
                <span onClick={() => changeAmount(ing.name, 0.5)}>
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
        ))}
      </div>
      <div className="my-2">
        <div className="dropdown">
          <label tabIndex={0} className="btn m-1 btn-accent">
            Add Ingredient
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            {bays.bays.map(
              (bay, i) =>
                !ingInDrink(bay.ingredient) && (
                  <li key={i}>
                    <a onClick={() => addRow(bay.ingredient)}>
                      {bay.ingredient}
                    </a>
                  </li>
                )
            )}
          </ul>
        </div>
      </div>
      <div>
        <button
          className="btn btn-active btn-primary"
          onClick={() => saveDrink()}
        >
          Save
        </button>
      </div>
    </div>
  );
}
