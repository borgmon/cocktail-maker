import { Bays } from "./pages/api/bays";
import { Drinks } from "./pages/api/drinks";

export let drinks: Drinks = {
  drinks: [
    {
      id: 1,
      name: "Martini",
      ingredients: [
        {
          name: "gin",
          amount: 2.5,
        },
        {
          name: "dry vermouth",
          amount: 0.5,
        },
      ],
    },
    {
      id: 2,
      name: "Jack Rose",
      ingredients: [
        {
          name: "Applejack",
          amount: 2,
        },
        {
          name: "lime juice",
          amount: 1,
        },
        {
          name: "Grenadine",
          amount: 0.5,
        },
      ],
    },
    {
      id: 3,
      name: "Crazy",
      ingredients: [
        {
          name: "Applejack",
          amount: 2,
        },
        {
          name: "lime juice",
          amount: 1,
        },
        {
          name: "Grenadine",
          amount: 0.5,
        },
        {
          name: "A",
          amount: 0.5,
        },
        {
          name: "B",
          amount: 0.5,
        },
        {
          name: "C",
          amount: 0.5,
        },
        {
          name: "D",
          amount: 0.5,
        },
      ],
    },
  ],
};

export let bays: Bays = {
  bays: [
    {
      id: 1,
      ingredient: "gin",
    },
    {
      id: 2,
      ingredient: "dry vermouth",
    },
  ],
};
