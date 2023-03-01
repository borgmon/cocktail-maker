import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Drinks } from "@/pages/api/drinks";
import { DrinkCard } from "@/components/drinkCard";
import { PlusButton } from "@/components/plusButton";
import { Bay, Bays } from "./api/bays";
import { Drink } from "@/pages/api/drinks";
import { useRouter } from "next/router";
import useFetchBays from "@/hooks/useFetchBays";
import {
  AlertMessage,
  AlertMessageProps,
  AlertMessageType,
  AlertType,
} from "@/components/alert";
import { AlertContext } from "@/contexts/AlertContext";

export default function NewDrink() {
  const router = useRouter();
  const [bay, setBay] = useState<Bay>({ id: 0, ingredient: "" });
  const bays = useFetchBays();
  const [alert, setAlert] = useState<AlertMessageType>({
    type: AlertType.warning,
    msg: "",
  });

  const changeAmount = (num: number) => {
    setBay({ ...bay, id: bay.id + num });
  };

  const changeName = (name: string) => {
    setBay({ ...bay, ingredient: name });
  };

  const save = () => {
    setAlert({ ...alert, msg: "" });
    if (!!!bay.ingredient) {
      setAlert({ type: AlertType.warning, msg: "ingredient is empty" });
      return;
    }
    if (!!!bay.id) {
      setAlert({ type: AlertType.warning, msg: "id is empty" });
      return;
    }
    if (bays.bays.find((exist) => exist.id === bay.id)) {
      setAlert({ type: AlertType.warning, msg: "bay is occupied" });
      return;
    }
    fetch("/api/bays", {
      method: "POST",
      body: JSON.stringify(bay),
    })
      .then(() => {
        router.push({
          pathname: "/bays",
          query: {
            msg: "save success",
          },
        });
      })
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
