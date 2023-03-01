import { Drink, Drinks } from "@/pages/api/drinks";
import Link from "next/link";
import Image from "next/image";
import router from "next/router";
import { DelDrink, useDelDrink } from "@/hooks/useFetchDrink";

export type DrinkCardProps = {
  drinks: Drink[] | null | undefined;
};

export function DrinkCard({ drinks }: DrinkCardProps) {
  return (
    <div>
      {drinks?.map((drink, i) => (
        <div key={i} className="inline-block p-3">
          <DrinkCardSingle drink={drink} showDel={true}></DrinkCardSingle>
        </div>
      ))}
    </div>
  );
}

export type DrinkCardSingleProps = {
  drink: Drink | null | undefined;
  showDel: boolean;
};

export function DrinkCardSingle({
  drink,
  showDel = false,
}: DrinkCardSingleProps) {
  const delDrink = (id: string) => {
    DelDrink(id).then(()=>router.reload())
  };
  return (
    <div className="card w-60 max-h-30 bg-base-100 shadow-xl indicator">
      {!!showDel && (
        <div className="indicator-item">
          <button className="btn btn-error" onClick={() => delDrink(drink?.id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}
      <Link
        href={{
          pathname: "/making",
          query: { id: drink?.id },
        }}
      >
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
      </Link>
    </div>
  );
}
