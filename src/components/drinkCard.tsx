import { Drink, Drinks } from "@/pages/api/drinks";
import Link from "next/link";
import router from "next/router";

export type DrinkCardProps = {
  drinks: Drink[] | null | undefined;
};

export function DrinkCard({ drinks }: DrinkCardProps) {
  return (
    <div>
      {drinks?.map((drink, i) => (
        <div key={i} className="inline-block p-3">
          <Link
            href={{
              pathname: "/making",
              query: { id: drink.id },
            }}
          >
            <DrinkCardSingle drink={drink}></DrinkCardSingle>
          </Link>
        </div>
      ))}
    </div>
  );
}

export type DrinkCardSingleProps = {
  drink: Drink | null | undefined;
};

export function DrinkCardSingle({ drink }: DrinkCardSingleProps) {
  return (
    <div className="card w-96 max-h-30 h-60 bg-base-100 shadow-xl">
      <div className="card-body overflow-auto">
        <h2 className="card-title">{drink?.name}</h2>
        {drink?.ingredients.map((ing, j) => (
          <p key={j}>{ing.name}</p>
        ))}
      </div>
    </div>
  );
}
