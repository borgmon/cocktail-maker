import { Drink, Drinks } from "@/pages/api/drinks";
import Link from "next/link";
import Image from "next/image";
import router from "next/router";

export enum AlertType {
  success = "success",
  error = "error",
  warning = "warning",
  info = "info",
}

export type AlertMessageProps = {
  type: AlertType;
  msg: string;
  onClick: () => void;
};

export type AlertMessageType = {
  type: AlertType;
  msg: string;
};

export function AlertMessage(props: AlertMessageProps) {
  const classType = "alert shadow-lg alert-" + props.type.toString();
  return (
    <div>
      {!!props.msg && (
        <div className={classType} onClick={() => props.onClick()}>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-current flex-shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>{props.msg}</span>
          </div>
        </div>
      )}
    </div>
  );
}
