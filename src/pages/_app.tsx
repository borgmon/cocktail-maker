import Nav from "@/layout/nav";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Nav></Nav>
      <Component {...pageProps} />
    </>
  );
}
