import { Drink, Drinks } from "@/pages/api/drinks";
import Link from "next/link";
import Image from "next/image";
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
    <div className="card w-60 max-h-30 bg-base-100 shadow-xl">
      <figure>
        <Image
          src="https://placekitten.com/500/500"
          width={500}
          height={500}
          alt={drink?.name!}
        />
      </figure>
      <div className="card-body  ">
        <h2 className="card-title">{drink?.name}</h2>
        {drink?.ingredients.map((ing, j) => (
          <p key={j}>
            {ing.name} {ing.amount} oz
          </p>
        ))}
      </div>
    </div>
  );
}
